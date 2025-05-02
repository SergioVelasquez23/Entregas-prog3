import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Servicios extends BaseSchema {
    protected tableName = 'servicios';



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

}