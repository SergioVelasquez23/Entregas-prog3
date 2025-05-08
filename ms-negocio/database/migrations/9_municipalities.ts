import BaseSchema from '@ioc:Adonis/Lucid/Schema';

// Nombre de clase más descriptivo
export default class MunicipalitiesSchema extends BaseSchema {
  // Nombre de la tabla principal (pluralizado según convención de Adonis)
  protected tableName = 'municipalities';

  // Eliminamos las variables para los nombres de las tablas pivot, ya no se manejan aquí
  // protected municipalityRulerTable = 'municipalities_ruler';
  // protected municipalityConstructionTable = 'municipalities_constructions';

  public async up() {
    // Crea la tabla 'municipalities'
    this.schema.createTable(this.tableName, (table) => { // Usamos this.tableName
      // Clave primaria de tipo string, como en tu modelo.
      // Asegúrate de que los valores que insertas son únicos.
      // Si usaras UUIDs, sería table.uuid('id').primary()
      table.string('id', 36).primary(); // Usamos un tamaño razonable para un string ID

      table.string('name', 255).notNullable(); // Columna 'name'

      // Columna para la clave foránea que referencia a Departament
      // Asumimos que la PK de departaments es number.
      table
        .integer('department_id') // Es number porque la PK de Departament es number
        .unsigned() // Asegura que es positivo
        .references('id') // Referencia la columna 'id'
        .inTable('departaments') // En la tabla 'departaments' (Asegúrate que este nombre sea correcto)
        .onDelete('CASCADE') // Si se elimina un departamento, se eliminan los municipios asociados
        .notNullable();

      // Columnas de timestamp
      table.timestamps(true); // Usando el helper de Adonis
      // O usa table.dateTime('created_at').notNullable() y table.dateTime('updated_at').notNullable() si prefieres
    });

    // ELIMINAMOS TODO EL BLOQUE QUE CREA LA TABLA PIVOT 'municipalities_ruler'
    // Este código DEBE estar en su propio archivo de migración (el de timestamp 174942873922, renombrado a > 10).
    /*
    this.schema.createTable(this.municipalityRulerTable, (table) => {
       table.string('municipality_id', 36).references('id').inTable(this.tableName).onDelete('CASCADE').notNullable();
       table.integer('ruler_id').unsigned().references('id').inTable('rulers').onDelete('CASCADE').notNullable();
       table.dateTime('start_date').notNullable();
       table.dateTime('end_date').nullable();
       table.primary(['municipality_id', 'ruler_id']);
    });
    */

    // ELIMINAMOS TODO EL BLOQUE QUE CREA LA OTRA TABLA PIVOT 'municipalities_constructions'
    // Este código DEBE estar en su propio archivo de migración (el de timestamp 174942873923, renombrado a > 10 y posterior a la de municipality_ruler si importa)
    /*
     this.schema.createTable(this.municipalityConstructionTable, (table) => {
        table.string('municipality_id', 36).references('id').inTable(this.tableName).onDelete('CASCADE').notNullable();
        table.integer('construction_id').unsigned().references('id').inTable('constructions').onDelete('CASCADE').notNullable();
        table.primary(['municipality_id', 'construction_id']);
     });
     */
  }

  public async down() {
    // Elimina las tablas en orden inverso de creación dentro de este archivo
    // ELIMINAMOS las instrucciones para eliminar las tablas pivot, ya no se crean aquí.
    // this.schema.dropTableIfExists(this.municipalityConstructionTable);
    // this.schema.dropTableIfExists(this.municipalityRulerTable);
    this.schema.dropTableIfExists(this.tableName); // Elimina la tabla principal al final
  }
}