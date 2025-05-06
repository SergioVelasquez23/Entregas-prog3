import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Novelty from './Novelty'

export default class Evidence extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public file_type: string

  @column()
  public file_content: string

  @column()
  public load_date: DateTime

  @column()
  public service_id: number

  @column()
  public novelty_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Service, {
    foreignKey: 'service_id',
  })
  public service: BelongsTo<typeof Service>

  @belongsTo(() => Novelty, {
    foreignKey: 'novelty_id',
  })
  public novelty: BelongsTo<typeof Novelty>
}
