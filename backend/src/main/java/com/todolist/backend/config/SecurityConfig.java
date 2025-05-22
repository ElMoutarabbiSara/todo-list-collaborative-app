package com.todolist.backend.config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Value("${spring.security.user.name}")
    private String username;

    @Value("${spring.security.user.password}")
    private String password;

    @Value("${spring.security.user.roles}")
    private String roles;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Bean UserDetailsService pour créer l'utilisateur admin/admin en mémoire
    @Bean
    public UserDetailsService userDetailsService() {
        // Le mot de passe doit être encodé pour BCryptPasswordEncoder
        String encodedPassword = passwordEncoder().encode(password);
        return new InMemoryUserDetailsManager(
            User.withUsername(username)
                .password(encodedPassword)
                .roles(roles.split(","))
                .build()
        );
    }

@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable()) // disable CSRF for APIs
        .cors(Customizer.withDefaults()) // enable CORS
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/users/**").permitAll() // allow public access to /api/users/*
            .anyRequest().authenticated()
        )
        .httpBasic(Customizer.withDefaults());

    return http.build();
}
}
