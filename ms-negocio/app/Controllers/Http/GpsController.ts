import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Gps from 'App/Models/Gps';
import GpsValidator from 'App/Validators/GpsValidator';

export default class GpsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theGps: Gps = await Gps.findOrFail(params.id)
            return theGps;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Gps.query().paginate(page, perPage)
            } else {
                return await Gps.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(GpsValidator);
        const theGps: Gps = await Gps.create(payload);
        return theGps;
    }

    public async update({ params, request }: HttpContextContract) {
        const theGps: Gps = await Gps.findOrFail(params.id);
        const payload = await request.validate(GpsValidator);
        theGps.latitude = payload.latitude;
        theGps.length = payload.length;
        theGps.machinery_id = payload.machinery_id;
        return await theGps.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theGps: Gps = await Gps.findOrFail(params.id);
            response.status(204);
            return await theGps.delete();
    }
}