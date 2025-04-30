import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'repuestos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.engine('InnoDB') // Asegura compatibilidad con claves foráneas
      table.increments('id').primary() // Clave primaria explícita
      table.string('nombre', 100).notNullable()
      table.string('marca', 100).notNullable()
      table.text('descripcion').notNullable()
      table.decimal('precio', 10, 2).notNullable() // Asegura que el precio esté definido
      table.timestamps() // created_at y updated_at
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
    const hasTable = await this.schema.hasTable('repuestos')
  if (hasTable) {
    await this.schema.dropTable('repuestos')
  }
  }
}