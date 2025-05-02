import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mensaje from 'App/Models/Mensaje'
import MensajeValidator from 'App/Validators/MensajeValidator'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

export default class MensajesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theMensaje: Mensaje = await Mensaje.findOrFail(params.id)
            return theMensaje;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Mensaje.query().paginate(page, perPage)
            } else {
                return await Mensaje.query()
            }
        }
    }

    public async create({ request, response }: HttpContextContract) {
        const { usuario_id, contenido } = request.only(['usuario_id', 'contenido'])

        // Validar que el usuario existe en ms-security
        try {
            await axios.get(`${Env.get('MS_SECURITY')}/api/users/${usuario_id}`, {
                headers: {
                    Authorization: request.header('Authorization'),
                },
            })
        } catch (error) {
            return response.notFound({
                message: 'Usuario no encontrado en ms-security',
                error: error.response?.data || error.message,
            })
        }

        // Crear el mensaje
        const mensaje = await Mensaje.create({ usuario_id, contenido })
        return response.status(201).send(mensaje)
    }

    public async update({ params, request }: HttpContextContract) {
        const theMensaje: Mensaje = await Mensaje.findOrFail(params.id);
        const payload = await request.validate(MensajeValidator);
        const data = {
            contenido: payload.contenido,
            chat_id: payload.chat_id,
            usuario_id: payload.usuario_id,
            fecha: payload.fecha.toJSDate(),
            hora: payload.hora
        };
        theMensaje.merge(data);
        return await theMensaje.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMensaje: Mensaje = await Mensaje.findOrFail(params.id);
        response.status(204);
        return await theMensaje.delete();
    }
}