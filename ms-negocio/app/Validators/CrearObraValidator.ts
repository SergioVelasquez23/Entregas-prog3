import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CrearObraValidator {
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
    nombre: schema.string({}, [
      rules.required(),
      rules.maxLength(100),
      rules.unique({ table: 'obras', column: 'nombre' }),
    ]),
    combo_id: schema.number([
      rules.required(),
      rules.exists({ table: 'combos', column: 'id' }),
    ]),
  })

  public messages = {
    'nombre.required': 'El nombre de la obra es obligatorio',
    'nombre.maxLength': 'El nombre no puede exceder los 100 caracteres',
    'nombre.unique': 'El nombre de la obra ya existe',
    'combo_id.required': 'El ID del combo es obligatorio',
    'combo_id.exists': 'El combo especificado no existe',
  }
}
