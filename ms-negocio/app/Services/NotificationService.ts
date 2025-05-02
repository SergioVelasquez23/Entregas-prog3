import axios from "axios";
import Env from "@ioc:Adonis/Core/Env";

export default class NotificationService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = Env.get("MS_NOTIFICATIONS");
  }

  /**
   * Envía un email usando el servicio de notificaciones
   */
  public async sendEmail(recipient: string, subject: string, content: string): Promise<boolean> {
    const notificationPayload = {
      recipients: [{ email: recipient }],
      subject,
      content,
    };

    try {
      const response = await axios.post(`${this.baseUrl}/send_email`, notificationPayload);

      console.log("Respuesta de ms-notifications:", response.data);

      return response.status === 200 && response.data.mensaje === "the message has been sent";
    } catch (error) {
      console.error("Error al enviar email:", error.message);
      return false;
    }
  }

  /**
   * Envía un link de reseteo de contraseña
   */
  public async sendResetLink(recipient: string, resetLink: string): Promise<boolean> {
    const subject = "Restablecimiento de contraseña";
    const content = `<p>Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="${resetLink}">${resetLink}</a></p>`;

    return this.sendEmail(recipient, subject, content);
  }
}