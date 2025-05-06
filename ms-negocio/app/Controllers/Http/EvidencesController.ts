import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Evidence from 'App/Models/Evidence';
import EvidenceValidator from 'App/Validators/EvidenceValidator';

export default class EvidencesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theEvidence: Evidence = await Evidence.findOrFail(params.id)
            return theEvidence;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Evidence.query().paginate(page, perPage)
            } else {
                return await Evidence.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(EvidenceValidator);
        const theEvidence: Evidence = await Evidence.create(payload);
        return theEvidence;
    }

    public async update({ params, request }: HttpContextContract) {
        const theEvidence: Evidence = await Evidence.findOrFail(params.id);
        const payload = await request.validate(EvidenceValidator);
        theEvidence.file_type = payload.file_type;
        theEvidence.file_content = payload.file_content;
        theEvidence.load_date = payload.load_date;
        theEvidence.service_id = payload.service_id;
        theEvidence.novelty_id = payload.novelty_id;
        return await theEvidence.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theEvidence: Evidence = await Evidence.findOrFail(params.id);
            response.status(204);
            return await theEvidence.delete();
    }
}