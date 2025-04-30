import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Repuesto from "App/Models/Repuesto";

export default class RepuestosController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRepuesto: Repuesto = await Repuesto.findOrFail(params.id)
            return theRepuesto;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Repuesto.query().paginate(page, perPage)
            } else {
                return await Repuesto.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theRepuesto: Repuesto = await Repuesto.create(body);
        return theRepuesto;
    }

    public async update({ params, request }: HttpContextContract) {
        const theRepuesto: Repuesto = await Repuesto.findOrFail(params.id);
        const body = request.body();
        theRepuesto.nombre = body.nombre;
        theRepuesto.marca = body.marca;
        theRepuesto.descripcion = body.descripcion;
        return await theRepuesto.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRepuesto: Repuesto = await Repuesto.findOrFail(params.id);
            response.status(204);
            return await theRepuesto.delete();
    }


    
}
