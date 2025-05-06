import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TypeService from 'App/Models/TypeService';
import TypeServiceValidator from 'App/Validators/TypeServiceValidator';

export default class TypeServicesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theTypeService: TypeService = await TypeService.findOrFail(params.id)
            return theTypeService;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await TypeService.query().paginate(page, perPage)
            } else {
                return await TypeService.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(TypeServiceValidator);
        const theTypeService: TypeService = await TypeService.create({
            name: payload.name,
            description: payload.description || ''
        });
        return theTypeService;
    }

    public async update({ params, request }: HttpContextContract) {
        const theTypeService: TypeService = await TypeService.findOrFail(params.id);
        const payload = await request.validate(TypeServiceValidator);
        theTypeService.name = payload.name;
        if (payload.description !== undefined) {
            theTypeService.description = payload.description;
        }
        return await theTypeService.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theTypeService: TypeService = await TypeService.findOrFail(params.id);
            response.status(204);
            return await theTypeService.delete();
    }
}