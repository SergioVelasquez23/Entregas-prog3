import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SpareValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
    Spare: schema.string({}, [
      rules.required(),
      rules.maxLength(100),
      rules.unique({ table: 'spares', column: 'nombre' }),
    ]),
    brand: schema.string({}, [
      rules.required(),
      rules.maxLength(100),
      rules.unique({ table: 'spares', column: 'marca' }),
    ]),
    description: schema.string({}, [
      rules.required(),
      rules.minLength(10),
      rules.maxLength(500),
    ]),
  })

  public messages: CustomMessages = {
    'nombre.required': 'El nombre del procedimiento es obligatorio',
    'nombre.maxLength': 'El nombre no puede exceder los 100 caracteres',
    'nombre.unique': 'El nombre del procedimiento ya existe',
    'marca.required': 'La marca es obligatoria.',
    'marca.maxLength': 'La marca no puede exceder los 100 caracteres.',
    'marca.unique': 'La marca ya está registrada en los procedimientos.',
    'descripcion.required': 'La descripción es obligatoria',
    'descripcion.minLength': 'La descripción debe tener al menos 10 caracteres',
    'descripcion.maxLength': 'La descripción no puede exceder los 500 caracteres',
  }
}
