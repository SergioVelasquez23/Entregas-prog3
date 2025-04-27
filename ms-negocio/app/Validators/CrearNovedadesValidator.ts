import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CrearNovedadesValidator {
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
    tipo: schema.enum(['incidente', 'mantenimiento', 'operacional'] as const, [
      rules.required(),
    ]),
    descripcion: schema.string({}, [
      rules.required(),
      rules.minLength(10),
      rules.maxLength(500),
    ]),
    evidencia: schema.date({}, [
      rules.required(),
    ]),
    gravedad: schema.enum(['baja', 'media', 'alta'] as const, [
      rules.required(),
    ]),
    turno_id: schema.number([
      rules.required(),
      rules.exists({ table: 'turnos', column: 'id' }),
    ]),
  })

  public messages = {
    'tipo.required': 'El tipo de novedad es obligatorio',
    'tipo.enum': 'El tipo debe ser incidente, mantenimiento u operacional',
    'descripcion.required': 'La descripción es obligatoria',
    'descripcion.minLength': 'La descripción debe tener al menos 10 caracteres',
    'descripcion.maxLength': 'La descripción no puede exceder los 500 caracteres',
    'evidencia.required': 'La fecha de la evidencia es obligatoria',
    'gravedad.required': 'La gravedad es obligatoria',
    'gravedad.enum': 'La gravedad debe ser baja, media o alta',
    'turno_id.required': 'El ID del turno es obligatorio',
    'turno_id.exists': 'El turno especificado no existe',
  }
}
