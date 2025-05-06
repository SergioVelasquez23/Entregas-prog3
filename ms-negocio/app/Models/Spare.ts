import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import MaintenanceProcedure from './MaintenanceProcedure'

export default class Repuesto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public brand: string

  @column()
  public description: string

  @manyToMany(() => MaintenanceProcedure, {
    pivotTable: 'spare_maintenance_procedures', // Nombre de la tabla pivote
    pivotForeignKey: 'spare_id', // Clave foránea que apunta a Repuesto
    pivotRelatedForeignKey: 'procedure_id', // Clave foránea que apunta a ProcedimientoMantenimiento
  })
  public procedures: ManyToMany<typeof MaintenanceProcedure>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
