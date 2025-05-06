  import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Quota from './Quota'
import Evidence from './Evidence'
import Combo from './Combo'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public cost: number;

  @column.dateTime()
  public start_date: DateTime

  @column.date()
  public end_date: DateTime;

  @column()
  public priority: string

  @column()
  public type: string

  @column()
  public status: string

  @column()
  public location: string

  @column()
  public summary: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Quota, {
    foreignKey: 'service_id',
  })
  public Quota: HasMany<typeof Quota>

  @hasMany(() => Evidence, {
    foreignKey: 'service_id',
  })
  public evidence: HasMany<typeof Evidence>

  @hasOne(() => Combo, {
    foreignKey: 'service_id',
  })
  public combo: HasOne<typeof Combo>
}
