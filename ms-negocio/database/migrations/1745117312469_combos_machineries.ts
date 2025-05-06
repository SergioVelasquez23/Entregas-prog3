import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Table name for the dedicated pivot model
  // Based on model name ComboMachinery -> combo_machineries (pluralized)
  protected tableName = 'combos_machineries'

  public async up() {
    // Create the 'combo_machineries' table
    this.schema.createTable(this.tableName, (table) => {
      // Primary key for the dedicated pivot table itself
      table.increments('id').primary()

      // Foreign key referencing the 'machineries' table
      // Assuming the 'machineries' table exists and its PK is a number 'id'.
      table
        .integer('machinery_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('machineries') // In the 'machineries' table (Adjust name if needed)
        .onDelete('CASCADE') // If machinery is deleted, delete entries here (common)
        .notNullable()

      // Foreign key referencing the 'combos' table
      // Assuming the 'combos' table exists and its PK is a number 'id'.
      table
        .integer('combo_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('combos') // In the 'combos' table (Adjust name if needed)
        .onDelete('CASCADE') // If combo is deleted, delete entries here (common)
        .notNullable()

      // Automatic timestamp columns (created_at, updated_at) from your model
      table.timestamps(true)

      // Optional: Add a unique index if the combination of combo_id and machinery_id
      // should always be unique in this pivot table (one relationship entry per pair).
      // This is often desired for ManyToMany relationships.
      table.unique(['combo_id', 'machinery_id'])
    })
  }

  public async down() {
    // Drop the 'combo_machineries' table
    this.schema.dropTableIfExists(this.tableName)
  }
}