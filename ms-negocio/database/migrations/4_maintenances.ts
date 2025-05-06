import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Maintenances extends BaseSchema {
  protected tableName = 'maintenances'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.timestamp('date', { useTz: false }).notNullable()
      table.string('status').notNullable()
      table.string('responsable').notNullable()
      table
        .integer('machinery_id')
        .unsigned()
        .references('id')
        .inTable('machineries')
        .onDelete('CASCADE')
      table.timestamp('created_at', { useTz: false }).notNullable()
      table.timestamp('updated_at', { useTz: false }).notNullable()

      table.index(['machinery_id'], 'idx_maintenance_machinery')
    })

    // Pivot table for Maintenance-Procedure relationship
    this.schema.createTable('maintenances_procedure', (table) => {
      table.increments('id').primary()
      table
        .integer('maintenance_id')
        .unsigned()
        .references('id')
        .inTable('maintenances')
        .onDelete('CASCADE')
      table
        .integer('procedure_id')
        .unsigned()
        .references('id')
        .inTable('procedures')
        .onDelete('CASCADE')
      table.timestamp('created_at', { useTz: false }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: false }).defaultTo(this.now())

      table.index(['maintenance_id', 'procedure_id'], 'idx_maintenances_procedure')
    })
  }

  public async down() {
    this.schema.dropTable('maintenances_procedure')
    this.schema.dropTable(this.tableName)
  }
}