import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FacturaValidator {
  constructor(protected ctx: HttpContextContract) { }

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
      rules.exists({ table: 'facturas', column: 'id' }),
    ]),
    detalle: schema.string({}, [
      rules.required(),
      rules.minLength(10),
      rules.maxLength(500),
    ]),
    id_cuota: schema.number([
      rules.required(),
      rules.exists({ table: 'cuotas', column: 'id' }),
    ]),

  })

  public messages = {
    'detalle.required': 'El detalle es obligatorio',
    'detalle.minLength': 'El detalle debe tener al menos 10 caracteres',
    'detalle.maxLength': 'El detalle no puede exceder los 500 caracteres',

  }

  public validate(payload: any) {
    console.log('Validando id_cuota:', payload.id_cuota);
  }
}
