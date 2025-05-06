import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  // Main table name
  protected rulersTable = 'rulers'
  // Pivot table name for Ruler and Department
  protected rulerDepartmentTable = 'ruler_department' // Matches pivotTable config
  // Pivot table name for Ruler and Municipality
  protected rulerMunicipalityTable = 'ruler_municipality' // Matches pivotTable config

  public async up() {
    // Create the 'rulers' table
    this.schema.createTable(this.rulersTable, (table) => {
      table.increments('id').primary() // Auto-incrementing primary key (number)

      // user_id column. Assuming it references a 'users' table with a string PK.
      // Adjust type and references if your 'users' table is different.
      table
        .string('user_id', 36) // Using string type for consistency with presumed 'users.id'
        .references('id') // References the 'id' column
        .inTable('users') // In the 'users' table (Adjust if your table name is different)
        .onDelete('CASCADE') // If a user is deleted, delete associated rulers
        .notNullable()
        .unique() // Optional: if each ruler corresponds to a single unique user

      // Columns for governance period (matching model names)
      // Use 'date' if you only store the date. Use 'dateTime' if you need time info.
      table.date('start_period').notNullable()
      table.date('end_period').nullable() // End date can be null

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true)
    })

    // Create the 'ruler_department' pivot table
    this.schema.createTable(this.rulerDepartmentTable, (table) => {
      // Foreign key referencing the 'rulers' table
      table
        .integer('ruler_id') // Is number because Ruler PK is number
        .unsigned()
        .references('id')
        .inTable(this.rulersTable) // In the 'rulers' table
        .onDelete('CASCADE') // If a ruler is deleted, delete their entries here
        .notNullable()

      // Foreign key referencing the 'departments' table
      // Assuming the PK of 'departments' is number
      table
        .integer('department_id') // Is number
        .unsigned()
        .references('id')
        .inTable('departments') // In the 'departments' table (Adjust if your table name is different)
        .onDelete('CASCADE') // If a department is deleted, delete ruler entries here
        .notNullable()

      // Additional columns specified in pivotColumns (translated to English)
      // Use 'date' if you only store the date. Use 'dateTime' if you need time info.
      table.date('start_date').notNullable()
      table.date('end_date').nullable() // Allow null

      // Define the composite primary key for this pivot table
      // This ensures the combination of ruler_id + department_id is unique
      table.primary(['ruler_id', 'department_id'])

      // Optional: Timestamps for the pivot table
      // table.timestamps(true)
    })

    // Create the 'ruler_municipality' pivot table
    this.schema.createTable(this.rulerMunicipalityTable, (table) => {
      // Foreign key referencing the 'rulers' table
      table
        .integer('ruler_id') // Is number because Ruler PK is number
        .unsigned()
        .references('id')
        .inTable(this.rulersTable) // In the 'rulers' table
        .onDelete('CASCADE') // If a ruler is deleted, delete their entries here
        .notNullable()

      // Foreign key referencing the 'municipalities' table
      // IMPORTANT: The type must match the PK type in the 'municipalities' table (string)
      table
        .string('municipality_id', 36) // Must be string, compatible size
        .references('id') // References the 'id' column
        .inTable('municipalities') // In the 'municipalities' table (Adjust if your table name is correct)
        .onDelete('CASCADE') // If a municipality is deleted, delete ruler entries here
        .notNullable()

      // Additional columns specified in pivotColumns (translated to English)
      // Use 'date' if you only store the date. Use 'dateTime' if you need time info.
      table.date('start_date').notNullable()
      table.date('end_date').nullable() // Allow null

      // Define the composite primary key for this pivot table
      table.primary(['ruler_id', 'municipality_id'])

      // Optional: Timestamps for the pivot table
      // table.timestamps(true)
    })
  }

  public async down() {
    // Drop tables in reverse order of creation to handle FK dependencies
    this.schema.dropTableIfExists(this.rulerMunicipalityTable) // Pivot 2 first
    this.schema.dropTableIfExists(this.rulerDepartmentTable) // Pivot 1 next
    this.schema.dropTableIfExists(this.rulersTable) // Main table last
  }
}