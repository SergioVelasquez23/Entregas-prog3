package com.prog3.security.Configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.prog3.security.Interceptors.SecurityInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private SecurityInterceptor securityInterceptor;

    // // @Override
    // // public void addInterceptors(InterceptorRegistry registry) {
    // //     registry.addInterceptor(securityInterceptor)
    // //             .addPathPatterns("/api/**") // Rutas que serán interceptadas
    // //             .excludePathPatterns("/api/public/**"); // Rutas que serán excluidas de la interceptación */
    // // }
}
