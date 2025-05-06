import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Departament from 'App/Models/Departament'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class DepartamentsController {
  public async index({ response }: HttpContextContract) {
    try {
      const apiUrl = Env.get('COLOMBIA_API_URL')

      // Obtener departamentos desde la API
      const { data: departamentos } = await axios.get(`${apiUrl}/departamentos`)

      if (!departamentos || departamentos.length === 0) {
        return response.notFound({ message: 'No se encontraron departamentos en la API.' })
      }

      return response.ok({ data: departamentos })
    } catch (error) {
      console.error('Error al obtener departamentos:', error.message)
      return response.internalServerError({
        message: 'Error al obtener departamentos desde la API de Colombia.',
        error: error.message,
      })
    }
  }

  public async sincronizar({ response }: HttpContextContract) {
    try {
      const apiUrl = Env.get('COLOMBIA_API_URL')
      const { data: departament } = await axios.get(`${apiUrl}/departaments`)

      for (const departament of departaments) {
        await Departament.updateOrCreate(
          { id: departament.id },
          { name: departament.name }
        )
      }

      return response.ok({ message: 'Departamentos sincronizados correctamente.' })
    } catch (error) {
      console.error('Error al sincronizar departamentos:', error.message)
      return response.internalServerError({
        message: 'Error al sincronizar departamentos desde la API de Colombia.',
        error: error.message,
      })
    }
  }
}