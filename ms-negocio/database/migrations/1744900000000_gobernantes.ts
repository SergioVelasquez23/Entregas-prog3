import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Gobernantes extends BaseSchema {
  protected tableName = 'gobernantes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('usuario_id')// Relación con usuarios
      table.string('periodo_init').notNullable()
      table.string('periodo_end').notNullable()
      table.integer('id_municipio').unsigned().references('id').inTable('municipios').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.integer('id_departamento').unsigned().references('id').inTable('departamentos').onDelete('CASCADE')


    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}