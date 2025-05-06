import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service';
import ServiceValidator from 'App/Validators/ServiceValidator';


export default class ServicesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theService: Service = await Service.findOrFail(params.id)
            return theService;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Service.query().paginate(page, perPage)
            } else {
                return await Service.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(ServiceValidator);
        const theService: Service = await Service.create(payload);
        return theService;
    }

    public async update({ params, request }: HttpContextContract) {
        const theService: Service = await Service.findOrFail(params.id);
        const payload = await request.validate(ServiceValidator);
        theService.cost = payload.cost;
        theService.start_date = payload.start_date;
        theService.end_date = payload.end_date;
        theService.priority = payload.priority;
        theService.type = payload.type;
        theService.status = payload.status;
        theService.location = payload.location;
        theService.summary = payload.summary;
        return await theService.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theService: Service = await Service.findOrFail(params.id);
        response.status(204);
        return await theService.delete();
    }
}