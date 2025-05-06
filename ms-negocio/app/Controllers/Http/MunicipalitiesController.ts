import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Municipality from 'App/Models/Municipality'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import Department from 'App/Models/Departament'

export default class MunicipalitiesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const apiUrl = Env.get('COLOMBIA_API_URL')
      const department = request.input('department')

      const endpoint = department
        ? `${apiUrl}/municipios?department=${department}`
        : `${apiUrl}/municipios`
      const { data: municipalities } = await axios.get(endpoint)

      if (!municipalities || municipalities.length === 0) {
        return response.notFound({ message: 'No se encontraron municipalities en la API.' })
      }

      return response.ok({ data: municipalities })
    } catch (error) {
      console.error('Error al obtener municipalities:', error.message)
      return response.internalServerError({
        message: 'Error al obtener municipalities desde la API de Colombia.',
        error: error.message,
      })
    }
  }

  public async sincronizar({ request, response }: HttpContextContract) {
    try {
      const apiUrl = Env.get('COLOMBIA_API_URL')
      const departamentoNombre = request.input('departamento')
  
      const endpoint = departamentoNombre
        ? `${apiUrl}/municipios?departamento=${departamentoNombre}`
        : `${apiUrl}/municipios`
      const { data: municipios } = await axios.get(endpoint)
  
      for (const municipio of municipios) {
        // Buscar el departamento en la base de datos
        const departamento = await Departamento.findBy('id', municipio.departamento_id)
  
        if (!departamento) {
          console.warn(`Departamento no encontrado para el municipio: ${municipio.nombre}`)
          continue // Omitir municipios cuyo departamento no exista
        }
  
        // Crear o actualizar el municipio en la base de datos
        await Municipio.updateOrCreate(
          { id: municipio.id },
          {
            nombre: municipio.nombre,
            departamento_id: departamento.id, // Asignar el ID del departamento encontrado
          }
        )
      }
  
      return response.ok({ message: 'Municipios sincronizados correctamente.' })
    } catch (error) {
      console.error('Error al sincronizar municipios:', error.message)
      return response.internalServerError({
        message: 'Error al sincronizar municipios desde la API de Colombia.',
        error: error.message,
      })
    }
  }
}