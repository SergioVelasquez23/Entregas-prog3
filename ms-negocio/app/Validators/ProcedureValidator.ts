import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProcedureValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    description: schema.string({ trim: true }, [
      rules.maxLength(500)
    ])
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre del procedimiento es obligatorio.',
    'nombre.maxLength': 'El nombre no puede exceder los 255 caracteres.',
    'descripcion.required': 'La descripción del procedimiento es obligatoria.',
    'descripcion.maxLength': 'La descripción no puede exceder los 500 caracteres.'
  }
}