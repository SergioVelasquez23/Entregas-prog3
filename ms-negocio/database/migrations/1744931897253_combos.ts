import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Main table name
  protected tableName = 'combos'

  public async up() {
    // Create the 'combos' table
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Auto-incrementing primary key (number)

      // Foreign key column referencing the 'services' table
      // This column exists in the 'combos' table
      table
        .integer('service_id') // The foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('services') // In the 'services' table
        .onDelete('CASCADE') // If a service is deleted, delete associated combos (common policy)
        .notNullable() // Based on your model definition

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true)

      // Optional: Add an index on the foreign key for performance
      // table.index(['service_id'])
    })
  }

  public async down() {
    // Drop the 'combos' table
    this.schema.dropTableIfExists(this.tableName)
  }
}