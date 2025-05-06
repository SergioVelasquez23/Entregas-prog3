import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Shift from 'App/Models/Shift'
import Evidence from './Evidence'

export default class Novelty extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string

  @column()
  public description: string

  @column()
  public evidence: DateTime

  @column()
  public gravity: string

  @column()
  public shift_id: number  

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Shift, {
    foreignKey: 'shift_id',
  })
  public shift: BelongsTo<typeof Shift>

  @hasMany(() => Evidence, {
    foreignKey: 'novelty_id',
  })
  public evidences: HasMany<typeof Evidence>
}
