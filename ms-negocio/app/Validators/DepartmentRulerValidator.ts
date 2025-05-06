import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DepartmentRulerValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    ruler_id: schema.number([
      rules.exists({ table: 'rulers', column: 'id' })
    ]),
    department_id: schema.number([
      rules.exists({ table: 'departments', column: 'id' })
    ]),
    start_date: schema.date(),
    end_date: schema.date({}, [
      rules.afterOrEqual('today')
    ])
  })

  public async validate(data: any) {
    if (data.start_date && data.end_date) {
      if (new Date(data.start_date) >= new Date(data.end_date)) {
        this.ctx.response.status(422).send({
          errors: [{
            field: 'end_date',
            message: 'La fecha de fin debe ser posterior a la fecha de inicio'
          }]
        })
        return false
      }
    }
    return true
  }

  public messages: CustomMessages = {
    'gobernante_id.required': 'El ID del gobernante es obligatorio.',
    'gobernante_id.exists': 'El gobernante especificado no existe.',
    'departamento_id.required': 'El ID del departamento es obligatorio.',
    'departamento_id.exists': 'El departamento especificado no existe.',
    'fecha_inicio.required': 'La fecha de inicio es obligatoria.',
    'fecha_inicio.date': 'La fecha de inicio debe ser una fecha válida.',
    'fecha_fin.required': 'La fecha de fin es obligatoria.',
    'fecha_fin.date': 'La fecha de fin debe ser una fecha válida.',
    'fecha_fin.afterOrEqual': 'La fecha de fin no puede ser en el pasado.'
  }
}