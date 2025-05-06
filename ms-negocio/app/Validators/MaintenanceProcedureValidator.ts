import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MaintenanceProcedureValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    procedure_id: schema.number([
      rules.exists({ table: 'procedures', column: 'id' }),
    ]),
    maintenance_id: schema.number([
      rules.exists({ table: 'maintenances', column: 'id' }),
    ]),
    status: schema.string({ trim: true }, [
      rules.maxLength(255)
    ])
  })

  public messages: CustomMessages = {
    'procedimiento_id.required': 'El ID del procedimiento es obligatorio.',
    'procedimiento_id.exists': 'El procedimiento especificado no existe.',
    'mantenimiento_id.required': 'El ID del mantenimiento es obligatorio.',
    'mantenimiento_id.exists': 'El mantenimiento especificado no existe.',
    'estado.required': 'El estado es obligatorio.',
    'estado.maxLength': 'El estado no puede exceder los 255 caracteres.'
  }
}