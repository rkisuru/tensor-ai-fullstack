package com.rkisuru.tensorai.config;

import com.rkisuru.tensorai.auth.OAuth2LoginSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsConfig config;
    private final OAuth2LoginSuccessHandler successHandler;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(config.corsConfigurationSource()))
                .authorizeHttpRequests(authorize-> authorize
                        .anyRequest().authenticated())
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("http://localhost:5173")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID"))
                .oauth2Login(oauth2-> {
                    oauth2.successHandler(successHandler);
                })
                .build();
    }
}
