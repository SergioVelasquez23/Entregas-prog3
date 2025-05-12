import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DepartmentRuler from 'App/Models/DepartmentRuler';
import DepartmentRulerValidator from 'App/Validators/DepartmentRulerValidator';

export default class DepartamentsRulerController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDepartmentRuler: DepartmentRuler = await DepartmentRuler.findOrFail(params.id)
            return theDepartmentRuler;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await DepartmentRuler.query().paginate(page, perPage)
            } else {
                return await DepartmentRuler.query()
            }

        }

    }

    public async create(ctx: HttpContextContract) {
        const validator = new DepartmentRulerValidator(ctx);
        const payload = await ctx.request.validate(DepartmentRulerValidator);
        if (await validator.validate(payload)) {
            const theDepartmentRuler: DepartmentRuler = await DepartmentRuler.create(payload);
            return theDepartmentRuler;
        }
    }

    public async update(ctx: HttpContextContract) {
        const theDepartmentRuler: DepartmentRuler = await DepartmentRuler.findOrFail(ctx.params.id);
        const validator = new DepartmentRulerValidator(ctx);
        const payload = await ctx.request.validate(DepartmentRulerValidator);
        if (await validator.validate(payload)) {
            theDepartmentRuler.ruler_id = payload.ruler_id;
            theDepartmentRuler.department_id = payload.department_id;
            theDepartmentRuler.start_date = payload.start_date;
            theDepartmentRuler.end_date = payload.end_date;
            return await theDepartmentRuler.save();
        }
    }

    public async delete({ params, response }: HttpContextContract) {
        const theDepartmentRuler: DepartmentRuler = await DepartmentRuler.findOrFail(params.id);
            response.status(204);
            return await theDepartmentRuler.delete();
    }
}