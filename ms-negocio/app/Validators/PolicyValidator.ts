import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { OperatorPolicyType, MachineryPolicyType } from 'App/Models/Policy'

export default class PolicyValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    insurance_id: schema.number([
      rules.exists({ table: 'insurances', column: 'id' }),
    ]),
    machinery_id: schema.number.optional([
      rules.exists({ table: 'machineries', column: 'id' }),
    ]),
    operator_id: schema.number.optional([
      rules.exists({ table: 'operators', column: 'id' }),
    ]),
    type_policy: schema.enum([
      ...Object.values(OperatorPolicyType),
      ...Object.values(MachineryPolicyType)
    ] as const),
    start_date: schema.date(),
    end_date: schema.date(),
  })

  public messages: CustomMessages = {
    'seguroId.required': 'El ID del seguro es obligatorio.',
    'seguroId.exists': 'El seguro especificado no existe.',
    'maquinaId.exists': 'La máquina especificada no existe.',
    'operarioId.exists': 'El operario especificado no existe.',
    'tipoPoliza.required': 'El tipo de póliza es obligatorio.',
    'tipoPoliza.enum': 'El tipo de póliza debe ser uno de los valores permitidos.',
    'fechaInicio.required': 'La fecha de inicio es obligatoria.',
    'fechaFin.required': 'La fecha de fin es obligatoria.',
  }
}