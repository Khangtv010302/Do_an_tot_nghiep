package org.example.vaccine.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import lombok.RequiredArgsConstructor;
import org.example.vaccine.security.JwtTokenFilter;
import org.example.vaccine.security.JwtTokenProvider;
import org.example.vaccine.service.serviceImp.CustomDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@SecurityScheme(
        name = "userAuth",
        description = "Basic auth with DB description",
        scheme = "bearer",  // Consider using "basic" for clarity
        type = SecuritySchemeType.HTTP,
        in = SecuritySchemeIn.HEADER
)
public class SecurityConfig {
    final
    JwtTokenProvider jwtTokenProvider;
    final
    CustomDetailService customDetailService;
    @Autowired
    public SecurityConfig(JwtTokenProvider jwtTokenProvider, CustomDetailService customDetailService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.customDetailService = customDetailService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize

                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui", "/swagger-ui/**","/swagger-resources/**","/webjars/**","/API/Auth/**","/API/Auth").permitAll()
                        .requestMatchers("/API/Vaccine/**","/API/Vaccine").hasRole("Admin")
                        .requestMatchers("/API/HealthcareStaff/**","/API/HealthcareStaff").hasRole("Admin")
                        .requestMatchers("/API/Role/**","/API/Role").hasRole("Admin")
                        .requestMatchers("/API/Manufacturer/**","/API/Manufacturer").hasRole("Admin")
                        .anyRequest().authenticated()
                )
                .cors(Customizer.withDefaults())
                .csrf(httpSecurityCsrfConfigurer -> httpSecurityCsrfConfigurer.ignoringRequestMatchers("/API/**"))
                .addFilterBefore(new JwtTokenFilter(jwtTokenProvider, customDetailService), UsernamePasswordAuthenticationFilter.class);



        return http.build();
    }
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    @Bean
    public AuthenticationManager authManager(CustomDetailService customDetailService) {
        DaoAuthenticationProvider daoProvider = new DaoAuthenticationProvider();
        daoProvider.setUserDetailsService(customDetailService);
        return new ProviderManager(daoProvider);
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
