import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Cuotas extends BaseSchema {
  protected tableName = 'cuotas'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
<<<<<<< HEAD
      table.increments('id') // ID de la cuota
      table.integer('id_servicio').unsigned().references('id').inTable('servicios').onDelete('CASCADE') // Relación con servicios
      table.string('email').notNullable() // Email del comprador
      table.decimal('monto', 10, 2).notNullable() // Monto de la cuota
      table.date('fecha_vencimiento').notNullable() // Fecha de vencimiento
      table.boolean('pagada').defaultTo(false).notNullable() // Indica si la cuota ha sido pagada
      table.timestamps(true) // Timestamps
=======
      table.increments('id')
      table.integer('id_servicio').notNullable().unsigned().references('id').inTable('servicios').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now());
>>>>>>> 5479768d0ad9fb762dfe7d5dc4285a664de7e301
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.string('nombre_cliente').notNullable(); // Nombre del cliente
      table.string('referencia_pago').unique().notNullable(); // Referencia única para el pago
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('nombre_cliente');
      table.dropColumn('referencia_pago');
    });

    this.schema.dropTable(this.tableName)
  }
}
