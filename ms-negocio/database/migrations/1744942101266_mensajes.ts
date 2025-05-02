import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'mensajes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('contenido').notNullable()
      table.date('fecha').notNullable()
      table.time('hora').notNullable()
      table.integer('chat_id').notNullable().unsigned().references('id').inTable('chats').onDelete('CASCADE'),
      table.integer('usuario_id').notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
