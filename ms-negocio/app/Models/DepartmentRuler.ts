import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Departament from './Departament'
import Ruler from './Ruler'

export default class DepartmentRuler extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start_date: DateTime

  @column()
  public end_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public ruler_id: number

  @column()
  public department_id: number

  @belongsTo(() => Departament, {
    foreignKey: 'departament_id',
  })
  public department: BelongsTo<typeof Departament>

  @belongsTo(() => Ruler, {
    foreignKey: 'ruler_id',
  })
  public ruler: BelongsTo<typeof Ruler>
  }
