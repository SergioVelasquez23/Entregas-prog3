import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Main table name
  protected tableName = 'messages'

  public async up() {
    // Create the 'messages' table
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Auto-incrementing primary key (number)

      // Message content. Using 'text' type as message content can be long.
      table.text('content').notNullable() // content column

      // Message date (using date type as specified by @column.date() implicitly via Date type)
      // If you need time, change to table.dateTime('date').
      table.date('date').notNullable() // date column

      // Foreign key referencing the 'chats' table
      // Assuming 'chats' table exists and its PK is a number 'id'.
      table
        .integer('chat_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('chats') // In the 'chats' table (Adjust name if needed)
        .onDelete('CASCADE') // If a chat is deleted, delete associated messages (common policy)
        .notNullable() // This foreign key cannot be null

      // Foreign key referencing the 'users' table
      // Assuming 'users' table exists and its PK is a string 'id' (e.g., UUID).
      table
        .string('user_id', 36) // Using string type and typical UUID length (36)
        .references('id') // References the 'id' column
        .inTable('users') // In the 'users' table (Adjust name if needed)
        .onDelete('CASCADE') // If a user is deleted, delete associated messages (common policy)
        .notNullable() // This foreign key cannot be null

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true)

      // Optional: Add indexes on foreign keys for performance
      // table.index(['chat_id'])
      // table.index(['user_id'])
    })
  }

  public async down() {
    // Drop the 'messages' table
    this.schema.dropTableIfExists(this.tableName)
  }
}