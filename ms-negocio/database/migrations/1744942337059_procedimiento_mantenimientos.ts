import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'procedimiento_mantenimientos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('procedimiento_id').unsigned().references('id').inTable('procedimientos').onDelete('CASCADE')
      table.integer('mantenimiento_id').unsigned().references('id').inTable('mantenimientos').onDelete('CASCADE')
      table.string('estado').notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
