package com.prog3.security.Services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
<<<<<<< HEAD
public class JwUtil {
=======
public class JwtUtil {
>>>>>>> 7539102ba38228461bc4673c5023facac739485c
    private final String SECRET_KEY = "tu-secret-key-super-segura"; // Cambia por una clave segura
    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hora

    public String generateToken(String subject, String email) {
        return Jwts.builder()
<<<<<<< HEAD
                .setSubject(subject) // ID del usuario (sub de OAuth2)
                .claim("email", email) // Añade el email como claim
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
=======
            .setSubject(subject) // ID del usuario (sub de OAuth2)
            .claim("email", email) // Añade el email como claim
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
            .compact();
>>>>>>> 7539102ba38228461bc4673c5023facac739485c
    }
}