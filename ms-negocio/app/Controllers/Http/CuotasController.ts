import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cuota from 'App/Models/Cuota';
import CuotaValidator from 'App/Validators/CuotaValidator';
import Factura from 'App/Models/Factura';
import NotificationService from 'App/Services/NotificationService';

export default class CuotasController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCuota: Cuota = await Cuota.findOrFail(params.id)
            return theCuota;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Cuota.query().paginate(page, perPage)
            } else {
                return await Cuota.query()
            }

        }

    }

    public async create({ request, response }: HttpContextContract) {
        try {
            const data = request.only(['id_servicio', 'email', 'monto', 'fecha_vencimiento', 'nombre_cliente']);
            const referenciaPago = `REF-${Date.now()}`; // Generar referencia única

            const cuota = await Cuota.create({
                ...data,
                referenciaPago,
            });

            return response.status(201).json({
                message: 'Cuota creada exitosamente',
                cuota,
            });
        } catch (error) {
            console.error('Error al crear la cuota:', error);
            return response.status(500).json({
                message: 'Error al crear la cuota',
                error: error.message || 'Detalles del error no disponibles',
            });
        }
    }

    public async update({ params, request }: HttpContextContract) {
        const theCuota: Cuota = await Cuota.findOrFail(params.id);
        const payload = await request.validate({
            schema: CuotaValidator.schema,
            messages: CuotaValidator.messages
        });
        theCuota.id_servicio = payload.id_servicio;
        return await theCuota.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCuota: Cuota = await Cuota.findOrFail(params.id);
        response.status(204);
        return await theCuota.delete();
    }

    public async processPayment({ params, request, response }: HttpContextContract) {
        const cuota = await Cuota.findOrFail(params.id);

        if (cuota.pagada) {
            return response.status(400).json({ message: 'La cuota ya ha sido pagada.' });
        }

        // Simular procesamiento de pago (puedes integrar tu lógica de pago aquí)
        const paymentResult = { success: true }; // Simulación

        if (paymentResult.success) {
            cuota.pagada = true;
            await cuota.save();

            // Crear factura asociada a la cuota
            const factura = await Factura.create({
                detalle: `Factura generada para la cuota ${cuota.id}`,
                id_cuota: cuota.id,
            });

            // Enviar notificación al cliente
            const notificationPayload = {
                recipients: [{ email: cuota.email }],
                subject: 'Pago realizado con éxito',
                content: `Su pago ha sido procesado exitosamente. Detalles de la factura: ${factura.detalle}`,
            };

            try {
                const emailSent = await NotificationService.sendEmail(notificationPayload);

                if (!emailSent) {
                    return response.status(500).json({ message: 'Error al enviar la notificación por correo electrónico.' });
                }

                return response.status(201).json({
                    message: 'Pago procesado y factura generada.',
                    factura,
                });
            } catch (error) {
                console.error('Error al enviar la notificación:', error.message);
                return response.status(500).json({ message: 'Error al enviar la notificación por correo electrónico.' });
            }
        } else {
            return response.status(500).json({ message: 'Error al procesar el pago.' });
        }
    }

    public async testSendEmail({ request, response }: HttpContextContract) {
        const recipient = request.input('recipient', 'test@example.com');
        const message = request.input('message', 'Este es un mensaje de prueba');

        const notificationPayload = {
            recipients: [{ email: recipient }],
            subject: 'Prueba de envío de correo',
            content: message,
        };

        try {
            const emailSent = await NotificationService.sendEmail(notificationPayload);

            if (emailSent) {
                return response.status(200).json({ message: 'Correo enviado exitosamente.' });
            } else {
                return response.status(500).json({ message: 'Error al enviar el correo.' });
            }
        } catch (error) {
            console.error('Error en testSendEmail:', error.message);
            return response.status(500).json({ message: 'Error interno al enviar el correo.' });
        }
    }

    public async payCuota({ request, response }: HttpContextContract) {
        return response.status(200).json({ message: 'Pago procesado exitosamente.' });
    }

    public async getCuotaForPayment({ params, response }: HttpContextContract) {
        const cuota = await Cuota.findOrFail(params.id);

        if (cuota.pagada) {
            return response.status(400).json({ message: 'La cuota ya ha sido pagada.' });
        }

        return response.status(200).json({
            id: cuota.id,
            monto: cuota.monto,
            email: cuota.email,
            descripcion: `Pago de cuota con ID: ${cuota.id}`,
        });
    }
}