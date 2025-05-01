package com.prog3.security.Configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
<<<<<<< HEAD
=======
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
>>>>>>> 7539102ba38228461bc4673c5023facac739485c
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
<<<<<<< HEAD
            // Disable CSRF (common for APIs, enable if needed for form-based apps)
            .csrf(csrf -> csrf.disable())
            // Configure authorization rules
            .authorizeHttpRequests(auth -> auth
                // Require OAuth2 authentication only for /api/auth/**
                .requestMatchers("/api/auth/**").authenticated()
                // Permit all other requests
                .anyRequest().permitAll()
            )
            // Enable OAuth2 login
            .oauth2Login(oauth2 -> oauth2
                // Optional: Customize login page or redirect URI if needed
                .defaultSuccessUrl("/api/auth/success", true)
=======
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll() // Endpoints públicos
                .anyRequest().authenticated() // Todo lo demás requiere autenticación
            )
            .oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo
                    .oidcUserService(oidcUserService()) // Maneja usuarios de Google y Microsoft
                )
                .defaultSuccessUrl("/api/auth/success", true) // Redirige tras login exitoso
                .failureUrl("/api/auth/failure") // Redirige si falla
            )
            .logout(logout -> logout
                .logoutUrl("/api/auth/logout")
                .logoutSuccessUrl("/public/login")
>>>>>>> 7539102ba38228461bc4673c5023facac739485c
            );

        return http.build();
    }
<<<<<<< HEAD
=======

    @Bean
    public OidcUserService oidcUserService() {
        return new OidcUserService(); // Servicio estándar para procesar datos de OAuth2
    }
>>>>>>> 7539102ba38228461bc4673c5023facac739485c
}