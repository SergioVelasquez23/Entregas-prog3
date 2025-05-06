import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BillValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    detail: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    quota_id: schema.number([
      rules.exists({ table: 'cuotas', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'detail.required': 'El detail de la factura es obligatorio.',
    'detail.maxLength': 'El detail de la factura no puede exceder los 255 caracteres.',
    'quota_id.required': 'El ID de la cuota es obligatorio.',
    'quota_id.exists': 'La cuota especificada no existe.',
    'quota_id.number': 'El ID de la cuota debe ser un número.'
  }
}