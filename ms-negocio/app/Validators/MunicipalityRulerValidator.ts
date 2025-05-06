import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MunicipalityRulerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    ruler_id: schema.number([
      rules.exists({ table: 'rulers', column: 'id' })
    ]),
    municipality_id: schema.number([
      rules.exists({ table: 'municipalities', column: 'id' }),
      rules.unique({
        table: 'municipalities_rulers',
        column: 'municipality_id',
      }),
    ]),
    start_date: schema.date(),
    end_date: schema.date({}, [
      rules.afterField('fecha_inicio')
    ])
  })

  public messages: CustomMessages = {
    'gobernante_id.required': 'El ID del gobernante es obligatorio',
    'gobernante_id.exists': 'El gobernante no existe',
    'municipio_id.required': 'El ID del municipio es obligatorio',
    'municipio_id.exists': 'El municipio no existe',
    'municipio_id.unique': 'Este municipio ya está asignado a este gobernante',
    'fecha_inicio.required': 'La fecha de inicio es obligatoria',
    'fecha_fin.required': 'La fecha de fin es obligatoria',
    'fecha_fin.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio'
  }
}