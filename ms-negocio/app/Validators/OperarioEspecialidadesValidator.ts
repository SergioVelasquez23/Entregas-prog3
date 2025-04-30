import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class OperaioEspecialidadesValidator {
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
    operario_id: schema.number([
      rules.required(),
      rules.exists({ table: 'operarios', column: 'id' }),
    ]),
    especialidad_id: schema.number([
      rules.required(),
      rules.exists({ table: 'especialidades', column: 'id' }),
    ]),
  })

  public messages = {
    'operario_id.required': 'El ID del operario es obligatorio',
    'operario_id.exists': 'El operario especificado no existe',
    'especialidad_id.required': 'El ID de la especialidad es obligatorio',
    'especialidad_id.exists': 'La especialidad especificada no existe',
  }
}
