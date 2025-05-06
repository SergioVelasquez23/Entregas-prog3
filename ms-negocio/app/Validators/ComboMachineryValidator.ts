import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ComboMachineryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    machinery_id: schema.number([
      rules.exists({ table: 'machineries', column: 'id' }),
      rules.unique({
        table: 'combo_machineries',
        column: 'machinery_id',
      })
    ]),
    combo_id: schema.number([
      rules.exists({ table: 'combos', column: 'id' })
    ])
  })

  public messages: CustomMessages = {
    'maquina_id.required': 'El ID de la máquina es obligatorio.',
    'maquina_id.exists': 'La máquina especificada no existe.',
    'maquina_id.unique': 'Esta máquina ya está asignada a este combo.',
    'maquina_id.number': 'El ID de la máquina debe ser un número.',
    'combo_id.required': 'El ID del combo es obligatorio.',
    'combo_id.exists': 'El combo especificado no existe.',
    'combo_id.number': 'El ID del combo debe ser un número.'
  }
}