import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Main table name
  protected typeServicesTable = 'type_services'
  // Pivot table name for the manyToMany relationship
  protected machinerySpecialitiesTable = 'machinery_specialities' // Matches pivotTable config

  public async up() {
    // Create the 'type_services' table
    this.schema.createTable(this.typeServicesTable, (table) => {
      table.increments('id').primary() // Auto-incrementing primary key (number)

      table.string('name', 255).notNullable() // name column

      // Description column. Using string, consider 'text' for longer descriptions.
      table.string('description', 500).notNullable() // description column

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true)
    })

    // Create the 'machinery_specialities' pivot table
    this.schema.createTable(this.machinerySpecialitiesTable, (table) => {
      // Foreign key referencing the 'type_services' table
      table
        .integer('type_service_id') // Foreign key column name from pivotForeignKey config
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable(this.typeServicesTable) // In the 'type_services' table
        .onDelete('CASCADE') // If a type service is deleted, delete pivot entries (common)
        .notNullable()

      // Foreign key referencing the 'machinery' table
      // Assuming the 'machinery' table exists and its PK is a number 'id'.
      table
        .integer('machinery_id') // Foreign key column name from pivotRelatedForeignKey config
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('machinery') // In the 'machinery' table (Adjust name if needed)
        .onDelete('CASCADE') // If machinery is deleted, delete pivot entries (common)
        .notNullable()

      // Define the composite primary key for the pivot table
      // This ensures the combination of type_service_id + machinery_id is unique
      table.primary(['type_service_id', 'machinery_id'])

      // Optional: Timestamps for the pivot table if needed
      // table.timestamps(true)
    })
  }

  public async down() {
    // Drop tables in reverse order of creation to handle FK dependencies
    this.schema.dropTableIfExists(this.machinerySpecialitiesTable) // Drop pivot table first
    this.schema.dropTableIfExists(this.typeServicesTable) // Then drop main table
  }
}