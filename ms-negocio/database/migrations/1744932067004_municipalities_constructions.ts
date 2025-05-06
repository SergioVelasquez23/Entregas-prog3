import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Table name for the dedicated pivot model
  // Based on model name MunicipalityConstruction -> municipality_constructions
  // NOTE: This should be the *consistent* pivot table name used in your
  // Municipality and Construction model definitions via the pivotModel option.
  protected tableName = 'municipalities_constructions'

  public async up() {
    // Create the 'municipality_constructions' table
    this.schema.createTable(this.tableName, (table) => {
      // Primary key for the dedicated pivot table itself
      table.increments('id').primary()

      // Foreign key referencing the 'constructions' table
      // Assuming the PK of 'constructions' is number
      table
        .integer('construction_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('constructions') // In the 'constructions' table (Adjust name if needed)
        .onDelete('CASCADE') // If a construction is deleted, delete entries here (common)
        .notNullable()

      // Foreign key referencing the 'municipalities' table
      // IMPORTANT: The type MUST match the PK type of 'municipalities.id' (which is string)
      // Your model defines this as number, but the database column must be string.
      table
        .string('municipality_id', 36) // Correcting type to string (matching municipalities.id)
        .references('id') // References the 'id' column
        .inTable('municipalities') // In the 'municipalities' table (Adjust name if needed)
        .onDelete('CASCADE') // If a municipality is deleted, delete entries here (common)
        .notNullable()

      // Automatic timestamp columns (created_at, updated_at) from your model
      table.timestamps(true)

      // Optional: Add a unique index if the combination of municipality_id and construction_id
      // should always be unique in this pivot table (one relationship entry per pair).
      // This is the equivalent of the composite PK approach in implicit pivots.
      table.unique(['municipality_id', 'construction_id'])
    })
  }

  public async down() {
    // Drop the 'municipality_constructions' table
    this.schema.dropTableIfExists(this.tableName)
  }
}