import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";
import Cuota from "App/Models/Cuota"; // Asegúrate de que el modelo Cuota esté correctamente importado

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

    // Obtener la cuota desde la base de datos
    const cuotaId = request.input("cuotaId");
    if (!cuotaId) {
      return response
        .status(400)
        .json({ message: "Bad Request: Missing cuotaId" });
    }

    const cuota = await Cuota.find(cuotaId);
    if (!cuota) {
      return response
        .status(404)
        .json({ message: "Cuota not found" });
    }

    if (cuota.pagada) {
      return response
        .status(400)
        .json({ message: "Cuota already paid" });
    }

    // Construir el payload del pago
    const paymentPayload = {
      userId: request.input("userId") || "default-user",
      amount: cuota.monto, // Usar el monto de la cuota
      currency: "COP",
      description: `Pago de cuota con ID: ${cuota.id}`,
      customer: {
        email: request.input("email") || "user@example.com",
        name: request.input("name") || "Cliente",
      },
      paymentMethod: request.input("paymentMethod") || "card",
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
        // Actualizar el estado de la cuota como pagada
        cuota.pagada = true;
        await cuota.save();

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