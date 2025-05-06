import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Gps extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public latitude: string

  @column()
  public length: string

  @column()
  public machinery_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //se puede poner bidireccional
  // @belongsTo(() => Maquina, {
  //   foreignKey: 'maquina_id',
  // })
  // public maquina: BelongsTo<typeof Maquina>
}
