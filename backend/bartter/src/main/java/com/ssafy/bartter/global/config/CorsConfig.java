package com.ssafy.bartter.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS 와 관련된 설정을 하는 클래스
 *
 * @author 김훈민
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${APP_DOMAIN_URL}")
    private String APP_DOMAIN_URL;

    // TODO : 배포시 변경 필요
    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        corsRegistry.addMapping("/**")
                .allowedMethods("*")
                .allowedOrigins(APP_DOMAIN_URL)
                .allowCredentials(true);
    }
}
