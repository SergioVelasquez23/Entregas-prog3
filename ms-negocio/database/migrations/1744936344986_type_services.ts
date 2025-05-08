import BaseSchema from '@ioc:Adonis/Lucid/Schema';

// Esta migración solo crea la tabla principal type_services
export default class TypeServicesSchema extends BaseSchema {
  protected tableName = 'type_services';

  // Eliminamos la variable para el nombre de la tabla pivot, ya no se maneja aquí
  // protected machinerySpecialitiesTable = 'machinery_specialities';

  public async up() {
    // Create the 'type_services' table
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary(); // Auto-incrementing primary key (number)
      table.string('name', 255).notNullable(); // name column
      table.string('description', 500).notNullable(); // description column
      table.timestamps(true); // Automatic timestamp columns
    });

    // ELIMINAMOS TODO EL BLOQUE QUE CREA LA TABLA PIVOT 'machinery_specialities'
    // Este código DEBE estar en el NUEVO archivo de migración que creaste.
    /*
    this.schema.createTable(this.machinerySpecialitiesTable, (table) => {
      // ... código de la tabla pivot
    });
    */
  }

  public async down() {
    // Drop tables in reverse order of creation within this file
    // ELIMINAMOS la instrucción para eliminar la tabla pivot, ya no se crea aquí.
    // this.schema.dropTableIfExists(this.machinerySpecialitiesTable);
    this.schema.dropTableIfExists(this.tableName); // Then drop main table
  }
}