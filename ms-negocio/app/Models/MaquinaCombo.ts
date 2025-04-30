import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class MaquinaCombo extends BaseModel {
  public static table = "maquinas_combos"
  @column({ isPrimary: true })
  public id: number

  @column()
  public maquina_id: number

  @column()
  public combo_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime  
}
