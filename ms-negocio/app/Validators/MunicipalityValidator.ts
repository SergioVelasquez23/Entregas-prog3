import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MunicipalityValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.maxLength(255)
    ]),
    department_id: schema.number([
      rules.exists({ table: 'departments', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre del municipio es obligatorio.',
    'nombre.maxLength': 'El nombre no puede exceder los 255 caracteres.',
    'departamento_id.required': 'El ID del departamento es obligatorio.',
    'departamento_id.exists': 'El departamento especificado no existe.'
  }
}