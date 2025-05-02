import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GobernanteValidator {
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
  public schema = schema.create({
    // id: No se valida en creación porque es autogenerado por la base de datos
    periodo_init: schema.date({}, [
      rules.required(),
      rules.beforeField('periodoEnd'), // Debe ser anterior a periodoEnd
    ]),
    periodo_end: schema.date({}, [
      rules.required(),
      rules.afterField('periodoInit'), // Debe ser posterior a periodoInit
    ]),
    id_municipio: schema.number([
      rules.required(),
      rules.exists({ table: 'municipios', column: 'id' }),
    ]),
    id_departamento: schema.number([
      rules.required(),
      rules.exists({ table: 'departamentos', column: 'id' }),
    ]),
  })

  public messages = {
    'periodoInit.required': 'El periodo inicial es obligatorio',
    'periodoInit.beforeField': 'El periodo inicial debe ser anterior al periodo final',
    'periodoEnd.required': 'El periodo final es obligatorio',
    'periodoEnd.afterField': 'El periodo final debe ser posterior al periodo inicial',
    'idMunicipio.required': 'El ID del municipio es obligatorio',
    'idMunicipio.exists': 'El municipio especificado no existe',
    'idDepartamento.required': 'El ID del departamento es obligatorio',
    'idDepartamento.exists': 'El departamento especificado no existe',
  }
}
