import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SpecialitiesOperatorValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    operator_id: schema.number([
      rules.required(),
      rules.exists({ table: 'operators', column: 'id' }),
    ]),
    speciality_id: schema.number([
      rules.required(),
      rules.exists({ table: 'specialities', column: 'id' }),
    ]),
  })

  public messages: CustomMessages = {
    'operario_id.required': 'El ID del operario es obligatorio',
    'operario_id.exists': 'El operario especificado no existe',
    'especialidad_id.required': 'El ID de la especialidad es obligatorio',
    'especialidad_id.exists': 'La especialidad especificada no existe',
  }
}
