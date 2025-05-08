import BaseSchema from '@ioc:Adonis/Lucid/Schema';

// Nombre de clase más descriptivo
export default class RulersSchema extends BaseSchema {
  // Nombre de la tabla principal (pluralizado según convención de Adonis)
  protected tableName = 'rulers';

  // Eliminamos las variables para los nombres de las tablas pivot, ya no se manejan aquí
  // protected rulerDepartmentTable = 'ruler_department';
  // protected rulerMunicipalityTable = 'ruler_municipality';

  public async up() {
    // Crea la tabla 'rulers'
    this.schema.createTable(this.tableName, (table) => { // Usamos this.tableName
      table.increments('id').primary(); // Auto-incrementing primary key (number)

      // ELIMINAMOS EL BLOQUE DE user_id COMPLETAMENTE, según tu indicación de NO poner FK a users.
      /*
      // user_id column. Assuming it references a 'users' table with a string PK.
      // Adjust type and references if your 'users' table is different.
       table
         .string('user_id', 36) // Asumiendo PK de users es string de 36 caracteres (como UUID)
         .references('id') // Referencia la columna 'id' en la tabla users
         .inTable('users') // Asegúrate de que el nombre de la tabla users sea correcto
         .onDelete('CASCADE') // Si se elimina el usuario, se elimina el ruler asociado
         .notNullable()
         .unique(); // Opcional: si un usuario solo puede ser ruler una vez
      */

      // Columnas para el período de gobernanza (matching model names)
      // Usa 'date' si solo almacenas la fecha. Usa 'dateTime' si necesitas info de hora.
      table.date('start_period').notNullable();
      table.date('end_period').nullable(); // End date can be null

      // Automatic timestamp columns (created_at, updated_at)
      table.timestamps(true); // Usando el helper de Adonis
    });

    // ELIMINAMOS TODO EL BLOQUE QUE CREA LA TABLA PIVOT 'ruler_department'
    // Este código DEBE estar en su propio archivo de migración (el de timestamp 174942873923, renombrado a > 10).
    /*
    this.schema.createTable(this.rulerDepartmentTable, (table) => {
       table.integer('ruler_id').unsigned().references('id').inTable(this.tableName).onDelete('CASCADE').notNullable();
       table.integer('department_id').unsigned().references('id').inTable('departments').onDelete('CASCADE').notNullable();
       table.date('start_date').notNullable();
       table.date('end_date').nullable();
       table.primary(['ruler_id', 'department_id']);
    });
    */

    // ELIMINAMOS TODO EL BLOQUE QUE CREA LA OTRA TABLA PIVOT 'ruler_municipality'
    // Este código DEBE estar en su propio archivo de migración.
    /*
     this.schema.createTable(this.rulerMunicipalityTable, (table) => {
        table.integer('ruler_id').unsigned().references('id').inTable(this.tableName).onDelete('CASCADE').notNullable();
        table.string('municipality_id', 36).references('id').inTable('municipalities').onDelete('CASCADE').notNullable();
        table.date('start_date').notNullable();
        table.date('end_date').nullable();
        table.primary(['ruler_id', 'municipality_id']);
     });
     */
  }

  public async down() {
    // Elimina las tablas en orden inverso de creación dentro de este archivo
    // ELIMINAMOS las instrucciones para eliminar las tablas pivot, ya no se crean aquí.
    // this.schema.dropTableIfExists(this.rulerMunicipalityTable);
    // this.schema.dropTableIfExists(this.rulerDepartmentTable);
    this.schema.dropTableIfExists(this.tableName); // Elimina la tabla principal
  }
}