package com.ssafy.bartter.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Spring Security 와 관련된 설정을 하는 클래스
 *
 * @author 김훈민
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/", "/user/login").permitAll()
                        .anyRequest().authenticated()
                );

        /**
         * csrf disable
         */
        http
                .csrf((auth) -> auth.disable());

        /**
         * From 로그인 방식 disable (UsernamePasswordAuthenticationFilter 비활성화)
         */
        http
                .formLogin((auth) -> auth.disable());
        /**
         * http basic 인증 방식 disable (BasicAuthenticationFilter 비활성화)
         */
        http
                .httpBasic((auth) -> auth.disable());


        return http.build();
    }
}
