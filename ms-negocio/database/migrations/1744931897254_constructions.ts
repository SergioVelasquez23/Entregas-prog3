import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Main table name
  protected tableName = 'constructions'

  public async up() {
    // Create the 'constructions' table
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Auto-incrementing primary key (number)

      table.string('name', 255).notNullable() // name column

      // Foreign key column referencing the 'combos' table
      // This column exists in the 'constructions' table
      table
        .integer('combo_id') // The foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('combos') // In the 'combos' table
        .onDelete('CASCADE') // If a combo is deleted, delete associated constructions (common policy)
        .notNullable() // Based on your model definition

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true)

      // Optional: Add an index on the foreign key for performance
      // table.index(['combo_id'])
    })
  }

  public async down() {
    // Drop the 'constructions' table
    this.schema.dropTableIfExists(this.tableName)
  }
}