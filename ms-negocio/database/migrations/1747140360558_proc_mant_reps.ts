import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'proc_mant_reps'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('procedimiento_mantenimiento_id')
        .unsigned()
        .references('id')
        .inTable('procedimiento_mantenimientos')
        .onDelete('CASCADE')
      table
        .integer('repuesto_id')
        .unsigned()
        .references('id')
        .inTable('repuestos')
        .onDelete('CASCADE')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
