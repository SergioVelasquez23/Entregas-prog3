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
<<<<<<< HEAD
      table.integer('id_departamento').unsigned().references('id').inTable('departamentos').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
=======
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
>>>>>>> 5479768d0ad9fb762dfe7d5dc4285a664de7e301
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}