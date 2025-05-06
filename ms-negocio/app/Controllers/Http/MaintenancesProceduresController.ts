import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MaintenanceProcedure from 'App/Models/MaintenanceProcedure';
import MaintenanceProcedureValidator from 'App/Validators/MaintenanceProcedureValidator';


export default class MaintenancesProceduresController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMaintenanceProcedure: MaintenanceProcedure = await MaintenanceProcedure.findOrFail(params.id)
            return theMaintenanceProcedure;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await MaintenanceProcedure.query().paginate(page, perPage)
            } else {
                return await MaintenanceProcedure.query()
            }

        }

    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(MaintenanceProcedureValidator);
        const theMaintenanceProcedure: MaintenanceProcedure = await MaintenanceProcedure.create({
            procedure_id: payload.procedure_id,
            maintenance_id: payload.maintenance_id,
            status: payload.status
        });
        return theMaintenanceProcedure;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMaintenanceProcedure: MaintenanceProcedure = await MaintenanceProcedure.findOrFail(params.id);
        const payload = await request.validate(MaintenanceProcedureValidator);
        theMaintenanceProcedure.procedure_id = payload.procedure_id;
        theMaintenanceProcedure.maintenance_id = payload.maintenance_id;
        theMaintenanceProcedure.status = payload.status;
        return await theMaintenanceProcedure.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMaintenanceProcedure: MaintenanceProcedure = await MaintenanceProcedure.findOrFail(params.id);
            response.status(204);
            return await theMaintenanceProcedure.delete();
    }
}