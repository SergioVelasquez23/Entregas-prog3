import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Main table name (translating Factura to Bill and pluralizing)
  protected tableName = 'bills'

  public async up() {
    // Create the 'bills' table
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Auto-incrementing primary key (number)

      // Detail column. Using 'text' type as details can potentially be long.
      table.text('detail').notNullable() // detail column

      // Foreign key column referencing the 'quotas' table
      // This column exists in the 'bills' table
      // Assuming the 'quotas' table exists and its PK is a number 'id'.
      table
        .integer('quota_id') // The foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('quotas') // In the 'quotas' table (Adjust name if needed)
        .onDelete('CASCADE') // If a quota is deleted, delete associated bills (common policy)
        .notNullable() // Based on your model definition

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true)

      // Optional: Add an index on the foreign key for performance
      // table.index(['quota_id'])
    })
  }

  public async down() {
    // Drop the 'bills' table
    this.schema.dropTableIfExists(this.tableName)
  }
}