import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  // Table name for the dedicated pivot model
  // Based on model name MachinerySpeciality -> machinery_specialities (pluralized)
  // NOTA: Las FKs apuntan a type_services y machineries. Un nombre como 'type_services_machineries'
  // podría ser más claro, pero mantenemos este nombre si es el que usas en tus modelos/relaciones.
  protected tableName = 'machineries_speciality';

  public async up() {
    // Create the 'machineries_speciality' table
    this.schema.createTable(this.tableName, (table) => {
      // Primary key for the dedicated pivot table itself
      table.increments('id').primary();

      // Foreign key referencing the 'type_services' table
      // Assuming the 'type_services' table exists and its PK is a number 'id'.
      // Asegúrate de que la migración de type_services corre ANTES que esta.
      table
        .integer('type_service_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('type_services') // In the 'type_services' table (Adjust name if needed)
        .onDelete('CASCADE') // If a type service is deleted, delete entries here
        .notNullable();

      // Foreign key referencing the 'machinery' table
      // Asegúrate de que la migración de machineries (1_machineries) corre ANTES que esta.
      // ¡MODIFICACIÓN AQUÍ! Referenciamos la tabla en plural 'machineries'.
      table
        .integer('machinery_id') // Foreign key column name from your model
        .unsigned() // Ensures the number is positive
        .references('id') // References the 'id' column
        .inTable('machineries') // <--- Nombre de la tabla referenciada cambiado a plural
        .onDelete('CASCADE') // If machinery is deleted, delete entries here
        .notNullable();

      // Additional column from your dedicated pivot model
      table.string('type_work', 255).notNullable(); // type_work column

      // Automatic timestamp columns (created_at, updated_at) from your model
      table.timestamps(true);

      // Optional: Add a unique index if the combination of type_service_id and machinery_id
      // should always be unique in this pivot table (one relationship entry per pair).
      // Si tu base de datos da error de nombre largo aquí, necesitarías nombrarlo explícitamente:
      // table.unique(['type_service_id', 'machinery_id'], 'ts_mach_unique'); // Ejemplo de nombre corto
      table.unique(['type_service_id', 'machinery_id']); // Mantener si funciona, nombrar si da error
    });
  }

  public async down() {
    // Drop the 'machineries_speciality' table
    this.schema.dropTableIfExists(this.tableName);
  }
}