import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm' 
import Speciality from 'App/Models/Speciality'
import Machinery from 'App/Models/Machinery'
import Insurance from './Insurance'

export default class Operator extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string

  @column()
  public experience: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Speciality, {
    pivotTable: 'specialities_operator',
    pivotForeignKey: 'operator_id',
    pivotRelatedForeignKey: 'speciality_id',
  })
  public specialities: ManyToMany<typeof Speciality>

  @manyToMany(() => Machinery, {
    pivotTable: 'shifts',
    pivotForeignKey: 'operator_id',
    pivotRelatedForeignKey: 'machinery_id',
  })
  public machineries: ManyToMany<typeof Machinery>

  @manyToMany(() => Insurance, {
    pivotTable: 'policies',
    pivotForeignKey: 'operator_id',
    pivotRelatedForeignKey: 'insurance_id',
  })
  public insurances: ManyToMany<typeof Insurance>
}
