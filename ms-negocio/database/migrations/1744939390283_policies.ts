import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Main table name
  protected tableName = 'policies'

  public async up() {
    // Create the 'policies' table
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary() // Auto-incrementing primary key (number)

      // Foreign key referencing the 'machinery' table. It can be null.
      // Assuming 'machinery' table exists and its PK is a number 'id'.
      table
        .integer('machinery_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('machinery') // In the 'machinery' table (Adjust name if needed)
        .onDelete('SET NULL') // If machinery is deleted, set this FK to NULL
        .nullable() // This foreign key can be null

      // Foreign key referencing the 'operators' table. It can be null.
      // Assuming 'operators' table exists and its PK is a number 'id'.
      table
        .integer('operator_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('operators') // In the 'operators' table (Adjust name if needed)
        .onDelete('SET NULL') // If operator is deleted, set this FK to NULL
        .nullable() // This foreign key can be null

      // Foreign key referencing the 'insurances' table. It is NOT null.
      // Assuming 'insurances' table exists and its PK is a number 'id'.
      table
        .integer('insurance_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('insurances') // In the 'insurances' table (Adjust name if needed)
        .onDelete('CASCADE') // If insurance is deleted, delete associated policies
        .notNullable() // This foreign key cannot be null

      // Policy type (using string type, mapping from your TS enum/type)
      table.string('policy_type', 255).notNullable() // policy_type column

      // Start date and time for the policy
      table.dateTime('start_date').notNullable() // start_date column

      // End date and time for the policy
      table.dateTime('end_date').notNullable() // end_date column

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true)

      // Optional: Add indexes on foreign keys for performance
      // table.index(['machinery_id'])
      // table.index(['operator_id'])
      // table.index(['insurance_id'])
    })
  }

  public async down() {
    // Drop the 'policies' table
    this.schema.dropTableIfExists(this.tableName)
  }
}