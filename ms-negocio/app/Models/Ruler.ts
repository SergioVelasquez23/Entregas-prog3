import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Department from './Departament'
import Municipality from './Municipality'

export default class Gobernante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: string

  @column()
  public start_period: Date

  @column()
  public end_period: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Department, {
    pivotTable: 'departments_ruler',
    pivotColumns: ['start_date', 'end_date'],
    // Columnas adicionales en la tabla intermedia
  })
  public departments: ManyToMany<typeof Department>

  // Relación manyToMany con municipios
  @manyToMany(() => Municipality, {
    pivotTable: 'municipalities_ruler',
    pivotColumns: ['start_date', 'end_date'], // Columnas adicionales en la tabla intermedia
  })
  public municipalities: ManyToMany<typeof Municipality>
}


