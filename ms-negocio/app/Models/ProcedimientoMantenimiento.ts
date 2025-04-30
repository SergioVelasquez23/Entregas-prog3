import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Repuesto from './Repuesto'

export default class ProcedimientoMantenimiento extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public procedimiento_id: number

  @column()
  public mantenimiento_id: number

  @column() 
  public estado: string

  @manyToMany(() => Repuesto, {
    pivotTable: 'repuesto_procedimiento_mantenimiento', // Nombre de la tabla pivote
    pivotForeignKey: 'procedimiento_id', // Clave foránea que apunta a ProcedimientoMantenimiento
    pivotRelatedForeignKey: 'repuesto_id', // Clave foránea que apunta a Repuesto
  })
  public repuestos: ManyToMany<typeof Repuesto>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
