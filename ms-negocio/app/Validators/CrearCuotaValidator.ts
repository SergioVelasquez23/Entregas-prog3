import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CrearCuotaValidator {
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
    id: schema.number([
      rules.required(),
      rules.exists({ table: 'cuota', column: 'id' }),
    ]),
    idServicio: schema.number([
      rules.required(),
      rules.exists({ table: 'servicios', column: 'id' }),
    ]),
  })

  public messages = {
    'monto.min': 'El monto no puede ser negativo',
    'fecha_vencimiento.after': 'La fecha de vencimiento debe ser futura',
  }
}
