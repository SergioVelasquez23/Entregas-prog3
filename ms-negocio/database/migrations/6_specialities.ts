import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Define el nombre de la tabla principal
  protected specialitiesTable = 'specialities'
  // Define el nombre de la tabla pivot
  protected specialityOperatorTable = 'specialities_operator'

  public async up() {
    // Crea la tabla 'specialities'
    this.schema.createTable(this.specialitiesTable, (table) => {
      table.increments('id').primary() // Columna ID primaria

      table.string('name', 255).notNullable() // Columna para el nombre de la especialidad

      // Columnas de timestamp createdAt y updatedAt (snake_case por convención de BD)
      table.timestamps(true) // O usa table.dateTime('created_at').notNullable() y table.dateTime('updated_at').notNullable()
    })

    // Crea la tabla pivot 'specialities_operator'
    this.schema.createTable(this.specialityOperatorTable, (table) => {
      // Clave foránea referenciando la tabla 'specialities'
      table
        .integer('speciality_id')
        .unsigned() // Asegura que es positivo
        .references('id') // Referencia la columna 'id' en la tabla 'specialities'
        .inTable(this.specialitiesTable) // Especifica la tabla referenciada
        .onDelete('CASCADE') // Si se elimina una especialidad, se eliminan sus entradas en la tabla pivot

      // Clave foránea referenciando la tabla 'operators'
      table
        .integer('operator_id')
        .unsigned() // Asegura que es positivo
        // Asumiendo que tu tabla de operadores se llama 'operators' y su PK es 'id'
        .references('id')
        .inTable('operators') // Asegúrate de que este nombre de tabla coincida con la tuya
        .onDelete('CASCADE') // Si se elimina un operador, se eliminan sus entradas en la tabla pivot

      // Define una clave primaria compuesta usando ambas columnas foráneas.
      // Esto asegura que la combinación speciality_id + operator_id sea única,
      // evitando duplicados en la relación ManyToMany.
      table.primary(['speciality_id', 'operator_id'])

      // Opcional: Puedes añadir timestamps a la tabla pivot si lo necesitas
      // table.timestamps(true)
    })
  }

  public async down() {
    // Elimina las tablas en orden inverso de creación para evitar problemas de claves foráneas
    this.schema.dropTableIfExists(this.specialityOperatorTable) // Elimina la tabla pivot primero
    this.schema.dropTableIfExists(this.specialitiesTable) // Luego elimina la tabla principal
  }
}