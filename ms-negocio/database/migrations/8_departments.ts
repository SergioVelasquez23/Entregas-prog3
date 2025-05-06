import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Nombre de la tabla principal (pluralizado según convención de Adonis)
  protected departamentsTable = 'departaments'
  // Nombre de la tabla pivot
  protected departmentRulerTable = 'departments_ruler' // Coincide con pivotTable en tu modelo

  public async up() {
    // Crea la tabla 'departaments'
    this.schema.createTable(this.departamentsTable, (table) => {
      table.increments('id').primary() // Clave primaria

      table.string('name', 255).notNullable() // Columna 'name'

      // Columnas de timestamp (createdAt y updatedAt)
      table.timestamps(true) // O usa table.dateTime('created_at').notNullable() y table.dateTime('updated_at').notNullable()
    })

    // Crea la tabla pivot 'departments_ruler'
    this.schema.createTable(this.departmentRulerTable, (table) => {
      // Clave foránea referenciando la tabla 'departaments'
      // El nombre de la columna coincide con pivotForeignKey en tu modelo
      table
        .integer('departament_id')
        .unsigned() // Asegura que es positivo
        .references('id') // Referencia la columna 'id'
        .inTable(this.departamentsTable) // En la tabla 'departaments'
        .onDelete('CASCADE') // Si se elimina un departamento, se eliminan sus entradas aquí
        .notNullable()

      // Clave foránea referenciando la tabla 'rulers'
      // El nombre de la columna coincide con pivotRelatedForeignKey en tu modelo
      // Asumimos que la tabla 'rulers' ya existe
      table
        .integer('ruler_id')
        .unsigned() // Asegura que es positivo
        .references('id') // Referencia la columna 'id'
        .inTable('rulers') // En la tabla 'rulers' (Asegúrate que este nombre sea correcto)
        .onDelete('CASCADE') // Si se elimina un ruler, se eliminan sus entradas aquí
        .notNullable()

      // Columnas adicionales especificadas en pivotColumns en tu modelo
      table.dateTime('start_date').notNullable()
      table.dateTime('end_date').nullable() // Asumimos que la fecha de fin puede ser nula si aún está vigente

      // Define la clave primaria compuesta para la tabla pivot
      // Esto asegura la unicidad de la combinación department_id + ruler_id
      table.primary(['departament_id', 'ruler_id'])

      // Nota: No se incluyen timestamps automáticos en la tabla pivot por defecto
      // con este setup de pivotColumns, a menos que los añadas manualmente:
      // table.timestamps(true)
    })
  }

  public async down() {
    // Elimina las tablas en orden inverso de creación
    this.schema.dropTableIfExists(this.departmentRulerTable) // Elimina la tabla pivot primero
    this.schema.dropTableIfExists(this.departamentsTable) // Luego elimina la tabla principal
  }
}