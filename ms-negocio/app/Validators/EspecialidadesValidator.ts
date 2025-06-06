import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EspecialidadesValidator {
  constructor(protected ctx: HttpContextContract) { }

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
<<<<<<< HEAD
  public schema = schema.create({
=======
  public schema = schema.create({ 
>>>>>>> 5479768d0ad9fb762dfe7d5dc4285a664de7e301
    nombre: schema.string({}, [

    ]),
  })

  public messages = {
    'nombre.required': 'El nombre de la especialidad es obligatorio',
    'nombre.maxLength': 'El nombre no puede exceder los 50 caracteres',
    'nombre.unique': 'La especialidad ya existe',
  }
}
