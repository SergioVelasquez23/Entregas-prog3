import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicioValidator {
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
    costo: schema.number([
      rules.required(),
    ]),
    f_inicio: schema.date({}, [
      rules.required(),
      rules.beforeField('f_fin'),
    ]),
    f_fin: schema.date({}, [
      rules.required(),
      rules.afterField('f_inicio'),
    ]),
    estado: schema.string({}, [
      rules.required(),
      rules.maxLength(100),
    ]),
    prioridad: schema.enum(['baja', 'media', 'alta'] as const, [
      rules.required(),
    ]),
    tipo: schema.enum(['preventivo', 'correctivo', 'emergencia'] as const, [
      rules.required(),
    ]),
    ubicacion: schema.string({}, [
      rules.required(),
      rules.maxLength(100),
    ]),
    resumen: schema.string({}, [
      rules.required(),
      rules.minLength(10),
      rules.maxLength(500),
    ]),
  })

  public messages = {
    'costo.required': 'El costo es obligatorio',
    'costo.min': 'El costo no puede ser negativo',
    'f_inicio.required': 'La fecha de inicio es obligatoria',
    'f_inicio.beforeField': 'La fecha de inicio debe ser anterior a la fecha de fin',
    'f_fin.required': 'La fecha de fin es obligatoria',
    'f_fin.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio',
    'prioridad.required': 'La prioridad es obligatoria',
    'prioridad.enum': 'La prioridad debe ser baja, media o alta',
    'tipo.required': 'El tipo es obligatorio',
    'tipo.enum': 'El tipo debe ser preventivo, correctivo o emergencia',
    'ubicacion.required': 'La ubicación es obligatoria',
    'ubicacion.maxLength': 'La ubicación no puede exceder los 100 caracteres',
    'resumen.required': 'El resumen es obligatorio',
    'resumen.minLength': 'El resumen debe tener al menos 10 caracteres',
    'resumen.maxLength': 'El resumen no puede exceder los 500 caracteres',
  }
}
