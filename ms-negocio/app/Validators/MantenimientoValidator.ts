import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MantenimientoValidator {
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
    fecha: schema.date({}, [
      rules.required(),
    ]),
    estado: schema.enum(['pendiente', 'completado', 'cancelado'] as const, [
      rules.required(),
    ]),
    maquina_id: schema.number([
      rules.required(),
      rules.exists({ table: 'maquinas', column: 'id' }),
    ]),
  })

  public messages = {
    'fecha.required': 'La fecha es obligatoria',
    'estado.required': 'El estado es obligatorio',
    'estado.enum': 'El estado debe ser pendiente, completado o cancelado',
    'maquina_id.required': 'El ID de la máquina es obligatorio',
    'maquina_id.exists': 'La máquina especificada no existe',
  }
}
