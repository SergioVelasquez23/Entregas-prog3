import BaseSchema from '@ioc:Adonis/Lucid/Schema';

// Nombre de clase más descriptivo, aunque no afecta la ejecución si no se cambia el archivo
export default class DepartamentsSchema extends BaseSchema {
  // Nombre de la tabla principal (pluralizado según convención de Adonis)
  protected tableName = 'departaments';

  // Eliminamos la variable para el nombre de la tabla pivot, ya no se maneja aquí
  // protected departmentRulerTable = 'departments_ruler';

  public async up() {
    // Crea la tabla 'departaments'
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary(); // Clave primaria

      table.string('name', 255).notNullable(); // Columna 'name'

      // Columnas de timestamp (createdAt y updatedAt)
      table.timestamps(true); // Usando el helper de Adonis
      // O usa table.dateTime('created_at').notNullable() y table.dateTime('updated_at').notNullable() si prefieres
    });

    // ELIMINAMOS TODO EL BLOQUE QUE CREA LA TABLA PIVOT 'departments_ruler'
    // Este código DEBE estar en otro archivo de migración (el de timestamp 174942873923, renombrado a > 10).
    /*
    this.schema.createTable(this.departmentRulerTable, (table) => {
      .integer('departament_id').unsigned().references('id').inTable(this.departamentsTable).onDelete('CASCADE').notNullable();
      .integer('ruler_id').unsigned().references('id').inTable('rulers').onDelete('CASCADE').notNullable();
      table.dateTime('start_date').notNullable();
      table.dateTime('end_date').nullable();
      table.primary(['departament_id', 'ruler_id']);
       table.timestamps(true);
    });
    */
  }

  public async down() {
    // Elimina las tablas en orden inverso de creación dentro de este archivo
    // ELIMINAMOS la instrucción para eliminar la tabla pivot, ya no se crea aquí.
    // this.schema.dropTableIfExists(this.departmentRulerTable);
    this.schema.dropTableIfExists(this.tableName); // Elimina la tabla principal
  }
}