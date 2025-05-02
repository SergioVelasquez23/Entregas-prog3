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
<<<<<<< HEAD
        table.integer('usuario_id').notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
=======
      table.integer('usuario_id').notNullable()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
>>>>>>> 5479768d0ad9fb762dfe7d5dc4285a664de7e301
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
