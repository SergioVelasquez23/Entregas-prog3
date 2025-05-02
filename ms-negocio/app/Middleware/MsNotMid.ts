import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export default class MsNotificationsMid {
  private baseUrl = Env.get("MS_NOTIFICATIONS");

  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    const theRequest = request.toJSON();
    console.log("Request recibido:", theRequest);

    // Depuración: Imprimir la URL del microservicio de notificaciones
    console.log("MS_NOTIFICATIONS URL:", this.baseUrl);

    // Verificar si existe el header de autorización
    // Temporalmente deshabilitado para pruebas
    /*
    if (!theRequest.headers.authorization) {
      console.log("Falta el token de autorización");
      return response
        .status(401)
        .json({ message: "Unauthorized: Missing token" });
    }

    const token = theRequest.headers.authorization.replace("Bearer ", "");
    */

    const notificationPayload = {
      recipients: [{ email: request.input("email") || "user@example.com" }],
      subject: "Nueva acción en el sistema",
      content: `<p>Se realizó una nueva acción en la URL: ${theRequest.url}</p>`
    };

    try {
      const result = await axios.post(
        `${this.baseUrl}/send_email`,
        notificationPayload
      );

      console.log("Respuesta de ms-notifications:", result.data);

      if (result.status === 200 && result.data.mensaje === "the message has been sent") {
        await next();
      } else {
        console.log("Fallo al enviar notificación");
        return response
          .status(400)
          .json({ message: "Failed to send notification" });
      }
    } catch (error) {
      console.error("Error al conectar con ms-notifications:", error.message);
      return response
        .status(500)
        .json({ message: "Internal Server Error: Notification failed" });
    }
  }
}