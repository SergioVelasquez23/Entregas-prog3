import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ComboMachinery from 'App/Models/ComboMachinery';
import ComboMachineryValidator from 'App/Validators/ComboMachineryValidator';

export default class CombosMachineryController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theComboMachinery: ComboMachinery = await ComboMachinery.findOrFail(params.id)
            return theComboMachinery;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await ComboMachinery.query().paginate(page, perPage)
            } else {
                return await ComboMachinery.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(ComboMachineryValidator);
        const theComboMachinery: ComboMachinery = await ComboMachinery.create(payload);
        return theComboMachinery;
    }

    public async update({ params, request }: HttpContextContract) {
        const theComboMachinery: ComboMachinery = await ComboMachinery.findOrFail(params.id);
        const payload = await request.validate(ComboMachineryValidator);
        theComboMachinery.maquina_id = payload.maquina_id;
        theComboMachinery.combo_id = payload.combo_id;
        return await theComboMachinery.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theComboMachinery: ComboMachinery = await ComboMachinery.findOrFail(params.id);
            response.status(204);
            return await theComboMachinery.delete();
    }
}