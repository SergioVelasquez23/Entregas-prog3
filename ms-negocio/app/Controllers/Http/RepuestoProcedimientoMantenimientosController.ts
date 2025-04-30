import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import RepuestoProcedimientoMantenimiento from "App/Models/RepuestoProcedimientoMantenimiento";

export default class RepuestoProcedimientoMantenimientosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRepuestoProcedimientoMantenimiento: RepuestoProcedimientoMantenimiento = await RepuestoProcedimientoMantenimiento.findOrFail(params.id)
            return theRepuestoProcedimientoMantenimiento;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await RepuestoProcedimientoMantenimiento.query().paginate(page, perPage)
            } else {
                return await RepuestoProcedimientoMantenimiento.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theRepuestoProcedimientoMantenimiento: RepuestoProcedimientoMantenimiento = await RepuestoProcedimientoMantenimiento.create(body);
        return theRepuestoProcedimientoMantenimiento;
    }

    public async update({ params, request }: HttpContextContract) {
        const theRepuestoProcedimientoMantenimiento: RepuestoProcedimientoMantenimiento = await RepuestoProcedimientoMantenimiento.findOrFail(params.id);
        const body = request.body();
        theRepuestoProcedimientoMantenimiento.nombre = body.nombre;
        theRepuestoProcedimientoMantenimiento.precio = body.precio;
        theRepuestoProcedimientoMantenimiento.descripcion = body.descripcion;
        theRepuestoProcedimientoMantenimiento.repuesto_id = body.repuesto_id;

        return await theRepuestoProcedimientoMantenimiento.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRepuestoProcedimientoMantenimiento: RepuestoProcedimientoMantenimiento = await RepuestoProcedimientoMantenimiento.findOrFail(params.id);
            response.status(204);
            return await theRepuestoProcedimientoMantenimiento.delete();
    }





}
