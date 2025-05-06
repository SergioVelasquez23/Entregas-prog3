import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Main table name
  protected tableName = 'services'

  public async up() {
    // Create the 'services' table
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Auto-incrementing primary key (number)

      // Service cost. Using decimal for potential monetary value.
      // Adjust precision (10) and scale (2) as needed for your currency/values.
      table.decimal('cost', 10, 2).notNullable() // cost column

      // Start date and time for the service
      table.dateTime('start_date').notNullable() // start_date column

      // End date for the service (only date part)
      table.date('end_date').notNullable() // end_date column

      // Priority of the service
      table.string('priority', 255).notNullable() // priority column

      // Type of the service
      table.string('type', 255).notNullable() // type column

      // Status of the service
      table.string('status', 255).notNullable() // status column

      // Location of the service
      table.string('location', 255).notNullable() // location column

      // Summary/description of the service
      table.string('summary', 255).notNullable() // summary column

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true)
    })
  }

  public async down() {
    // Drop the 'services' table
    this.schema.dropTableIfExists(this.tableName)
  }
}