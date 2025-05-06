import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Construction from './Construction'
import Ruler from './Ruler'
import Department from './Departament'

export default class Municipality extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public department_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Ruler, {
    pivotTable: 'municipalities_ruler',
    pivotForeignKey: 'municipality_id',
    pivotRelatedForeignKey: 'ruler_id',
    pivotColumns: ['start_date', 'end_date'], // Columnas adicionales en la tabla intermedia
  })
  public rulers: ManyToMany<typeof Ruler>

  @manyToMany (() => Construction, {
    pivotTable : 'municipalities_constructions',
    pivotForeignKey: 'municipality_id',
    pivotRelatedForeignKey: 'construction_id'
  })
  public constructions: ManyToMany<typeof Construction>

  @belongsTo(() => Department, {
    foreignKey: 'department_id', 
  })
  public department: BelongsTo<typeof Department>
}
