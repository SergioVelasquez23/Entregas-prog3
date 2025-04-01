package com.prog3.security.Controllers;

import java.io.IOException;
import java.net.http.HttpClient;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    // Endpoint: /login
    @PostMapping("/login")
    public HashMap<String, Object> login(@RequestBody User theNewUser, final HttpServletResponse response) throws IOException {
        HashMap<String, Object> theResponse = new HashMap<>();
        User theActualUser = this.theUserRepository.getUserByEmail(theNewUser.getEmail());

        if (theActualUser != null
                && theActualUser.getPassword().equals(theEncryptionService.convertSHA256(theNewUser.getPassword()))) {

            String twoFactorCode = theEncryptionService.generateValidationCode();

            List<Session> theSessions = theSessionRepository.getSessionByUser(theActualUser.get_id());
            theSessions.forEach(session -> session.setValidationCode(twoFactorCode));
            theSessionRepository.saveAll(theSessions);

            theActualUser.setPassword(""); // No devolver la contraseña
            theResponse.put("twoFactorCode", twoFactorCode);
            theResponse.put("user", theActualUser);

            try {
                theRequestURL.twoFactorEmail(twoFactorCode, theActualUser.getEmail(), theActualUser.getName());
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }
        return theResponse;
    }

    // Endpoint: /login/validate/{twoFactorCode}
    @PostMapping("/login/validate/{twoFactorCode}")
    public HashMap<String, Object> validateLogin(@RequestBody User theNewUser, @PathVariable String twoFactorCode,
            final HttpServletResponse response) throws IOException {
        HashMap<String, Object> theResponse = new HashMap<>();
        User theActualUser = this.theUserRepository.getUserByEmail(theNewUser.getEmail());

        if (theActualUser != null
                && theActualUser.getPassword().equals(theEncryptionService.convertSHA256(theNewUser.getPassword()))
                && this.twoFactorValidation(theActualUser, twoFactorCode)) {

            HashMap<String, Object> tokenResponse = theJwtService.generateToken(theActualUser);
            String token = tokenResponse.get("token").toString();
            Date expirationDate = (Date) tokenResponse.get("expiration");

            List<Session> theSessions = theSessionRepository.getSessionByUser(theActualUser.get_id());
            theSessions.forEach(session -> {
                session.setValidationCode("");
                session.setToken(token);
                session.setExpirationDate(expirationDate);
            });
            theSessionRepository.saveAll(theSessions);

            theActualUser.setPassword(""); // No devolver la contraseña
            theResponse.put("user", theActualUser);
            theResponse.put("token", token);
            theResponse.put("expiration", expirationDate);
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }
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
}
