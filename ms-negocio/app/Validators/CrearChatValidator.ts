import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CrearChatValidator {
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
      rules.exists({ table: 'chats', column: 'id' }),
    ]),
    titulo: schema.string({}, [rules.required(), rules.maxLength(50)]),
    tipo: schema.string.optional({}, [rules.maxLength(255)]),
  })

  public messages = {
    'titulo.required': 'El título es obligatorio',
    'titulo.maxLength': 'El título no puede exceder los 50 caracteres',
    'tipo .maxLength': 'La descripción no puede exceder los 255 caracteres',
  }
}
