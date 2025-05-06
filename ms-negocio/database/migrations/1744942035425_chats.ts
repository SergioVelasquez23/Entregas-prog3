import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Main table name
  protected tableName = 'chats'

  public async up() {
    // Create the 'chats' table
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Auto-incrementing primary key (number)

      table.string('title', 255).notNullable() // title column

      table.string('type', 255).notNullable() // type column

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true)
    })
  }

  public async down() {
    // Drop the 'chats' table
    this.schema.dropTableIfExists(this.tableName)
  }
}