import { schema,  rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class GpsValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    // id: No se valida en creación porque es autogenerado
    latitude: schema.string({}, [
      rules.required(),
      rules.regex(/^-?([0-8]?[0-9](\.\d+)?|90(\.0+)?)$/), // Latitud entre -90 y 90
    ]),
    length: schema.string({}, [
      rules.required(),
      rules.regex(/^-?((1?[0-7]?[0-9](\.\d+)?)|180(\.0+)?)$/), // Longitud entre -180 y 180
    ]),
    machinery_id: schema.number([
      rules.required(),
      rules.exists({ table: 'machineries', column: 'id' }),
    ]),
  })

  public messages = {
    'latitud.required': 'La latitud es obligatoria',
    'latitud.regex': 'La latitud debe estar entre -90 y 90 grados',
    'longitud.required': 'La longitud es obligatoria',
    'longitud.regex': 'La longitud debe estar entre -180 y 180 grados',
    'maquina_id.required': 'El ID de la máquina es obligatorio',
    'maquina_id.exists': 'La máquina especificada no existe',
  }
}
