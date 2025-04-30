import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EvidenciaValidator {
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
    id: schema.number([
      rules.required(),
      rules.exists({ table: 'evidencias', column: 'id' }),
    ]),
    tipo_de_archivo: schema.string({}, [rules.required()]),
    contenido_archivo: schema.string({}, [rules.maxLength(255)]),
    fecha_de_carga: schema.date({}, [rules.required(),]),
    id_servicio: schema.number([
      rules.required(),
      rules.exists({ table: 'servicios', column: 'id' }),
    ]),
  })

  public messages = {
    'tipo_de_archivo.required': 'el Tipo de Archivo es requerido',
    'contenido_archivo.maxLength': 'El contenido del archivo no puede exceder los 255 caracteres',
    'fecha_de_carga.required': 'El tipo de evidencia es obligatorio',
  }
}
