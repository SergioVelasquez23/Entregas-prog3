import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RulerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    user_id: schema.string({}, [
      rules.exists({ table: 'users', column: 'id' }),
    ]),
    start_period: schema.date(),
    end_period: schema.date({}, [
      rules.afterField('start_period'),
    ]),
  })

  public messages: CustomMessages = {
    'user_id.exists': 'El usuario especificado no existe.',
    'periodoEnd.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio.',
    'tipo.enum': 'El tipo de territorio debe ser "departamento" o "municipio".',
  }
}