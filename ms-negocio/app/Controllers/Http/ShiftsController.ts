import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Shift from 'App/Models/Shift'
import ShiftValidator from 'App/Validators/ShiftValidator'

export default class ShiftsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theShift: Shift = await Shift.findOrFail(params.id)
            return theShift;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Shift.query().paginate(page, perPage)
            } else {
                return await Shift.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(ShiftValidator)
        const theShift: Shift = await Shift.create({
            date: payload.date,
            operator_id: payload.operator_id,
            machinery_id: payload.machinery_id
        })
        return theShift
    }

    public async update({ params, request }: HttpContextContract) {
        const theShift: Shift = await Shift.findOrFail(params.id)
        const payload = await request.validate(ShiftValidator)
        theShift.date = payload.date
        theShift.operator_id = payload.operator_id
        theShift.machinery_id = payload.machinery_id
        return await theShift.save()
    }

    public async delete({ params, response }: HttpContextContract) {
        const theShift: Shift = await Shift.findOrFail(params.id)
        response.status(204)
        return await theShift.delete()
    }
}