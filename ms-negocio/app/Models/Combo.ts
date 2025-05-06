import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Obra from './Construction'

export default class Combo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public service_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Obra, {
    foreignKey: 'combo_id',
  })
  public constructions: HasMany <typeof Obra>
}
