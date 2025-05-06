import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Operator from 'App/Models/Operator'

export default class Speciality extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Operator, {
    pivotTable: 'specialities_operator',
    pivotForeignKey: 'speciality_id',
    pivotRelatedForeignKey: 'operator_id',
  })
  public operators: ManyToMany<typeof Operator>
}
