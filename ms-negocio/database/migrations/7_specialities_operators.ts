import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Adonis típicamente pluraliza el nombre del modelo (SpecialityOperator -> speciality_operators)
  protected tableName = 'speciality_operators'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Clave primaria autoincremental para esta tabla pivot
      table.increments('id').primary()

      // Columna para la clave foránea que referencia a Operator
      table
        .integer('operator_id')
        .unsigned() // Asegura que es positivo
        .references('id') // Referencia la columna 'id'
        .inTable('operators') // En la tabla 'operators' (ajusta si tu tabla tiene otro nombre)
        .onDelete('CASCADE') // Si se elimina un operador, se eliminan sus entradas aquí
        .notNullable() // No debe ser nulo

      // Columna para la clave foránea que referencia a Speciality
      // Nota: En tu modelo pusiste 'especiality_id'. Lo mantengo aquí
      // para que coincida con tu modelo actual, pero considera corregirlo
      // a 'speciality_id' para consistencia con el modelo Speciality.
      table
        .integer('especiality_id') // Usando el nombre de tu modelo
        .unsigned() // Asegura que es positivo
        .references('id') // Referencia la columna 'id'
        .inTable('specialities') // En la tabla 'specialities' (ajusta si tu tabla tiene otro nombre)
        .onDelete('CASCADE') // Si se elimina una especialidad, se eliminan sus entradas aquí
        .notNullable() // No debe ser nulo

      // Columna adicional para el nivel de experiencia
      table.string('experience_level', 255).notNullable()

      // Columnas de timestamp
      table.timestamps(true) // Crea 'created_at' y 'updated_at'

      // Opcional: Añadir un índice único si la combinación de operator_id y speciality_id
      // siempre debe ser única (un operador no puede tener el mismo nivel
      // de experiencia en la misma especialidad listada múltiples veces).
      // Esto es diferente de la clave primaria compuesta del enfoque anterior.
      // table.unique(['operator_id', 'especiality_id'])
    })
  }

  public async down() {
    this.schema.dropTableIfExists(this.tableName)
  }
}