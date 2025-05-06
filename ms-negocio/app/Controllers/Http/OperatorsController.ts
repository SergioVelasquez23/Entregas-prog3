import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Operator from 'App/Models/Operator'
import OperatorValidator from 'App/Validators/OperatorValidator'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

interface User {
  _id: string
  name: string
  email: string
}

export default class OperatorsController {
  // Crear un operario
  public async create({ request, response }: HttpContextContract) {
    const payload = await request.validate(OperatorValidator)
    const { user_id, experience } = payload

    // Verificar si el usuario existe en ms-security
    let user: User
    try {
      const userResponse = await axios.get<User>(`${Env.get('MS_SECURITY')}/api/users/${user_id}`, {
        headers: {
          Authorization: request.header('Authorization'),
        },
      })
      user = userResponse.data
    } catch (error) {
      return response.status(404).send({ message: 'El usuario no existe en ms-security', error: error.response?.data || error.message })
    }

    // Crear el operario en ms-negocio
    const operator = await Operator.create({
      user_id: user._id,
      experience,
    })

    return response.status(201).send({
      id: operator.id,
      name: user.name,
      email: user.email,
      experience: operator.experience,
    })
  }

  // Obtener operarios
  public async find({ request, params }: HttpContextContract) {
    const token = request.header('Authorization')?.replace('Bearer ', '')

    if (params.id) {
      // Obtener un operario específico
      const operator = await Operator.findOrFail(params.id)

      // Obtener datos del usuario desde ms-security
      let user: User
      try {
        const userResponse = await axios.get<User>(`${Env.get('MS_SECURITY')}/api/users/${operator.user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        user = userResponse.data
      } catch (error) {
        return { message: 'Error al obtener el usuario desde ms-security', error: error.response?.data || error.message }
      }

      return {
        id: operator.id,
        name: user.name,
        email: user.email,
        experience: operator.experience,
      }
    } else {
      // Obtener todos los operators
      const operators = await Operator.all()

      // Obtener datos de todos los usuarios desde ms-security
      let users: User[] = []
      try {
        const usersResponse = await axios.get<User[]>(`${Env.get('MS_SECURITY')}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        users = usersResponse.data
      } catch (error) {
        return { message: 'Error al obtener los usuarios desde ms-security', error: error.response?.data || error.message }
      }

      // Combinar datos de operators con usuarios
      return operators.map((operator) => {
        const user = users.find((u) => u._id === operator.user_id)
        return {
          id: operator.id,
          name: user?.name || 'Usuario no encontrado',
          email: user?.email || 'Usuario no encontrado',
          experience: operator.experience,
        }
      })
    }
  }

  // Actualizar un operator
  public async update({ params, request }: HttpContextContract) {
    const operator = await Operator.findOrFail(params.id)
    const payload = await request.validate(OperatorValidator)
    
    operator.experience = payload.experience
    await operator.save()

    return operator
  }

  // Eliminar un operator
  public async delete({ params, response }: HttpContextContract) {
    const operator = await Operator.findOrFail(params.id)
    await operator.delete()
    return response.status(204)
  }
}