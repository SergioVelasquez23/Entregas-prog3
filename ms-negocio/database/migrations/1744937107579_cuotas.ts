import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'cuotas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // ID de la cuota
      table.integer('id_servicio').unsigned().references('id').inTable('servicios').onDelete('CASCADE') // Relación con servicios
      table.string('email').notNullable() // Email del comprador
      table.decimal('monto', 10, 2).notNullable() // Monto de la cuota
      table.date('fecha_vencimiento').notNullable() // Fecha de vencimiento
      table.boolean('pagada').defaultTo(false).notNullable() // Indica si la cuota ha sido pagada
      table.timestamps(true) // Timestamps
    })
  }
  public async down () {
    this.schema.dropTable(this.tableName)
  }
 }



