import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'gobernantes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('nombre').notNullable()
      table.string('periodo_init').notNullable(),
      table.string('periodo_end').notNullable(),
      table.integer('id_departamento').unsigned().references('id').inTable('departamentos').onDelete('CASCADE')
      table.integer('id_municipio').unsigned().references('id').inTable('municipios').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
