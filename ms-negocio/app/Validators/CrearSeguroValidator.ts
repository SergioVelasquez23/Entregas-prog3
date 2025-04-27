import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CrearSeguroValidator {
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
    nombre: schema.string({}, [
      rules.required(),
      rules.maxLength(100),
      rules.unique({ table: 'seguros', column: 'nombre' }),
    ]),
    descripcion: schema.string({}, [
      rules.required(),
      rules.minLength(10),
      rules.maxLength(500),
    ]),
  })

  public messages = {
    'nombre.required': 'El nombre del procedimiento es obligatorio',
    'nombre.maxLength': 'El nombre no puede exceder los 100 caracteres',
    'nombre.unique': 'El nombre del procedimiento ya existe',
    'descripcion.required': 'La descripción es obligatoria',
    'descripcion.minLength': 'La descripción debe tener al menos 10 caracteres',
    'descripcion.maxLength': 'La descripción no puede exceder los 500 caracteres',
  }
}
