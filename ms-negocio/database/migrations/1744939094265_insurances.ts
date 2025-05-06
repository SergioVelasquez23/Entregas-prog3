import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Main table name
  protected tableName = 'insurances'

  public async up() {
    // Create the 'insurances' table
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Auto-incrementing primary key (number)

      table.string('name', 255).notNullable() // name column

      // Description column. Using 'text' type as descriptions can be long.
      table.text('description').notNullable() // description column

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true)
    })
  }

  public async down() {
    // Drop the 'insurances' table
    this.schema.dropTableIfExists(this.tableName)
  }
}