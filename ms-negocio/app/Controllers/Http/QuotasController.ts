import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Quota from 'App/Models/Quota';
import QuotaValidator from 'App/Validators/QuotaValidator';
import PaymentService from 'App/Services/PaymentService';

export default class QuotasController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theQuota: Quota = await Quota.findOrFail(params.id)
            return theQuota;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Quota.query().paginate(page, perPage)
            } else {
                return await Quota.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(QuotaValidator);
        const theQuota: Quota = await Quota.create(payload);
        return theQuota;
    }

    public async update({ params, request }: HttpContextContract) {
        const theQuota: Quota = await Quota.findOrFail(params.id);
        const payload = await request.validate(QuotaValidator);
        theQuota.service_id = payload.service_id;
        return await theQuota.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theQuota: Quota = await Quota.findOrFail(params.id);
            response.status(204);
            return await theQuota.delete();
    }

    public async pay({ params, response, request }: HttpContextContract) {
        try {
            const theQuota: Quota = await Quota.findOrFail(params.id);

            // Validar que todos los campos requeridos estén presentes
            const requiredFields = [
                'card_number',
                'card_exp_year',
                'card_exp_month',
                'card_cvc',
                'customer_name',
                'customer_last_name',
                'customer_email',
                'customer_phone',
                'customer_doc_number'
            ];

            for (const field of requiredFields) {
                if (!request.input(field)) {
                    return response.status(400).json({
                        error: `El campo ${field} es requerido`
                    });
                }
            }

            // Construir los datos de pago
            const paymentData = {
                card: {
                    number: request.input('card_number'),
                    exp_year: request.input('card_exp_year'),
                    exp_month: request.input('card_exp_month'),
                    cvc: request.input('card_cvc')
                },
                customer: {
                    name: request.input('customer_name'),
                    last_name: request.input('customer_last_name'),
                    email: request.input('customer_email'),
                    phone: request.input('customer_phone'),
                    doc_number: request.input('customer_doc_number')
                },
                description: request.input('description', `Pago de cuota #${theQuota.id}`),
                tax: request.input('tax', '0'),
                tax_base: request.input('tax_base', theQuota.quantity.toString()),
                dues: request.input('dues', '1')
            };

            const result = await PaymentService.processPayment(theQuota, paymentData);

            if (result.success) {
                return response.status(200).json(result.data);
            }

            return response.status(400).json({
                error: result.error?.message ?? 'Unknown error',
                details: result.error?.details ?? 'No additional details available'
            });

        } catch (error) {
            console.error('Error en CuotasController:', error);
            return response.status(500).json({
                error: "Error interno del servidor",
                details: error.message
            });
        }
    }
}