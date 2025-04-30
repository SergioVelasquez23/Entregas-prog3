import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export default class MsPaymentsMid {
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
    const paymentPayload = {
      userId: request.input("userId") || "default-user",
      amount: request.input("amount") || 10000, // En COP, ajustar según datos
      currency: "COP",
      description: `Pago por ${theRequest.url}`,
      customer: {
        email: request.input("email") || "user@example.com",
        name: request.input("name") || "Cliente",
      },
      paymentMethod: request.input("paymentMethod") || "card", // Ajustar según ePayco
    };

    try {
      // Llamada al microservicio de pagos
      const result = await axios.post(
        `${Env.get("MS_PAYMENTS")}/charge`,
        paymentPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Respuesta de ms-payments:", result.data);

      if (result.data.success) {
        // Continuar si el pago es exitoso
        response.header("X-Payment-Id", result.data.paymentId); // Opcional: añadir ID del pago
        await next();
      } else {
        console.log("Fallo en el procesamiento del pago");
        return response
          .status(400)
          .json({ message: "Payment failed", details: result.data.error });
      }
    } catch (error) {
      console.error("Error al conectar con ms-payments:", error.message);
      return response
        .status(500)
        .json({ message: "Internal Server Error: Payment processing failed" });
    }
  }
}