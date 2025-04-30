import { DateTime } from 'luxon'
import {BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import Municipio from './Municipio'
import Departamento from './Departamento'

export default class Gobernante extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public periodo_init: string

  @column()
  public periodo_end: string

  @column()
  public id_municipio: number

  @column()
  public id_departamento: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Departamento, {
    foreignKey: 'id_departamento',
  })
  public departamento: BelongsTo<typeof Departamento>

  @belongsTo(() => Municipio, {
    foreignKey: 'id_municipio',
  })
  public municipio: BelongsTo<typeof Municipio>

//   @beforeSave()
// public static async validateXorRelation(gobernante: Gobernante) {
//   const hasDepartamento = !!gobernante.departamento
//   const hasMunicipio = !!gobernante.municipio

//   if (hasDepartamento && hasMunicipio) {
//     throw new Error('Un Gobernante no puede estar asociado a un Departamento y un Municipio al mismo tiempo.')
//   }

//   if (!hasDepartamento && !hasMunicipio) {
//     throw new Error('Un Gobernante debe estar asociado a un Departamento o un Municipio.')
//   }
// }
}
