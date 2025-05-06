import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected municipalitiesTable = 'municipalities'
  protected municipalityRulerTable = 'municipalities_ruler' // Coincide con pivotTable en tu modelo
  protected municipalityConstructionTable = 'municipalities_constructions' // Coincide con pivotTable en tu modelo

  public async up() {
    // Crea la tabla 'municipalities'
    this.schema.createTable(this.municipalitiesTable, (table) => {
      // Clave primaria de tipo string, como en tu modelo.
      // Asegúrate de que los valores que insertas son únicos.
      // Si usaras UUIDs, sería table.uuid('id').primary()
      table.string('id', 36).primary() // Usamos un tamaño razonable para un string ID

      table.string('name', 255).notNullable() // Columna 'name'

      // Columna para la clave foránea que referencia a Departament
      table
        .integer('department_id') // Es number porque la PK de Departament es number
        .unsigned() // Asegura que es positivo
        .references('id') // Referencia la columna 'id'
        .inTable('departaments') // En la tabla 'departaments' (Asegúrate que este nombre sea correcto)
        .onDelete('CASCADE') // Si se elimina un departamento, se eliminan los municipios asociados
        .notNullable()

      // Columnas de timestamp
      table.timestamps(true)
    })

    // Crea la tabla pivot 'municipalities_ruler'
    this.schema.createTable(this.municipalityRulerTable, (table) => {
      // Clave foránea referenciando la tabla 'municipalities'
      // IMPORTANTE: El tipo debe coincidir con el tipo de la PK en la tabla 'municipalities' (string)
      table
        .string('municipality_id', 36) // Debe ser string, tamaño compatible
        .references('id') // Referencia la columna 'id'
        .inTable(this.municipalitiesTable) // En la tabla 'municipalities'
        .onDelete('CASCADE') // Si se elimina un municipio, se eliminan sus entradas aquí
        .notNullable()

      // Clave foránea referenciando la tabla 'rulers'
      // Asumimos que la PK de 'rulers' es number
      table
        .integer('ruler_id') // Debe ser number
        .unsigned() // Asegura que es positivo
        .references('id') // Referencia la columna 'id'
        .inTable('rulers') // En la tabla 'rulers' (Asegúrate que este nombre sea correcto)
        .onDelete('CASCADE') // Si se elimina un ruler, se eliminan sus entradas aquí
        .notNullable()

      // Columnas adicionales especificadas en pivotColumns en tu modelo
      table.dateTime('start_date').notNullable()
      table.dateTime('end_date').nullable() // Permitir nulo si la fecha de fin no está definida

      // Define la clave primaria compuesta para esta tabla pivot
      table.primary(['municipality_id', 'ruler_id'])

      // Opcional: Timestamps para la tabla pivot
      // table.timestamps(true)
    })

    // Crea la tabla pivot 'municipalities_constructions'
    this.schema.createTable(this.municipalityConstructionTable, (table) => {
       // Clave foránea referenciando la tabla 'municipalities' (tipo string)
       table
         .string('municipality_id', 36) // Debe ser string, tamaño compatible
         .references('id') // Referencia la columna 'id'
         .inTable(this.municipalitiesTable) // En la tabla 'municipalities'
         .onDelete('CASCADE') // Si se elimina un municipio, se eliminan sus entradas aquí
         .notNullable()

       // Clave foránea referenciando la tabla 'constructions'
       // Asumimos que la PK de 'constructions' es number
       table
         .integer('construction_id') // Debe ser number
         .unsigned() // Asegura que es positivo
         .references('id') // Referencia la columna 'id'
         .inTable('constructions') // En la tabla 'constructions' (Asegúrate que este nombre sea correcto)
         .onDelete('CASCADE') // Si se elimina una construcción, se eliminan sus entradas aquí
         .notNullable()

       // Define la clave primaria compuesta para esta tabla pivot
       table.primary(['municipality_id', 'construction_id'])

       // Opcional: Timestamps para la tabla pivot
       // table.timestamps(true)
    })
  }

  public async down() {
    // Elimina las tablas en orden inverso de creación para manejar dependencias de FK
    this.schema.dropTableIfExists(this.municipalityConstructionTable) // Pivot 2
    this.schema.dropTableIfExists(this.municipalityRulerTable) // Pivot 1
    this.schema.dropTableIfExists(this.municipalitiesTable) // Tabla principal al final
  }
}