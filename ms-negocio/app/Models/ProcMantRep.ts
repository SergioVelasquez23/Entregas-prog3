import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProcMantRep extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public procedimiento_mantenimiento_id: number

  @column()
  public repuesto_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
