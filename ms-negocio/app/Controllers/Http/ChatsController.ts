import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Chat from 'App/Models/Chat';
import ChatValidator from 'App/Validators/ChatValidator';

export default class ChatsController {
    public async find({ params, response }: HttpContextContract) {
        const chat = await Chat.query()
          .where('id', params.id)
          .preload('messages', (query) => {
            query.orderBy('createdAt', 'asc') // Ordenar mensajes por fecha
          })
          .firstOrFail()
    
        return response.json(chat)
      }

    public async create({ request, response }: HttpContextContract) {
        const { title, type } = request.only(['title', 'type'])
        const chat = await Chat.create({ title, type })
        return response.status(201).json(chat)
      }

    public async update({ params, request }: HttpContextContract) {
        const theChat: Chat = await Chat.findOrFail(params.id);
        const payload = await request.validate(ChatValidator);
        theChat.title = payload.title;
        theChat.type = payload.type;
        return await theChat.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theChat: Chat = await Chat.findOrFail(params.id);
            response.status(204);
            return await theChat.delete();
    }
}