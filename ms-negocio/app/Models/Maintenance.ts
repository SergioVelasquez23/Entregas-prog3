import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany,ManyToMany, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Procedure from './Procedure'
import Machinery from './Machinery'

export default class Maintenance extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date: DateTime

  @column()
  public status: string

  @column()
  public responsable: string

  @column()
  public machinery_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Procedure, {
    pivotTable: 'maintenances_procedure',
    pivotForeignKey: 'maintenance_id',
    pivotRelatedForeignKey: 'procedure_id',
  })
  public procedures: ManyToMany<typeof Procedure>

  @belongsTo(() => Machinery, {
    foreignKey: 'machinery_id',
  })
  public machinery: BelongsTo<typeof Machinery>
}
