package com.fitpulse.gym.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI fitPulseOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("FitPulse 360 Gym Management API")
                        .description("High-performance backend API powering Admin Operations, Trainer Coaching, and Member Self-Service.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("FitPulse Engineering")
                                .email("dev@fitpulse360.com"))
                        .license(new License().name("MIT License")))
                .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
                .components(new io.swagger.v3.oas.models.Components()
                        .addSecuritySchemes("Bearer Authentication", createAPIKeyScheme()));
    }

    private SecurityScheme createAPIKeyScheme() {
        return new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .bearerFormat("JWT")
                .scheme("bearer");
    }
}
