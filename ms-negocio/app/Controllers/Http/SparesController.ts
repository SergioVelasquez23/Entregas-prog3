import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Spare from "App/Models/Spare";

export default class SparesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theSpare: Spare = await Spare.findOrFail(params.id)
            return theSpare;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Spare.query().paginate(page, perPage)
            } else {
                return await Spare.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theSpare: Spare = await Spare.create(body);
        return theSpare;
    }

    public async update({ params, request }: HttpContextContract) {
        const theSpare: Spare = await Spare.findOrFail(params.id);
        const body = request.body();
        theSpare.name = body.name;
        theSpare.brand = body.brand;
        theSpare.description = body.description;
        return await theSpare.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theSpare: Spare = await Spare.findOrFail(params.id);
            response.status(204);
            return await theSpare.delete();
    }


    
}
