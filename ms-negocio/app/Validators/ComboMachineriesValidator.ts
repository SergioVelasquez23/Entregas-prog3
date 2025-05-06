import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ComboMachineryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    // id: No se valida en creación porque es autogenerado
    machinery_id: schema.number([
      rules.required(),
      rules.exists({ table: 'machineries', column: 'id' }),
    ]),
    combo_id: schema.number([
      rules.required(),
      rules.exists({ table: 'combos', column: 'id' }),
    ]),
  })

  public messages = {
    'maquina_id.required': 'El ID de la máquina es obligatorio',
    'maquina_id.exists': 'La máquina especificada no existe',
    'combo_id.required': 'El ID del combo es obligatorio',
    'combo_id.exists': 'El combo especificado no existe',
  }
}
