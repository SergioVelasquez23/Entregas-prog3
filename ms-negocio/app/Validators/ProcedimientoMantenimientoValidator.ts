import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProcedimientoMantenimientoValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    procedimiento_id: schema.number([
      rules.required(),
      rules.exists({ table: 'procedimientos', column: 'id' }),
    ]),
    mantenimiento_id: schema.number([
      rules.required(),
      rules.exists({ table: 'mantenimientos', column: 'id' }),
    ]),
    estado: schema.string([
      rules.required(),
      rules.exists({ table: 'procedimiento_mantenimiento', column: 'id' }),
    ]),
  })

  public messages = {
    'procedimiento_id.required': 'El ID del procedimiento es obligatorio',
    'procedimiento_id.exists': 'El procedimiento especificado no existe',
    'mantenimiento_id.required': 'El ID del mantenimiento es obligatorio',
    'mantenimiento_id.exists': 'El mantenimiento especificado no existe',
  }
}
