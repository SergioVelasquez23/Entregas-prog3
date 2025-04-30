import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TurnoValidator {
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
    fecha: schema.date({}, [
      rules.required(),
    ]),
    hora: schema.date({}, [
      rules.required(),
      rules.regex(/^[0-2][0-3]:[0-5][0-9]$/), // Formato HH:MM dentro de DateTime
    ]),
    operario_id: schema.number([
      rules.required(),
      rules.exists({ table: 'operarios', column: 'id' }),
    ]),
    maquina_id: schema.number([
      rules.required(),
      rules.exists({ table: 'maquinas', column: 'id' }),
    ]),
  })

  public messages = {
  'fecha.required': 'La fecha es obligatoria',
  'hora.required': 'La hora es obligatoria',
    'hora.regex': 'La hora debe tener el formato HH:MM (por ejemplo, 14:30)',
    'operario_id.required': 'El ID del operario es obligatorio',
    'operario_id.exists': 'El operario especificado no existe',
    'maquina_id.required': 'El ID de la máquina es obligatorio',
    'maquina_id.exists': 'La máquina especificada no existe',
  }
}
