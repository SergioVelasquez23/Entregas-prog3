import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SpecialityOperator extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() 
  public operator_id: number

  @column()
  public especiality_id: number

  @column()
  public experience_level: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime


  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
