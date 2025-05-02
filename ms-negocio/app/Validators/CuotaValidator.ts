import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class CuotaValidator {
  public static schema = schema.create({
    id_servicio: schema.number([
      rules.required(),
      rules.exists({ table: 'servicios', column: 'id' }) // Verifica que exista en la tabla 'servicios'
    ]),
    email: schema.string({}, [
      rules.required(),
      rules.email()
    ]),
    monto: schema.number([
      rules.required(),
      rules.unsigned() // Asegura que sea un número positivo
    ]),
    fecha_vencimiento: schema.date({}, [
      rules.required(),
      rules.after('today') // Asegura que sea una fecha futura
    ])
  });

  public static messages = {
    'id_servicio.required': 'El campo id_servicio es obligatorio.',
    'id_servicio.exists': 'El id_servicio no existe en la base de datos.',
    'email.required': 'El campo email es obligatorio.',
    'email.email': 'El email debe tener un formato válido.',
    'monto.required': 'El campo monto es obligatorio.',
    'monto.unsigned': 'El monto debe ser un número positivo.',
    'fecha_vencimiento.required': 'El campo fecha_vencimiento es obligatorio.',
    'fecha_vencimiento.after': 'La fecha de vencimiento debe ser posterior a hoy.',
  };
}
