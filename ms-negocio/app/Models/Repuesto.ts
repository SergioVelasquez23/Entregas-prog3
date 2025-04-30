import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import ProcedimientoMantenimiento from './ProcedimientoMantenimiento'

export default class Repuesto extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public marca: string

  @column()
  public descripcion: string

  @manyToMany(() => ProcedimientoMantenimiento, {
    pivotTable: 'repuesto_procedimiento_mantenimiento', // Nombre de la tabla pivote
    pivotForeignKey: 'repuesto_id', // Clave foránea que apunta a Repuesto
    pivotRelatedForeignKey: 'procedimiento_id', // Clave foránea que apunta a ProcedimientoMantenimiento
  })
  public procedimientos: ManyToMany<typeof ProcedimientoMantenimiento>


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
