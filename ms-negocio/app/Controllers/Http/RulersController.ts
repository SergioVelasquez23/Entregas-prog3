import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ruler from 'App/Models/Ruler'
import MunicipalityRuler from 'App/Models/MunicipalityRuler'
import DepartmentRuler from 'App/Models/DepartmentRuler'
import { DateTime } from 'luxon'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class RulersController {
  public async create({ request, response }: HttpContextContract) {
    const { user_id, start_period, end_period} = request.only([
      'user_id',
      'start_period',
      'end_period',
    ])

    // Verificar si el usuario existe en ms-security
    try {
      await axios.get(`${Env.get('MS_SECURITY')}/api/users/${user_id}`, {
        headers: { Authorization: request.header('Authorization') },
      })
    } catch (error) {
      return response.status(404).send({
        message: 'El usuario no existe en ms-security',
        error: error.response?.data || error.message,
      })
    }

    // Crear el gobernante
    const ruler = await Ruler.create({ user_id, start_period, end_period })

    // Asignar territorio
    if (tipo === 'departamento') {
      // Verificar si ya tiene municipios asignados activamente (XOR)
      const municipiosActivos = await MunicipalityRuler.query()
        .where('ruler_id', ruler.id)
        .where('end_date', '>=', DateTime.now().toSQL())
        .first()

      if (municipiosActivos) {
        return response.badRequest({
          message: 'El gobernante ya está asignado a un municipio. No puede ser asignado a un departamento simultáneamente.',
        })
      }

      // Crear asignación en la tabla intermedia
      await MunicipalityRuler.create({
        ruler_id: ruler.id,
        department_id: territorio.department_id,
        start_date: start_period,
        end_date: end_period,
      })
    } else if (tipo === 'municipio') {
      // Verificar si ya tiene departamentos asignados activamente (XOR)
      const departamentosActivos = await DepartmentRuler.query()
        .where('ruler_id', ruler.id)
        .where('fecha_fin', '>=', DateTime.now().toSQL())
        .first()

      if (departamentosActivos) {
        return response.badRequest({
          ruler: 'El ruler ya está asignado a un departamento. No puede ser asignado a un municipio simultáneamente.',
        })
      }

      // Crear asignación en la tabla intermedia
      await MunicipalityRuler.create({
        ruler_id: ruler.id,
        municipality_id: territorio.municipality_id,
        start_date: start_period,
        end_date: end_period,
      })
    } else {
      return response.badRequest({ message: 'Tipo de territorio inválido' })
    }

    return response.status(201).send({ message: 'Gobernante creado y territorio asignado' })
  }

  public async find({ request, params, response }: HttpContextContract) {
    try {
      if (params.id) {
        // Buscar un gobernante específico por ID
        const ruler = await Ruler.query()
          .where('id', params.id)
          .preload('departamentos', (query) => {
            query.pivotColumns(['fecha_inicio', 'fecha_fin']);
          })
          .preload('municipios', (query) => {
            query.pivotColumns(['fecha_inicio', 'fecha_fin']);
          })
          .firstOrFail();

        const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${ruler.user_id}`);
        const {_id, name, email} = userResponse.data;  
  
        return response.ok({
            id: ruler.id,
            user: {id: _id, name, email}, // Información del usuario
            start_period: ruler.start_period,
            end_period: ruler.end_period,
            departamentos: ruler.departamentos,
            municipios: ruler.municipios
        });
      } else {

        const rulers = await Ruler.query()
          .preload('departamentos', (query) => {
            query.pivotColumns(['fecha_inicio', 'fecha_fin']);
          })
          .preload('municipios', (query) => {
            query.pivotColumns(['fecha_inicio', 'fecha_fin']);
          });

        const rulersWithUserData = await Promise.all(
          rulers.map(async (ruler) => {
            const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${ruler.user_id}`);
            const {_id, name, email} = userResponse.data; // Filtrar solo los campos necesarios

            return {
              id: ruler.id,
              user: {id: _id, name, email}, // Información del usuario
              start_period: ruler.start_period,
              end_period: ruler.end_period,
              departamentos: ruler.departamentos,
              municipios: ruler.municipios
            };
          })
        );
  
        return response.ok(rulersWithUserData);
      }
    } catch (error) {
      console.error('Error al listar rulers:', error.message);
      return response.internalServerError({
        message: 'Error al listar rulers.',
        error: error.message,
      });
    }
  }
}