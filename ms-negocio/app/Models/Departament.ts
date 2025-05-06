import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Ruler from 'App/Models/Ruler'
import Municipality from './Municipality'


export default class Departament extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Ruler, {
    pivotTable: 'departments_ruler',
    pivotForeignKey: 'departament_id',
    pivotRelatedForeignKey: 'ruler_id',
    pivotColumns: ['start_date', 'end_date'], // Columnas adicionales en la tabla intermedia
  })
  public rulers: ManyToMany<typeof Ruler>

  @hasMany(() => Municipality, {
    foreignKey: 'departament_id',
  })
  public municipalities: HasMany<typeof Municipality>


}

