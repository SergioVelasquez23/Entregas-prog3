import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Novelty from 'App/Models/Novelty';
import NoveltyValidator from 'App/Validators/NoveltyValidator';


export default class NoveltiesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theNovelty: Novelty = await Novelty.findOrFail(params.id)
            return theNovelty;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Novelty.query().paginate(page, perPage)
            } else {
                return await Novelty.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(NoveltyValidator);
        const theNovelty: Novelty = await Novelty.create({
            type: payload.type,
            description: payload.description,
            evidence: payload.evidence,
            gravity: payload.gravity,
            shift_id: payload.shift_id
        });
        return theNovelty;
    }

    public async update({ params, request }: HttpContextContract) {
        const theNovelty: Novelty = await Novelty.findOrFail(params.id);
        const payload = await request.validate(NoveltyValidator);
        theNovelty.type = payload.type;
        theNovelty.description = payload.description;
        theNovelty.evidence = payload.evidence;
        theNovelty.gravity = payload.gravity;
        theNovelty.shift_id = payload.shift_id;
        return await theNovelty.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theNovelty: Novelty = await Novelty.findOrFail(params.id);
            response.status(204);
            return await theNovelty.delete();
    }
}