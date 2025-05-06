import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MachinerySpeciality extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type_service_id: number

  @column()
  public machinery_id: number

  @column()
  public type_work: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
