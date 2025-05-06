import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Main table name
  // 'gps' is often used as the table name itself
  protected tableName = 'gps'

  public async up() {
    // Create the 'gps' table
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Auto-incrementing primary key (number)

      // Latitude coordinate (using string type as in your model)
      // Consider using a more specific type like DECIMAL or FLOAT if storing numeric values.
      table.string('latitude', 50).notNullable() // latitude column

      // Longitude coordinate (using 'length' as in your model, but likely intended as 'longitude')
      // Consider renaming this column to 'longitude' and using DECIMAL/FLOAT.
      table.string('length', 50).notNullable() // length column (likely longitude)

      // Foreign key column referencing the 'machinery' table
      // This column exists in the 'gps' table.
      // Assuming the 'machinery' table exists and its PK is a number 'id'.
      table
        .integer('machinery_id') // The foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('machinery') // In the 'machinery' table (Adjust name if needed, e.g., 'maquinas')
        .onDelete('CASCADE') // If machinery is deleted, delete associated GPS entries (common policy)
        .notNullable() // Based on your model definition

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true)

      // Optional: Add an index on the foreign key for performance
      // table.index(['machinery_id'])
    })
  }

  public async down() {
    // Drop the 'gps' table
    this.schema.dropTableIfExists(this.tableName)
  }
}