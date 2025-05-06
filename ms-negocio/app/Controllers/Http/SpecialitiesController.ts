import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Speciality from 'App/Models/Speciality';
import SpecialityValidator from 'App/Validators/SpecialityValidator';

export default class SpecialitiesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theSpeciality: Speciality = await Speciality.findOrFail(params.id)
            return theSpeciality;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Speciality.query().paginate(page, perPage)
            } else {
                return await Speciality.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(SpecialityValidator);
        const theSpeciality: Speciality = await Speciality.create(payload);
        return theSpeciality;
    }

    public async update({ params, request }: HttpContextContract) {
        const theSpeciality: Speciality = await Speciality.findOrFail(params.id);
        const payload = await request.validate(SpecialityValidator);
        theSpeciality.name = payload.name;
        return await theSpeciality.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theSpeciality: Speciality = await Speciality.findOrFail(params.id);
            response.status(204);
            return await theSpeciality.delete();
    }
}

