import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'machineries'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('speciality').notNullable()
      table.string('brand').notNullable()
      table.string('model').notNullable()
      table.string('status').notNullable()
      table.string('location').notNullable()
      table.boolean('disponibility').notNullable().defaultTo(true)
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
