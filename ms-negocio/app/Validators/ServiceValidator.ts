import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ServicioValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    cost: schema.number([
      rules.required(),
      rules.unsigned(),
      rules.range(1, Number.MAX_SAFE_INTEGER)
    ]),
    start_date: schema.date({}, [
      rules.required()
    ]),
    end_date: schema.date({}, [
      rules.required(),
      rules.afterField('start_date')
    ]),
    priority: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255)
    ]),
    type: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255)
    ]),
    status: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255)
    ]),
    location: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255)
    ]),
    summary: schema.string({ trim: true }, [
      rules.required(),
      rules.maxLength(255)
    ])
  })

  public messages: CustomMessages = {
    'costo.required': 'El costo es obligatorio',
    'costo.unsigned': 'El costo debe ser un valor positivo',
    'costo.range': 'El costo debe ser mayor a 0',
    'f_inicio.required': 'La fecha de inicio es obligatoria',
    'f_inicio.date': 'La fecha de inicio debe ser una fecha válida',
    'f_fin.required': 'La fecha de fin es obligatoria',
    'f_fin.date': 'La fecha de fin debe ser una fecha válida',
    'f_fin.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio',
    'prioridad.required': 'La prioridad es obligatoria',
    'prioridad.maxLength': 'La prioridad no puede exceder los 255 caracteres',
    'tipo.required': 'El tipo es obligatorio',
    'tipo.maxLength': 'El tipo no puede exceder los 255 caracteres',
    'estado.required': 'El estado es obligatorio',
    'estado.maxLength': 'El estado no puede exceder los 255 caracteres',
    'ubicacion.required': 'La ubicación es obligatoria',
    'ubicacion.maxLength': 'La ubicación no puede exceder los 255 caracteres',
    'resumen.required': 'El resumen es obligatorio',
    'resumen.maxLength': 'El resumen no puede exceder los 255 caracteres'
  }
}