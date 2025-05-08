import BaseSchema from '@ioc:Adonis/Lucid/Schema';

// Asegúrate de que este es el código de tu migración que solo crea la tabla municipalities_constructions
// Y que el nombre del archivo tiene un timestamp posterior a las tablas principales
export default class MunicipalitiesConstructionsSchema extends BaseSchema {
  protected tableName = 'municipalities_constructions';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Foreign key referencing the 'municipalities' table
      // Assuming 'municipalities' PK is string(36)
      table
        .string('municipality_id', 36)
        .references('id')
        .inTable('municipalities') // Assuming 'municipalities' table name
        .onDelete('CASCADE')
        .notNullable();

      // Foreign key referencing the 'constructions' table
      // Assuming 'constructions' PK is number
      table
        .integer('construction_id')
        .unsigned()
        .references('id')
        .inTable('constructions') // Assuming 'constructions' table name
        .onDelete('CASCADE')
        .notNullable();

      // Define the composite primary key for this pivot table
      // ¡MODIFICACIÓN AQUÍ! Pasamos el nombre corto directamente como el segundo argumento.
      table.primary(['municipality_id', 'construction_id'], 'mun_const_pk'); // <--- Sintaxis corregida

      // Optional: Timestamps for the pivot table
      // table.timestamps(true);
    });
  }

  public async down() {
    // Elimina la tabla. La restricción primaria se elimina automáticamente con la tabla.
    this.schema.dropTableIfExists(this.tableName);
  }
}