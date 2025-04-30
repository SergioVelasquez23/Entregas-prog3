package com.prog3.security.Configurations;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
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
            );

        return http.build();
    }
}