import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  // Main table name
  protected tableName = 'gps';

  public async up() {
    // Create the 'gps' table
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary(); // Auto-incrementing primary key (number)

      table.string('latitude', 50).notNullable(); // latitude column
      table.string('length', 50).notNullable(); // length column (likely longitude)

      // Foreign key column referencing the 'machinery' table
      // ¡MODIFICACIÓN AQUÍ! Referenciamos la tabla en plural 'machineries'.
      table
        .integer('machinery_id') // The foreign key column name from your model
        .unsigned()
        .references('id') // References the 'id' column
        .inTable('machineries') // <--- Nombre de la tabla referenciada cambiado a plural
        .onDelete('CASCADE') // If machinery is deleted, delete associated GPS entries
        .notNullable(); // Based on your model definition

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true);

      // Optional: Add an index on the foreign key for performance
      // table.index(['machinery_id']);
    });
  }

  public async down() {
    // Drop the 'gps' table
    this.schema.dropTableIfExists(this.tableName);
  }
}