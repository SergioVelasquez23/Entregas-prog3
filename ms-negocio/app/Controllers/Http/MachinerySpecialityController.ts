import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MachinerySpeciality from 'App/Models/MachinerySpeciality'
import MachinerySpecialityValidator from 'App/Validators/MachinerySpecialityValidator'

export default class MachinerySpecialityController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            const machinerySpeciality = await MachinerySpeciality.findOrFail(params.id)
            return machinerySpeciality
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1)
                const perPage = request.input("per_page", 20)
                return await MachinerySpeciality.query().paginate(page, perPage)
            } else {
                return await MachinerySpeciality.query()
            }
        }
    }
    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(MachinerySpecialityValidator)
        const machinerySpeciality = await MachinerySpeciality.create(payload)
        return machinerySpeciality
    }

    public async update({ params, request }: HttpContextContract) {
        const machinerySpeciality = await MachinerySpeciality.findOrFail(params.id)
        const payload = await request.validate(MachinerySpecialityValidator)
        machinerySpeciality.type_service_id = payload.type_service_id
        machinerySpeciality.machinery_id = payload.machinery_id
        machinerySpeciality.type_work = payload.type_work
        return await machinerySpeciality.save()
    }

    public async delete({ params, response }: HttpContextContract) {
        const machinerySpeciality = await MachinerySpeciality.findOrFail(params.id)
        response.status(204)
        return await machinerySpeciality.delete()
    }
}