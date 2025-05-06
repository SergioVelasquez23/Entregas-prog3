import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Insurance from 'App/Models/Insurance';
import InsuranceValidator from 'App/Validators/InsuranceValidator';

export default class InsurancesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theInsurance: Insurance = await Insurance.findOrFail(params.id)
            return theInsurance;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Insurance.query().paginate(page, perPage)
            } else {
                return await Insurance.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(InsuranceValidator);
        const theInsurance: Insurance = await Insurance.create(payload);
        return theInsurance;
    }

    public async update({ params, request }: HttpContextContract) {
        const theInsurance: Insurance = await Insurance.findOrFail(params.id);
        const payload = await request.validate(InsuranceValidator);
        theInsurance.name = payload.name;
        theInsurance.description = payload.description;
        return await theInsurance.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theInsurance: Insurance = await Insurance.findOrFail(params.id);
        response.status(204);
        return await theInsurance.delete();
    }
}