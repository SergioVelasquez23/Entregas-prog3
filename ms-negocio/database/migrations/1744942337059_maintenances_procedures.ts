import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Table name for the dedicated pivot model
  // Based on pivotTable config in Procedure model and implied by model name
  protected tableName = 'maintenances_procedures'

  public async up() {
    // Create the 'maintenances_procedures' table
    this.schema.createTable(this.tableName, (table) => {
      // Primary key for the dedicated pivot table itself
      table.increments('id').primary()

      // Foreign key referencing the 'procedures' table
      // Assuming the 'procedures' table exists and its PK is a number 'id'.
      table
        .integer('procedure_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('procedures') // In the 'procedures' table (Adjust name if needed)
        .onDelete('CASCADE') // If a procedure is deleted, delete entries here (common)
        .notNullable()

      // Foreign key referencing the 'maintenances' table
      // Assuming the 'maintenances' table exists and its PK is a number 'id'.
      table
        .integer('maintenance_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('maintenances') // In the 'maintenances' table (Adjust name if needed)
        .onDelete('CASCADE') // If maintenance is deleted, delete entries here (common)
        .notNullable()

      // Additional column from your dedicated pivot model
      table.string('status', 255).notNullable() // status column

      // Automatic timestamp columns (created_at, updated_at) from your model
      table.timestamps(true)

      // Optional: Add a unique index if the combination of procedure_id and maintenance_id
      // should always be unique in this pivot table (one relationship entry per pair).
      // This is often desired for ManyToMany relationships.
      table.unique(['procedure_id', 'maintenance_id'])
    })
  }

  public async down() {
    // Drop the 'maintenances_procedures' table
    this.schema.dropTableIfExists(this.tableName)
  }
}