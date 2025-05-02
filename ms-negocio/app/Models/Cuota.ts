import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Factura from './Factura'
import Servicio from './Servicio'

export default class Cuota extends BaseModel {

  public static table = "cuotas"
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_servicio: number
<<<<<<< HEAD

  @column()
  public monto: number;

  @column()
  public email: string;

  @column()
  public nombreCliente: string; // Nombre del cliente

  @column()
  public referenciaPago: string; // Referencia única para el pago

  @column.date()
  public fechaVencimiento: DateTime;

  @column()
  public pagada: boolean; // Indica si la cuota ha sido pagada
=======
>>>>>>> 5479768d0ad9fb762dfe7d5dc4285a664de7e301

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Factura, {
    foreignKey: 'id_cuota',
  })
  public factura: HasOne<typeof Factura>

  @belongsTo(() => Servicio, {
    foreignKey: 'id_servicio',
  })
  public servicio: BelongsTo<typeof Servicio>
}
