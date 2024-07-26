package com.vagrant.projet_vagrant.config;


import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class resmapping implements WebMvcConfigurer {

    /**
     * Cors configuration.
     */
    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("PUT", "GET", "DELETE", "POST");
    }
}
