import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Novelties extends BaseSchema {
  protected tableName = 'novelties'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('type').notNullable()
      table.string('description').notNullable()
      table.timestamp('evidence', { useTz: false }).notNullable()
      table.string('gravity').notNullable()
      table
        .integer('shift_id')
        .unsigned()
        .references('id')
        .inTable('shifts')
        .onDelete('CASCADE')
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()

      table.index(['shift_id'], 'idx_novelty_shift')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}