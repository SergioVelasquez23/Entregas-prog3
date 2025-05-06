import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Novelty from 'App/Models/Novelty'

export default class Turno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column() 
  public date: DateTime

  @column()
  public operator_id: number

  @column()
  public machinery_id: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Novelty,{
    foreignKey: 'shift_id',
  })
  public novelties: HasMany<typeof Novelty>
}
