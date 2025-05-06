import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Main table name
  protected proceduresTable = 'procedures'
  // Pivot table name for the manyToMany relationship
  protected maintenancesProceduresTable = 'maintenances_procedures' // Matches pivotTable config

  public async up() {
    // Create the 'procedures' table
    this.schema.createTable(this.proceduresTable, (table) => {
      table.increments('id').primary() // Auto-incrementing primary key (number)

      table.string('name', 255).notNullable() // name column

      // Description column. Using 'text' type for potentially longer descriptions.
      table.text('description').notNullable() // description column

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true)
    })

    // Create the 'maintenances_procedures' pivot table
    this.schema.createTable(this.maintenancesProceduresTable, (table) => {
      // Foreign key referencing the 'procedures' table
      table
        .integer('procedure_id') // Foreign key column name from pivotForeignKey config
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable(this.proceduresTable) // In the 'procedures' table
        .onDelete('CASCADE') // If a procedure is deleted, delete pivot entries (common)
        .notNullable()

      // Foreign key referencing the 'maintenances' table
      // Assuming the 'maintenances' table exists and its PK is a number 'id'.
      table
        .integer('maintenance_id') // Foreign key column name from pivotRelatedForeignKey config
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('maintenances') // In the 'maintenances' table (Adjust name if needed)
        .onDelete('CASCADE') // If maintenance is deleted, delete pivot entries (common)
        .notNullable()

      // Define the composite primary key for the pivot table
      // This ensures the combination of procedure_id + maintenance_id is unique
      table.primary(['procedure_id', 'maintenance_id'])

      // Optional: Timestamps for the pivot table if needed
      // table.timestamps(true)
    })
  }

  public async down() {
    // Drop tables in reverse order of creation to handle FK dependencies
    this.schema.dropTableIfExists(this.maintenancesProceduresTable) // Drop pivot table first
    this.schema.dropTableIfExists(this.proceduresTable) // Then drop main table
  }
}