import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CrearObrasMunicipioValidator {
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
    obra_id: schema.number([
      rules.required(),
      rules.exists({ table: 'obras', column: 'id' }),
    ]),
    municipio_id: schema.number([
      rules.required(),
      rules.exists({ table: 'municipios', column: 'id' }),
    ]),
  })

  public messages = {
    'obra_id.required': 'El ID de la obra es obligatorio',
    'obra_id.exists': 'La obra especificada no existe',
    'municipio_id.required': 'El ID del municipio es obligatorio',
    'municipio_id.exists': 'El municipio especificado no existe',
  }
}
