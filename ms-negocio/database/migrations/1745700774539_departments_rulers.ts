import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Table name for the dedicated pivot model
  // Based on model name DepartmentRuler -> department_rulers (pluralized)
  // NOTE: If you previously used 'gobernante_departamentos' for the pivot table,
  // you need to choose one consistent name. 'department_rulers' derives from the English model name.
  protected tableName = 'departments_rulers'

  public async up() {
    // Create the 'department_rulers' table
    this.schema.createTable(this.tableName, (table) => {
      // Primary key for the dedicated pivot table itself
      table.increments('id').primary()

      // Foreign key referencing the 'departaments' table
      // Assuming the 'departaments' table exists and its PK is a number 'id'.
      table
        .integer('departament_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('departaments') // In the 'departaments' table (Adjust name if needed)
        .onDelete('CASCADE') // If a departament is deleted, delete entries here (common)
        .notNullable()

      // Foreign key referencing the 'rulers' table
      // Assuming the 'rulers' table exists and its PK is a number 'id'.
      table
        .integer('ruler_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('rulers') // In the 'rulers' table (Adjust name if needed)
        .onDelete('CASCADE') // If a ruler is deleted, delete entries here (common)
        .notNullable()

      // Additional columns from your dedicated pivot model (start and end dates)
      // NOTE: These column names (start_date, end_date) override names like
      // 'fecha_inicio', 'fecha_fin' that might have been in pivotColumns.
      table.dateTime('start_date').notNullable() // start_date column
      table.dateTime('end_date').nullable() // end_date column (assuming end date can be null)

      // Automatic timestamp columns (created_at, updated_at) from your model
      table.timestamps(true)

      // Optional: Add a unique index if the combination of departament_id and ruler_id
      // should always be unique in this pivot table (one relationship entry per pair).
      // This is often desired for ManyToMany relationships.
      table.unique(['departament_id', 'ruler_id'])
    })
  }

  public async down() {
    // Drop the 'department_rulers' table
    this.schema.dropTableIfExists(this.tableName)
  }
}