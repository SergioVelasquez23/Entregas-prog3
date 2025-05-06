import { schema,  CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class NoveltyValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    // id: No se valida en creación porque es autogenerado
    type: schema.enum(['incident', 'maintenance', 'operational'] as const, [
      rules.required(),
    ]),
    description: schema.string({}, [
      rules.required(),
      rules.minLength(10),
      rules.maxLength(500),
    ]),
    evidence: schema.date({}, [
      rules.required(),
    ]),
    gravity: schema.enum(['low', 'medium', 'high'] as const, [
      rules.required(),
    ]),
    shift_id: schema.number([
      rules.required(),
      rules.exists({ table: 'shifts', column: 'id' }),
    ]),
  })

  public messages:CustomMessages ={
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
