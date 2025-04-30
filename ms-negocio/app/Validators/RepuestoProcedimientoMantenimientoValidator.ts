import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RepuestoProcedimientoMantenimientoValidator {
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
    nombre: schema.string({}, [
      rules.required(),
      rules.maxLength(100),
      rules.unique({ table: 'procedimientomantenimiento', column: 'nombre' }),
    ]),
    descripcion: schema.string({}, [
      rules.required(),
      rules.minLength(10),
      rules.maxLength(500),
    ]),
    precio: schema.number([
      rules.required(),
      rules.unsigned(), // Asegura que sea positivo o cero
      rules.range(0.01, 1000000), // Rango entre 0.01 y 1,000,000
    ]),
    repuesto_id: schema.array.optional().members(
      schema.number([
        rules.required(),
        rules.exists({ table: 'repuestos', column: 'id' }), // Verifica que cada ID exista en la tabla repuestos
      ])
    ),
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre del procedimiento es obligatorio.',
    'nombre.maxLength': 'El nombre no puede exceder los 100 caracteres.',
    'nombre.unique': 'El nombre del procedimiento ya existe.',
    'descripcion.required': 'La descripción es obligatoria.',
    'precio.required': 'El precio es obligatorio.',
    'precio.number': 'El precio debe ser un número.',
    'precio.unsigned': 'El precio debe ser un valor positivo.',
    'precio.range': 'El precio debe estar entre 0.01 y 1,000,000.',
    'descripcion.minLength': 'La descripción debe tener al menos 10 caracteres.',
    'descripcion.maxLength': 'La descripción no puede exceder los 500 caracteres.',
    'repuesto_ids.array': 'Los IDs de repuestos deben ser un arreglo.',
    'repuesto_ids.*.number': 'Cada ID de repuesto debe ser un número.',
    'repuesto_ids.*.required': 'Cada ID de repuesto es obligatorio.',
    'repuesto_ids.*.exists': 'Uno o más IDs de repuesto no existen.',
  }
}
