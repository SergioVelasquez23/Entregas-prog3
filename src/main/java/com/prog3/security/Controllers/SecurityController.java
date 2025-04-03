package com.prog3.security.Controllers;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.prog3.security.Models.Permission;
import com.prog3.security.Models.Session;
import com.prog3.security.Models.User;
import com.prog3.security.Repositories.SessionRepository;
import com.prog3.security.Repositories.UserRepository;
import com.prog3.security.Services.EncryptionService;
import com.prog3.security.Services.JwtService;
import com.prog3.security.Services.RequestURL;
import com.prog3.security.Services.ValidatorsService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@CrossOrigin
@RestController
@RequestMapping("/api/public/security")
public class SecurityController {

    @Autowired
    private UserRepository theUserRepository;

    @Autowired
    private SessionRepository theSessionRepository;

    @Autowired
    private EncryptionService theEncryptionService;

    @Autowired
    private JwtService theJwtService;

    @Autowired
    private RequestURL theRequestURL;

    @Autowired
    private ValidatorsService theValidatorsService;

    private final HttpClient client = HttpClient.newBuilder()
            .followRedirects(HttpClient.Redirect.NEVER) // No seguir redirecciones
            .build();

    private final Gson gson = new Gson();

    // Endpoint: /login
    @PostMapping("/login")
    public HashMap<String, Object> login(@RequestBody User theNewUser, final HttpServletResponse response) throws IOException {
        HashMap<String, Object> theResponse = new HashMap<>();
        User theActualUser = this.theUserRepository.getUserByEmail(theNewUser.getEmail());

        if (theActualUser != null
                && theActualUser.getPassword().equals(theEncryptionService.convertSHA256(theNewUser.getPassword()))) {

            // Generar un único código de dos factores
            String twoFactorCode = theEncryptionService.generateValidationCode();

            // Crear una nueva sesión
            Session newSession = new Session();
            newSession.setUser(theActualUser);
            newSession.setValidationCode(twoFactorCode);
            newSession.setExpirationDate(new Date(System.currentTimeMillis() + 3600000)); // 1 hora de expiración
            this.theSessionRepository.save(newSession);

            // Enviar el código de dos factores por correo electrónico
            twoFactorEmail(twoFactorCode, theActualUser.getEmail(), theActualUser.getName());

            // No devolver la contraseña en la respuesta
            theActualUser.setPassword("");
            theResponse.put("twoFactorCode", twoFactorCode); // Este es el mismo código que se envió al correo
            theResponse.put("user", theActualUser);
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }
        return theResponse;
    }

    // Método para enviar el código de dos factores por correo electrónico
    public void twoFactorEmail(String twoFactorCode, String email, String name) {
        try {
            Map<String, Object> bodyMap = new HashMap<>();
            Map<String, String> recipient = new HashMap<>();
            recipient.put("name", name);
            recipient.put("email", email);

            List<Map<String, String>> recipients = new ArrayList<>();
            recipients.add(recipient);

            bodyMap.put("recipients", recipients);
            bodyMap.put("code", twoFactorCode); // Incluye el código generado
            bodyMap.put("subject", "Tu código de autenticación de dos factores");
            bodyMap.put("content", "<h1>Código de autenticación</h1><p>Tu código de autenticación es: <strong>" + twoFactorCode + "</strong></p>");

            String body = gson.toJson(bodyMap);

            HttpRequest postRequest = HttpRequest.newBuilder()
                    .uri(URI.create("http://localhost:8081/send2fa"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(body))
                    .build();

            HttpResponse<String> response = client.send(postRequest, HttpResponse.BodyHandlers.ofString());

            System.out.println("Response code: " + response.statusCode());
            System.out.println("Response body: " + response.body());

            if (response.statusCode() != 200) {
                throw new RuntimeException("Error al enviar el correo: " + response.body());
            }
        } catch (Exception e) {
            System.out.println("Error al enviar el correo electrónico:");
            e.printStackTrace();
        }
    }

    // Endpoint: /login/validate/{twoFactorCode}
    @PostMapping("/login/validate/{twoFactorCode}")
    public HashMap<String, Object> validateLogin(@RequestBody User theNewUser, @PathVariable String twoFactorCode,
            final HttpServletResponse response) throws IOException {
        HashMap<String, Object> theResponse = new HashMap<>();
        User theActualUser = this.theUserRepository.getUserByEmail(theNewUser.getEmail());

        // Depuración: Verificar si el usuario existe
        if (theActualUser == null) {
            System.out.println("Usuario no encontrado: " + theNewUser.getEmail());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Usuario no encontrado");
            return theResponse;
        }

        // Depuración: Verificar si la contraseña coincide
        String hashedPassword = theEncryptionService.convertSHA256(theNewUser.getPassword());
        if (!theActualUser.getPassword().equals(hashedPassword)) {
            System.out.println("Contraseña incorrecta para el usuario: " + theNewUser.getEmail());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Contraseña incorrecta");
            return theResponse;
        }

        // Depuración: Buscar sesiones asociadas al usuario
        List<Session> theSessions = theSessionRepository.getSessionByUser(theActualUser.get_id());
        System.out.println("Sesiones encontradas para el usuario: " + theSessions);

        // Validar el código de dos factores
        Session validSession = null;
        for (Session session : theSessions) {
            System.out.println("Validando sesión: " + session.get_id());
            System.out.println("Código almacenado: " + session.getValidationCode());
            System.out.println("Código proporcionado: " + twoFactorCode);

            if (session.getValidationCode().equals(twoFactorCode)) {
                validSession = session;
                break;
            }
            // else {
            //     // Incrementar el contador de errores si el código no coincide
            //     session.setTimesErrorValidationCode(session.getTimesErrorValidationCode() + 1);
            //     this.theSessionRepository.save(session); // Guardar los cambios en la base de datos
            //     System.out.println("Incrementando contador de errores para la sesión: " + session.get_id()
            //             + ". Nuevo valor: " + session.getTimesErrorValidationCode());
            // }
        }

        if (validSession == null) {
            System.out.println("Código de dos factores incorrecto para el usuario: " + theNewUser.getEmail());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Código de dos factores incorrecto");
            return theResponse;
        }

        // Generar el token JWT
        HashMap<String, Object> tokenResponse = theJwtService.generateToken(theActualUser);
        String token = tokenResponse.get("token").toString();
        Date expirationDate = (Date) tokenResponse.get("expiration");

        // Actualizar la sesión con el token
        validSession.setValidationCode(""); // Limpiar el código de validación
        validSession.setToken(token);
        validSession.setExpirationDate(expirationDate);
        this.theSessionRepository.save(validSession);

        // No devolver la contraseña en la respuesta
        theActualUser.setPassword("");
        theResponse.put("user", theActualUser);
        theResponse.put("token", token);
        theResponse.put("expiration", expirationDate);

        return theResponse;
    }

    // Endpoint: /login-no-auth
    @PostMapping("/login-no-auth")
    public HashMap<String, Object> loginNoAuth(@RequestBody User theNewUser, final HttpServletResponse response) throws IOException {
        HashMap<String, Object> theResponse = new HashMap<>();
        User theActualUser = this.theUserRepository.getUserByEmail(theNewUser.getEmail());

        if (theActualUser != null
                && theActualUser.getPassword().equals(theEncryptionService.convertSHA256(theNewUser.getPassword()))) {

            String token = theJwtService.generateToken(theActualUser).get("token").toString();
            theActualUser.setPassword(""); // No devolver la contraseña
            theResponse.put("token", token);
            theResponse.put("user", theActualUser);
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }
        return theResponse;
    }
    // Método auxiliar: Validación de dos factores

    private boolean twoFactorValidation(User theActualUser, String twoFactorCode) {
        List<Session> theSessions = theSessionRepository.getSessionByUser(theActualUser.get_id());
        for (Session session : theSessions) {
            if (session.getValidationCode().equals(twoFactorCode)) {
                return true;
            }
        }
        return false;
    }

    // Endpoint: /permissions-validation
    @PostMapping("/permissions-validation")
    public boolean permissionsValidation(final HttpServletRequest request, @RequestBody Permission thePermission) {
        return this.theValidatorsService.validationRolePermission(request, thePermission.getUrl(), thePermission.getMethod());
    }

    // Endpoint: /{userId}/matchSession/{sessionId}
    @PutMapping("/{userId}/matchSession/{sessionId}")
    public String matchSession(@PathVariable String userId, @PathVariable String sessionId) {
        User theActualUser = this.theUserRepository.findById(userId).orElse(null);
        Session theActualSession = this.theSessionRepository.findById(sessionId).orElse(null);

        if (theActualUser != null && theActualSession != null) {
            theActualSession.setUser(theActualUser);
            this.theSessionRepository.save(theActualSession);
            return "Session matched to user successfully";
        } else {
            return "User or session not found";
        }
    }

    // Endpoint: /{userId}/unmatchSession/{sessionId}
    @PutMapping("/{userId}/unmatchSession/{sessionId}")
    public String unmatchSession(@PathVariable String userId, @PathVariable String sessionId) {
        Session theActualSession = this.theSessionRepository.findById(sessionId).orElse(null);

        if (theActualSession != null && theActualSession.getUser() != null && theActualSession.getUser().get_id().equals(userId)) {
            theActualSession.setUser(null);
            this.theSessionRepository.save(theActualSession);
            return "Session unmatched from user successfully";
        } else {
            return "User or session not found";
        }
    }
}









//else {
//Incrementar el contador de errores si el código no coincide
// session.setTimesErrorValidationCode(session.getTimesErrorValidationCode() + 1);
//        this.theSessionRepository.save(session); // Guardar los cambios en la base de datos   System.out.println("Incrementando contador de errores para la sesión: " + session.get_id()
//         + ". Nuevo valor: " + session.getTimesErrorValidationCode())}
