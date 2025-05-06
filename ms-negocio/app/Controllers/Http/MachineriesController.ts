import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Machinery from 'App/Models/Machinery';
import MachineryValidator from 'App/Validators/MachineryValidator';

export default class MachineriesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const theMachinery = await Machinery.query()
            .where('id', params.id)
            .firstOrFail()

            return theMachinery;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Machinery.query().paginate(page, perPage)
            } else {
                return await Machinery.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(MachineryValidator);
        const theMachinery: Machinery = await Machinery.create(payload);
        return theMachinery;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMachinery: Machinery = await Machinery.findOrFail(params.id);
        const payload = await request.validate(MachineryValidator);
        theMachinery.speciality = payload.speciality;
        theMachinery.brand = payload.brand;
        theMachinery.model = payload.model ;
        theMachinery.status = payload.status;
        theMachinery.location = payload.location;
        theMachinery.disponibility = payload.disponibility ?? theMachinery.disponibility;
        theMachinery.assignment_date = payload.assignment_date ?? theMachinery.assignment_date;
        theMachinery.retirement_date = payload.retirement_date ?? theMachinery.retirement_date;
        return await theMachinery.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMachinery: Machinery = await Machinery.findOrFail(params.id);
            response.status(204);
            return await theMachinery.delete();
    }
}