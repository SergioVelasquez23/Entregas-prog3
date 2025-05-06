import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message'
import MessageValidator from 'App/Validators/MessageValidator'
import Chat from 'App/Models/Chat'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'


export default class MessagesController {
  public async find({ params, response }: HttpContextContract) {
    const message = await Message.findOrFail(params.id)

    // Verificar que el usuario exista en ms-security
    let userData
    try {
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${message.user_id}`)
      userData = userResponse.data
    } catch (error) {
      return response.status(404).json({
        message: 'El usuario no existe en el sistema ms-security',
        error: error.response?.data || error.message,
      })
    }

    // Incluir el nombre del usuario en la respuesta
    return response.json({
      id: message.id,
      content: message.content,
      chat_id: message.chat_id,
      user_id: message.user_id,
      date: message.date,
      emisor: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
      },
      created_at: message.createdAt,
      updated_at: message.updatedAt,
    })
  }

  public async create({ request, response }: HttpContextContract) {
    const { content, chat_id, user_id, date} = request.only([
      'content',
      'chat_id',
      'user_id',
      'date',
    ])

    // Verificar que el chat exista
    await Chat.findOrFail(chat_id)

    // Verificar que el usuario exista en ms-security y obtener su información
    let userData
    try {
      const userResponse = await axios.get(`${Env.get('MS_SECURITY')}/api/users/${user_id}`)
      userData = userResponse.data // Obtener los datos del usuario
    } catch (error) {
      // Detener la ejecución si el usuario no existe
      return response.status(404).json({
        message: 'El usuario no existe en el sistema ms-security',
        error: error.response?.data || error.message,
      })
    }

    if (!userData || !userData._id || !userData.name || !userData.email) {
        return response.status(400).json({
          message: 'Los datos del usuario no son válidos.',
        })
      }
      
    // Crear el mensaje
    const message = await Message.create({ content, chat_id, user_id, date })

    // Incluir el nombre del usuario en la respuesta
    return response.status(201).json({
      id: message.id,
      content: message.content,
      chat_id: message.chat_id,
      user_id: message.user_id,
      date: message.date,

      emisor: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
      },
      created_at: message.createdAt,
      updated_at: message.updatedAt,
    })
  }

  public async update({ params, request }: HttpContextContract) {
    const theMessage: Message = await Message.findOrFail(params.id)
    const payload = await request.validate(MessageValidator)

    // Verificar que el usuario exista en ms-security
    try {
      await axios.get(`${Env.get('MS_SECURITY')}/api/users/${payload.user_id}`)
    } catch (error) {
      return {
        message: 'El usuario no existe en el sistema ms-security',
        error: error.response?.data || error.message,
      }
    }

    const data = {
      content: payload.content,
      chat_id: payload.chat_id,
      user_id: payload.user_id,
      date: payload.date.toJSDate(),
    }
    theMessage.merge(data)
    return await theMessage.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theMessage: Message = await Message.findOrFail(params.id)
    response.status(204)
    return await theMessage.delete()
  }
}