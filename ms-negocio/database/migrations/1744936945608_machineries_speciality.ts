import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Table name for the dedicated pivot model
  // Based on model name MachinerySpeciality -> machinery_specialities (pluralized)
  protected tableName = 'machineries_speciality'

  public async up() {
    // Create the 'machinery_specialities' table
    this.schema.createTable(this.tableName, (table) => {
      // Primary key for the dedicated pivot table itself
      table.increments('id').primary()

      // Foreign key referencing the 'type_services' table
      // Assuming the 'type_services' table exists and its PK is a number 'id'.
      table
        .integer('type_service_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('type_services') // In the 'type_services' table (Adjust name if needed)
        .onDelete('CASCADE') // If a type service is deleted, delete entries here (common)
        .notNullable()

      // Foreign key referencing the 'machinery' table
      // Assuming the 'machinery' table exists and its PK is a number 'id'.
      table
        .integer('machinery_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('machinery') // In the 'machinery' table (Adjust name if needed)
        .onDelete('CASCADE') // If machinery is deleted, delete entries here (common)
        .notNullable()

      // Additional column from your dedicated pivot model
      table.string('type_work', 255).notNullable() // type_work column

      // Automatic timestamp columns (created_at, updated_at) from your model
      table.timestamps(true)

      // Optional: Add a unique index if the combination of type_service_id and machinery_id
      // should always be unique in this pivot table (one relationship entry per pair).
      // This is often desired for ManyToMany relationships.
      table.unique(['type_service_id', 'machinery_id'])
    })
  }

  public async down() {
    // Drop the 'machinery_specialities' table
    this.schema.dropTableIfExists(this.tableName)
  }
}