import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Machinery from './Machinery'

export default class TypeService extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany (() => Machinery, {
    pivotTable: 'machinery_specialities',
    pivotForeignKey: 'type_service_id',
    pivotRelatedForeignKey: 'machinery_id',
  })
  public machineries: ManyToMany<typeof Machinery>

}
