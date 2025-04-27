import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CrearUsuarioValidator {
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
    email: schema.string({}, [
      rules.required(),
      rules.email(),
      rules.unique({ table: 'usuarios', column: 'email' }),
    ]),
    password: schema.string({}, [
      rules.required(),
      rules.minLength(8),
    ]),
    nombre: schema.string({}, [
      rules.required(),
      rules.maxLength(50),
    ]),
  })

  public messages = {
    'email.required': 'El email es obligatorio',
    'email.email': 'El email debe ser válido',
    'email.unique': 'El email ya está registrado',
    'password.required': 'La contraseña es obligatoria',
    'password.minLength': 'La contraseña debe tener al menos 8 caracteres',
    'nombre.required': 'El nombre es obligatorio',
    'nombre.maxLength': 'El nombre no puede exceder los 50 caracteres',
  }
}
