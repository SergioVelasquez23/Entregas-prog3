import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TurnoValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    operator_id: schema.number([
      rules.exists({ table: 'operarios', column: 'id' }),
    ]),
    machinery_id: schema.number([
      rules.exists({ table: 'maquinas', column: 'id' }),
    ]),
    date: schema.date(),
  })

  public messages: CustomMessages = {
    'operarioId.required': 'El ID del operario es obligatorio.',
    'operarioId.exists': 'El operario especificado no existe.',
    'maquinaId.required': 'El ID de la máquina es obligatorio.',
    'maquinaId.exists': 'La máquina especificada no existe.',
    'fecha.required': 'La fecha es obligatoria.',
    'hora.required': 'La hora es obligatoria.',
    'hora.regex': 'El formato de hora debe ser HH:MM:SS'
  }
}