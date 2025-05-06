import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Operators extends BaseSchema {
  // Table name in English (plural of Operator)
  protected tableName = 'operators';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id'); // Primary key
      table.string('user_id').notNullable().unique(); // User ID column
      table.string('experience').notNullable(); // Experience column (translated from 'experiencia')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}