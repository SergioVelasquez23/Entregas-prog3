import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Shifts extends BaseSchema {
  protected tableName = 'shifts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.timestamp('date', { useTz: false }).notNullable()
      table
        .integer('operator_id')
        .unsigned()
        .references('id')
        .inTable('operators')
        .onDelete('CASCADE')
      table
        .integer('machinery_id')
        .unsigned()
        .references('id')
        .inTable('machineries')
        .onDelete('CASCADE')
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()

      table.index(['operator_id', 'machinery_id'], 'idx_shift_operator_machinery')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}