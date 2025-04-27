import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CrearMensajeValidator {
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
    // id: No se valida en creación porque es autogenerado
    contenido: schema.string({}, [
      rules.required(),
      rules.minLength(1),
      rules.maxLength(500),
    ]),
    fecha: schema.date({}, [
      rules.required(),
    ]),
    hora: schema.string({}, [
      rules.required(),
      rules.regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/), // Formato HH:MM
    ]),
    chat_id: schema.number([
      rules.required(),
      rules.exists({ table: 'chats', column: 'id' }),
    ]),
    usuario_id: schema.number([
      rules.required(),
      rules.exists({ table: 'usuarios', column: 'id' }),
    ]),
  })

  public messages = {
    'contenido.required': 'El contenido del mensaje es obligatorio',
    'contenido.minLength': 'El contenido debe tener al menos 1 carácter',
    'contenido.maxLength': 'El contenido no puede exceder los 500 caracteres',
    'fecha.required': 'La fecha es obligatoria',
    'hora.required': 'La hora es obligatoria',
    'hora.regex': 'La hora debe tener el formato HH:MM (por ejemplo, 14:30)',
    'chat_id.required': 'El ID del chat es obligatorio',
    'chat_id.exists': 'El chat especificado no existe',
    'usuario_id.required': 'El ID del usuario es obligatorio',
    'usuario_id.exists': 'El usuario especificado no existe',
  }
}
