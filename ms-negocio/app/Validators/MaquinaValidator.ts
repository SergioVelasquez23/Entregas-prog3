import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MaquinaValidator {
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
    especialidad: schema.string({}, [
      rules.required(),
      rules.maxLength(50),
    ]),
    marca: schema.string({}, [
      rules.required(),
      rules.maxLength(50),
    ]),
    modelo: schema.string({}, [
      rules.required(),
      rules.maxLength(50),
    ]),
    estado: schema.enum(['nueva', 'usada', 'reparacion'] as const, [
      rules.required(),
    ]),
    ubicacion: schema.string({}, [
      rules.required(),
      rules.maxLength(100),
    ]),
    disponibilidad: schema.boolean([
      rules.required(),
    ]),
  })

  public messages = {
    'especialidad.required': 'La especialidad es obligatoria',
    'especialidad.maxLength': 'La especialidad no puede exceder los 50 caracteres',
    'marca.required': 'La marca es obligatoria',
    'marca.maxLength': 'La marca no puede exceder los 50 caracteres',
    'modelo.required': 'El modelo es obligatorio',
    'modelo.maxLength': 'El modelo no puede exceder los 50 caracteres',
    'estado.required': 'El estado es obligatorio',
    'estado.enum': 'El estado debe ser nueva, usada o reparacion',
    'ubicacion.required': 'La ubicación es obligatoria',
    'ubicacion.maxLength': 'La ubicación no puede exceder los 100 caracteres',
    'disponibilidad.required': 'La disponibilidad es obligatoria',
  }
}
