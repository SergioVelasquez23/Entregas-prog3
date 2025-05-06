import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'
import Ruler from './Ruler'
import { DateTime } from 'luxon'

export default class MunicipalityRuler extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ruler_id: number

  @column()
  public municipality_id: string

  @column.dateTime()
  public start_date: DateTime

  @column.dateTime()
  public end_date: DateTime

  @belongsTo(() => Municipality, {
    foreignKey: 'municipality_id',
  })
  public municipality: BelongsTo<typeof Municipality>

  @belongsTo(() => Ruler, {
    foreignKey: 'ruler_id',
  })
  public ruler: BelongsTo<typeof Ruler>
}
