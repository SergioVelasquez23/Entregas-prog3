import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Policy, { OperatorPolicyType, MachineryPolicyType } from 'App/Models/Policy'
import PolicyValidator from 'App/Validators/PolicyValidator'

export default class PoliciesController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      let thePolicy: Policy = await Policy.findOrFail(params.id)
      return thePolicy
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        return await Policy.query().paginate(page, perPage)
      } else {
        return await Policy.query()
      }
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const body = await request.validate(PolicyValidator)

    // Validación XOR y tipo de póliza
    if ((body.operator_id && body.machinery_id) || (!body.operator_id && !body.machinery_id)) {
      return response.badRequest({
        message: 'La póliza debe estar asociada a un operario o a una máquina, pero no a ambos o ninguno.',
      })
    }

    // Validar que el tipo de póliza corresponda al tipo de entidad (operario o maquinaria)
    const typesPolicyOperator = Object.values(OperatorPolicyType)
    const typesPolicyMachinery = Object.values(MachineryPolicyType)

    if (body.operator_id && !typesPolicyOperator.includes(body.type_policy as OperatorPolicyType)) {
      return response.badRequest({
        message: 'El tipo de póliza no es válido para un operario.',
      })
    }

    if (body.machinery_id && !typesPolicyMachinery.includes(body.type_policy as MachineryPolicyType)) {
      return response.badRequest({
        message: 'El tipo de póliza no es válido para una maquinaria.',
      })
    }

    const thePolicy: Policy = await Policy.create({
      insurance_id: body.insurance_id,
      machinery_id: body.machinery_id || null,
      operator_id: body.operator_id || null,
      type_policy: body.type_policy,
      start_date: body.start_date,
      end_date: body.end_date,
    })

    return thePolicy
  }

  public async update({ params, request, response }: HttpContextContract) {
    const thePolicy: Policy = await Policy.findOrFail(params.id)
    const body = await request.validate(PolicyValidator)

    // Validación XOR y tipo de póliza
    if ((body.operator_id && body.machinery_id) || (!body.operator_id && !body.machinery_id)) {
      return response.badRequest({
        message: 'La póliza debe estar asociada a un operario o a una máquina, pero no a ambos o ninguno.',
      })
    }

    // Validar que el tipo de póliza corresponda al tipo de entidad (operario o maquinaria)
    const tiposPolicyOperario = Object.values(OperatorPolicyType)
    const tiposPolicyMaquinaria = Object.values(MachineryPolicyType)

    if (body.operator_id && !tiposPolicyOperario.includes(body.type_policy as OperatorPolicyType)) {
      return response.badRequest({
        message: 'El tipo de póliza no es válido para un operario.',
      })
    }

    if (body.machinery_id && !tiposPolicyMaquinaria.includes(body.type_policy as MachineryPolicyType)) {
      return response.badRequest({
        message: 'El tipo de póliza no es válido para una maquinaria.',
      })
    }

    thePolicy.insurance_id = body.insurance_id
    thePolicy.machinery_id = body.machinery_id || null
    thePolicy.operator_id = body.operator_id || null
    thePolicy.type_policy = body.type_policy
    thePolicy.start_date = body.start_date
    thePolicy.end_date = body.end_date

    await thePolicy.save()

    return thePolicy
  }

  public async delete({ params, response }: HttpContextContract) {
    const thePolicy: Policy = await Policy.findOrFail(params.id)
    response.status(204)
    return await thePolicy.delete()
  }
}
