import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Main table name (translating Repuesto to Spare and pluralizing)
  protected sparesTable = 'spares'
  // Pivot table name for the manyToMany relationship with MaintenanceProcedure
  protected spareMaintenanceProceduresTable = 'spare_maintenance_procedures' // Matches pivotTable config

  public async up() {
    // Create the 'spares' table
    this.schema.createTable(this.sparesTable, (table) => {
      table.increments('id').primary() // Auto-incrementing primary key (number)

      table.string('name', 255).notNullable() // name column

      table.string('brand', 255).notNullable() // brand column

      // Description column. Using 'text' type for potentially longer descriptions.
      table.text('description').notNullable() // description column

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true)
    })

    // Create the 'spare_maintenance_procedures' pivot table
    // This table links 'spares' records to 'maintenances_procedures' records.
    this.schema.createTable(this.spareMaintenanceProceduresTable, (table) => {
      // Foreign key referencing the 'spares' table
      table
        .integer('spare_id') // Foreign key column name from pivotForeignKey config
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable(this.sparesTable) // In the 'spares' table
        .onDelete('CASCADE') // If a spare is deleted, delete pivot entries (common)
        .notNullable()

      // Foreign key referencing the 'maintenances_procedures' table (the pivot table for Maintenance and Procedure)
      // Assuming the 'maintenances_procedures' table exists and its PK is a number 'id'.
      table
        .integer('procedure_id') // Foreign key column name from pivotRelatedForeignKey config
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('maintenances_procedures') // In the 'maintenances_procedures' table (Adjust name if needed)
        .onDelete('CASCADE') // If a maintenance procedure entry is deleted, delete spare entries here (common)
        .notNullable()

      // Define the composite primary key for this pivot table
      // This ensures the combination of spare_id + procedure_id is unique
      table.primary(['spare_id', 'procedure_id'])

      // Optional: Timestamps for the pivot table if needed
      // table.timestamps(true)
    })
  }

  public async down() {
    // Drop tables in reverse order of creation to handle FK dependencies
    this.schema.dropTableIfExists(this.spareMaintenanceProceduresTable) // Drop pivot table first
    this.schema.dropTableIfExists(this.sparesTable) // Then drop main table
  }
}