import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Main table name
  protected tableName = 'quotas'

  public async up() {
    // Create the 'quotas' table
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Auto-incrementing primary key (number)

      // Foreign key column referencing the 'services' table
      // This column exists in the 'quotas' table
      table
        .integer('service_id') // The foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('services') // In the 'services' table (Adjust name if needed)
        .onDelete('CASCADE') // If a service is deleted, delete associated quotas (common policy)
        .notNullable() // Based on your model definition

      table.integer('quantity').notNullable() // quantity column (using integer for count)

      table.string('email', 255).notNullable() // email column

      table.string('client_name', 255).notNullable() // client_name column

      // Payment reference (using string, adding unique constraint as it's a 'unique reference')
      table.string('payment_reference', 255).notNullable().unique() // payment_reference column

      // Expiration date (using date type as specified by @column.date())
      table.date('expiration_date').notNullable() // expiration_date column

      // Paid status (boolean, with a default value of false)
      table.boolean('paid').notNullable().defaultTo(false) // paid column

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true)

      // Optional: Add an index on the service_id foreign key for performance
      // table.index(['service_id'])
    })
  }

  public async down() {
    // Drop the 'quotas' table
    this.schema.dropTableIfExists(this.tableName)
  }
}