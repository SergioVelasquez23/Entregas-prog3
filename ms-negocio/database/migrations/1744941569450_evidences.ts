import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Main table name
  protected tableName = 'evidences'

  public async up() {
    // Create the 'evidences' table
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Auto-incrementing primary key (number)

      table.string('file_type', 255).notNullable() // file_type column

      // File content column. Using 'text' type as file content (like base64) can be large.
      // If storing only file paths/URLs, 'string(255)' or similar is fine.
      table.text('file_content').notNullable() // file_content column

      table.dateTime('load_date').notNullable() // load_date column

      // Foreign key referencing the 'services' table
      // Assuming 'services' table exists and its PK is a number 'id'.
      table
        .integer('service_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('services') // In the 'services' table (Adjust name if needed)
        .onDelete('CASCADE') // If a service is deleted, delete associated evidences (common policy)
        .notNullable() // This foreign key cannot be null

      // Foreign key referencing the 'novelties' table
      // Assuming 'novelties' table exists and its PK is a number 'id'.
      table
        .integer('novelty_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('novelties') // In the 'novelties' table (Adjust name if needed)
        .onDelete('CASCADE') // If a novelty is deleted, delete associated evidences (common policy)
        .notNullable() // This foreign key cannot be null


      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true)

      // Optional: Add indexes on foreign keys for performance
      // table.index(['service_id'])
      // table.index(['novelty_id'])
    })
  }

  public async down() {
    // Drop the 'evidences' table
    this.schema.dropTableIfExists(this.tableName)
  }
}