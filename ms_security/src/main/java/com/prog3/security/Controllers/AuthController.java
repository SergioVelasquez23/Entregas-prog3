package com.prog3.security.Controllers;

import com.prog3.security.DTO.PermissionRequest;
import com.prog3.security.Services.JwUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwUtil jwtUtil;

    @GetMapping("/success")
    public String loginSuccess(@AuthenticationPrincipal OidcUser user) {
        String subject = user.getSubject(); // ID único del usuario
        String email = user.getEmail(); // Email del usuario
        String token = jwtUtil.generateToken(subject, email);
        return token; // Devuelve el JWT
    }

    @GetMapping("/failure")
    public String loginFailure() {
        return "Authentication failed";
    }

    @PostMapping("/permissions-validation")
public ResponseEntity<Boolean> validatePermissions(
        @RequestHeader("Authorization") String authHeader,
        @RequestBody PermissionRequest permissionRequest) {
    // Extraer el token JWT
    String token = authHeader.replace("Bearer ", "");
    try {
        // Validar el token (simplificado, usar JwtDecoder en producción)
        // Aquí puedes verificar permisos basados en el token y la solicitud
        boolean hasPermission = checkPermissions(token, permissionRequest);
        return ResponseEntity.ok(hasPermission);
    } catch (Exception e) {
        return ResponseEntity.status(403).body(false);
    }
}

private boolean checkPermissions(String token, PermissionRequest request) {
    // Lógica para validar permisos (por ejemplo, roles en el JWT)
    return true; // Simplificado, implementa según tus reglas
}


}