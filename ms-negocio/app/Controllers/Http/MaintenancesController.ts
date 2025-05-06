import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Maintenance from 'App/Models/Maintenance';
import MaintenanceValidator from 'App/Validators/MaintenanceValidator';

export default class MaintenancesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMaintenance: Maintenance = await Maintenance.findOrFail(params.id)
            return theMaintenance;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Maintenance.query().paginate(page, perPage)
            } else {
                return await Maintenance.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(MaintenanceValidator);
        const theMaintenance: Maintenance = await Maintenance.create(payload);
        return theMaintenance;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMaintenance: Maintenance = await Maintenance.findOrFail(params.id);
        const payload = await request.validate(MaintenanceValidator);
        theMaintenance.date = payload.date;
        theMaintenance.status = payload.status;
        theMaintenance.responsable = payload.responsable;
        theMaintenance.machinery_id = payload.machinery_id;
        return await theMaintenance.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMaintenance: Maintenance = await Maintenance.findOrFail(params.id);
            response.status(204);
            return await theMaintenance.delete();
    }
}