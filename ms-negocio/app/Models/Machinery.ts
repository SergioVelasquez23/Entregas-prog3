import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany, ManyToMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Operator from 'App/Models/Operator'
import TypeService from './TypeService'
import Combo from './Combo'
import Maintenance from './Maintenance'
import Insurance from './Insurance'

export default class Machinery extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public speciality: string

  @column()
  public brand: string

  @column()
  public model: string

  @column()
  public status: string

  @column()
  public location: string

  @column()
  public disponibility: boolean

  @column.date()
  public assignment_date: DateTime

  @column.date()
  public retirement_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Operator, {
    pivotTable: 'shifts',
    pivotForeignKey: 'machinery_id',
    pivotRelatedForeignKey: 'operator_id',
  })
  public operators: ManyToMany<typeof Operator>

  @manyToMany(() => TypeService, {
    pivotTable: 'machinery_speciality',
    pivotForeignKey: 'machinery_id',
    pivotRelatedForeignKey: 'type_service_id',
  })
  public specialities: ManyToMany<typeof TypeService>

  @manyToMany(() => Combo, {
    pivotTable: 'combos_machinery',
    pivotForeignKey: 'machinery_id',
    pivotRelatedForeignKey: 'combo_id',
  })
  public combos: ManyToMany<typeof Combo>

  @hasMany (() => Maintenance, {
    foreignKey: 'machinery_id',
  })
  public maintenances: HasMany<typeof Maintenance>

  @manyToMany(() => Insurance, {
    pivotTable: 'policies',
    pivotForeignKey: 'machinery_id',
    pivotRelatedForeignKey: 'insurance_id',
  })
  public insurances: ManyToMany<typeof Insurance>
}
