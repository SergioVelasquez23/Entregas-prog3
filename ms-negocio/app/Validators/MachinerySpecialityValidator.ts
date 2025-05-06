import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MachinerySpecialityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type_service_id: schema.number([
      rules.exists({ table: 'type_services', column: 'id' }),
    ]),
    machinery_id: schema.number([
      rules.exists({ table: 'machineries', column: 'id' }),
    ]),
    type_work: schema.string({ trim: true }, [
      rules.maxLength(255)
    ])
  })

  public messages: CustomMessages = {
    'tipo_servicio_id.required': 'El ID del tipo de servicio es obligatorio.',
    'tipo_servicio_id.exists': 'El tipo de servicio especificado no existe.',
    'maquina_id.required': 'El ID de la máquina es obligatorio.',
    'maquina_id.exists': 'La máquina especificada no existe.',
    'tipo_trabajo.required': 'El tipo de trabajo es obligatorio',
    'tipo_trabajo.maxLength': 'El tipo de trabajo no puede exceder los 255 caracteres'
  }
}