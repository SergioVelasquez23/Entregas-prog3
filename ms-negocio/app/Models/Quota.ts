import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Bill from './Bill';
import Service from './Service';



export default class Quota extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public service_id: number

  @column()
  public quantity: number;

  @column()
  public email: string;

  @column()
  public client_name: string; // Nombre del cliente

  @column()
  public payment_reference: string; // Referencia única para el pago

  @column.date()
  public expiration_date: DateTime;

  @column()
  public paid: boolean; // Indica si la cuota ha sido pagada

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Bill, {
    foreignKey: 'quota_id',
  })
  public bill: HasOne<typeof Bill>  

  @belongsTo(() => Service, {
    foreignKey: 'service_id',
  })
  public service: BelongsTo<typeof Service>
}
