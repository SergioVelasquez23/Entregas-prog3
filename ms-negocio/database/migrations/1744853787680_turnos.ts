import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'turnos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('fecha').notNullable()
      table.time('hora').notNullable()
      table.integer('operario_id').unsigned().references('id').inTable('operarios').onDelete('CASCADE')
      table.integer('maquina_id').unsigned().references('id').inTable('maquinas').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
