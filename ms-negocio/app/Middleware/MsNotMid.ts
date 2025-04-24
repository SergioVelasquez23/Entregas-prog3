import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export default class MsNotificationsMid {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const theRequest = request.toJSON();
    console.log("Request recibido:", theRequest);

    // Verificar si existe el header de autorización
    if (!theRequest.headers.authorization) {
      console.log("Falta el token de autorización");
      return response
        .status(401)
        .json({ message: "Unauthorized: Missing token" });
    }

    const token = theRequest.headers.authorization.replace("Bearer ", "");
    const notificationPayload = {
      userId: request.input("userId") || "default-user", // Ajusta según tu lógica
      type: "email", // O "push", según el caso
      message: `Nueva acción en ${theRequest.url}`,
      recipient: request.input("email") || "user@example.com", // Ajusta según datos
    };

    try {
      // Llamada al microservicio de notificaciones
      const result = await axios.post(
        `${Env.get("MS_NOTIFICATIONS")}/sendemail`,
        notificationPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Respuesta de ms-notifications:", result.data);

      if (result.data.success) {
        // Continuar si la notificación se envió correctamente
        await next();
      } else {
        console.log("Fallo al enviar notificación");
        return response
          .status(400)
          .json({ message: "Failed to send notification" });
      }
    } catch (error) {
      console.error("Error al conectar con ms-notifications:", error.message);
      // Opcional: decidir si continuar o detener la solicitud
      return response
        .status(500)
        .json({ message: "Internal Server Error: Notification failed" });
    }
  }
}