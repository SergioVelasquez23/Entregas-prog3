import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MunicipalityConstruction from 'App/Models/MunicipalityConstruction';
import MunicipalityConstructionValidator from 'App/Validators/MunicipalityConstructionValidator';

export default class ObrasMunicipiosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMunicipalityConstruction: MunicipalityConstruction = await MunicipalityConstruction.findOrFail(params.id)
            return theMunicipalityConstruction;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await MunicipalityConstruction.query().paginate(page, perPage)
            } else {
                return await MunicipalityConstruction.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(MunicipalityConstructionValidator);
        const theMunicipalityConstruction: MunicipalityConstruction = await MunicipalityConstruction.create({
            construction_id: payload.construction_id,
            municipality_id: payload.municipality_id
        });
        return theMunicipalityConstruction;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMunicipalityConstruction: MunicipalityConstruction = await MunicipalityConstruction.findOrFail(params.id);
        const payload = await request.validate(MunicipalityConstructionValidator);
        theMunicipalityConstruction.construction_id = payload.construction_id;
        theMunicipalityConstruction.municipality_id = payload.municipality_id;
        return await theMunicipalityConstruction.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMunicipalityConstruction: MunicipalityConstruction = await MunicipalityConstruction.findOrFail(params.id);
            response.status(204);
            return await theMunicipalityConstruction.delete();
    }
}