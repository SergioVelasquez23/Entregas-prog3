import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Operator from 'App/Models/Operator'
import Machinery from 'App/Models/Machinery'
import Insurance from 'App/Models/Insurance'

export enum OperatorPolicyType {
  ARL = 'ARL',
  LIFE_INSURANCE = 'LIFE_INSURANCE',
  ACCIDENT_INSURANCE = 'ACCIDENT_INSURANCE',
}

export enum MachineryPolicyType {
  ALL_RISK = 'ALL_RISK',
  CIVIL_LIABILITY = 'CIVIL_LIABILITY',
  THIRD_PARTY_DAMAGE = 'THIRD_PARTY_DAMAGE',
}

export type PolicyType = OperatorPolicyType | MachineryPolicyType;
export default class Policy extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public machinery_id: number | null

  @column()
  public operator_id: number | null

  @column()
  public insurance_id: number

  @column()
  public type_policy: PolicyType

  @column()
  public start_date: DateTime

  @column()
  public end_date: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Operator,{
    foreignKey: 'operator_id',
  })
  public operator: BelongsTo<typeof Operator>

  @belongsTo(() => Machinery,{
    foreignKey: 'machinery_id',
  })
  public machinery: BelongsTo<typeof Machinery>

  @belongsTo(() => Insurance,{
    foreignKey: 'insurance_id',
  })
  public insurance: BelongsTo<typeof Insurance>
}
