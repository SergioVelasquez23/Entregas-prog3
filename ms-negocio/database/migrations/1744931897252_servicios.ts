import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Servicios extends BaseSchema {
    protected tableName = 'servicios';

<<<<<<< HEAD
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('costo').notNullable(),
        table.date('f_inicio').notNullable(),
        table.date('f_fin').notNullable(),
        table.string('prioridad').notNullable(),
        table.string('tipo').notNullable(),
        table.string('estado').notNullable(),
        table.string('ubicacion').notNullable(),
        table.string('resumen').notNullable(),
        /**
         * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
=======
    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary();
            table.integer('costo').notNullable();
            table.dateTime('f_inicio').notNullable();
            table.dateTime('f_fin').notNullable();
            table.string('prioridad').notNullable();
            table.string('tipo').notNullable();
            table.string('estado').notNullable();
            table.string('ubicacion').notNullable();
            table.string('resumen').notNullable();
            table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
            table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
        });
    }

    public async down() {
        this.schema.dropTable(this.tableName);
    }
>>>>>>> 5479768d0ad9fb762dfe7d5dc4285a664de7e301
}