import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Construction from 'App/Models/Construction';
import ConstructionValidator from 'App/Validators/ConstructionValidator';

export default class ConstructionsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theConstruction: Construction = await Construction.query()
                .where('id', params.id)
                .preload('municipalities')
                .firstOrFail()
            return theConstruction;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Construction.query()
                    .preload('municipalities')
                    .paginate(page, perPage)
            } else {
                return await Construction.query().preload('municipalities')
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const payload = await request.validate(ConstructionValidator);
        const theConstruction: Construction = await Construction.create({
            nombre: payload.nombre,
            combo_id: payload.comboId
        });

        if (request.input('municipalities')) {
            await theConstruction.related('municipalities').sync(request.input('municipalities'))
        }

        await theConstruction.load('municipalities')
        return theConstruction;
    }

    public async update({ params, request }: HttpContextContract) {
        const theConstruction: Construction = await Construction.findOrFail(params.id);
        const payload = await request.validate(ConstructionValidator);
        theConstruction.nombre = payload.nombre;
        theConstruction.combo_id = payload.comboId;
        await theConstruction.save();

        if (request.input('municipios')) {
            await theConstruction.related('municipios').sync(request.input('municipios'))
        }

        await theConstruction.refresh()
        await theConstruction.load('municipios')
        return theConstruction;
    }

    public async delete({ params, response }: HttpContextContract) {
        const theConstruction: Construction = await Construction.findOrFail(params.id);
        // Las relaciones con municipios se eliminarán automáticamente por la configuración onDelete: CASCADE
        response.status(204);
        return await theConstruction.delete();
    }
}