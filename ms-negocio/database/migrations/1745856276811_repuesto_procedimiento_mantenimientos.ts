import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RepuestoProcedimientoMantenimientos extends BaseSchema {
  protected tableName = 'repuesto_procedimiento_mantenimientos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('procedimiento_id')
        .unsigned()
        .references('id')
        .inTable('procedimientos')
        .onDelete('CASCADE')
      table
        .integer('repuesto_id')
        .unsigned()
        .references('id')
        .inTable('repuestos')
        .onDelete('CASCADE')
      table.unique(['procedimiento_id', 'repuesto_id'], 'repuesto_proc_mant_unique') // Nombre más corto
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}