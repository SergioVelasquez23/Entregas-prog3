import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ProceduresSchema extends BaseSchema { // Nombre de clase más descriptivo
  // Nombre de la tabla principal (procedures)
  protected tableName = 'procedures';

  // Eliminamos la variable para el nombre de la tabla pivot, ya no se maneja aquí
  // protected maintenancesProceduresTable = 'maintenances_procedures';

  public async up() {
    // Create the 'procedures' table
    this.schema.createTable(this.tableName, (table) => { // Usamos this.tableName
      table.increments('id').primary(); // Auto-incrementing primary key (number)

      table.string('name', 255).notNullable(); // name column

      // Description column. Using 'text' type for potentially longer descriptions.
      table.text('description').notNullable(); // description column

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true);
    });

    // ELIMINAMOS TODO EL BLOQUE QUE CREA LA TABLA PIVOT 'maintenances_procedures'
    // Este código debe estar en otro archivo de migración.
    /*
    this.schema.createTable(this.maintenancesProceduresTable, (table) => {
      .integer('procedure_id').unsigned().references('id').inTable(this.proceduresTable).onDelete('CASCADE').notNullable();
      .integer('maintenance_id').unsigned().references('id').inTable('maintenances').onDelete('CASCADE').notNullable();
      table.primary(['procedure_id', 'maintenance_id']);
       table.timestamps(true);
    });
    */
  }

  public async down() {
    // Drop tables in reverse order of creation within this file
    // ELIMINAMOS la instrucción para eliminar la tabla pivot, ya no se crea aquí.
    // this.schema.dropTableIfExists(this.maintenancesProceduresTable);
    this.schema.dropTableIfExists(this.tableName); // Drop the main table
  }
}