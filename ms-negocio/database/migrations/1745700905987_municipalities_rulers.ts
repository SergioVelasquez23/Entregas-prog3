import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Table name for the dedicated pivot model
  // Matches pivotTable config in Municipality model
  // Conventionally derived from model name MunicipalityRuler -> municipality_rulers,
  // but using the explicitly configured 'municipalities_ruler' name.
  protected tableName = 'municipalities_rulers'

  public async up() {
    // Create the 'municipalities_ruler' table
    this.schema.createTable(this.tableName, (table) => {
      // Primary key for the dedicated pivot table itself
      table.increments('id').primary()

      // Foreign key referencing the 'rulers' table
      // Assuming the 'rulers' table exists and its PK is a number 'id'.
      table
        .integer('ruler_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('rulers') // In the 'rulers' table (Adjust name if needed)
        .onDelete('CASCADE') // If a ruler is deleted, delete entries here (common)
        .notNullable()

      // Foreign key referencing the 'municipalities' table
      // IMPORTANT: The type MUST match the PK type of 'municipalities.id' (which is string)
      table
        .string('municipality_id', 36) // Correcting type to string (matching municipalities.id)
        .references('id') // References the 'id' column
        .inTable('municipalities') // In the 'municipalities' table (Adjust name if needed)
        .onDelete('CASCADE') // If a municipality is deleted, delete entries here (common)
        .notNullable()

      // Date/time columns from your dedicated pivot model
      table.dateTime('start_date').notNullable() // start date/time column

      // End date/time column. Your model doesn't explicitly say nullable,
      // but end dates are often nullable if the period is ongoing.
      table.dateTime('end_date').nullable() // end date/time column (allowing null)

      // No timestamp columns (createdAt, updatedAt) are included as they were not defined in your model.
      // If you want them, add table.timestamps(true) here.

      // Optional: Add a unique index if the combination of municipality_id and ruler_id
      // should always be unique in this pivot table (one relationship entry per pair).
      // This is often desired for ManyToMany relationships.
      table.unique(['municipality_id', 'ruler_id'])
    })
  }

  public async down() {
    // Drop the 'municipalities_ruler' table
    this.schema.dropTableIfExists(this.tableName)
  }
}