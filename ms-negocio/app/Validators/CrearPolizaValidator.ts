import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CrearPolizaValidator {
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
    maquina_id: schema.number.nullable([
      rules.exists({ table: 'maquinas', column: 'id' }),
    ]),
    operario_id: schema.number.nullable([
      rules.exists({ table: 'operarios', column: 'id' }),
    ]),
    seguro_id: schema.number([
      rules.required(),
      rules.exists({ table: 'seguros', column: 'id' }),
    ]),
    fechaInicio: schema.date({}, [
      rules.required(),
      rules.beforeField('fechaFin'), // Debe ser anterior a fechaFin
    ]),
    fechaFin: schema.date({}, [
      rules.required(),
      rules.afterField('fechaInicio'), // Debe ser posterior a fechaInicio
    ]),
  })

  public messages = {
    'maquina_id.exists': 'La máquina especificada no existe',
    'operario_id.exists': 'El operario especificado no existe',
    'seguro_id.required': 'El ID del seguro es obligatorio',
    'seguro_id.exists': 'El seguro especificado no existe',
    'fechaInicio.required': 'La fecha de inicio es obligatoria',
    'fechaInicio.beforeField': 'La fecha de inicio debe ser anterior a la fecha de fin',
    'fechaFin.required': 'La fecha de fin es obligatoria',
    'fechaFin.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio',
  }
}
