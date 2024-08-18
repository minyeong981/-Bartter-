package com.ssafy.bartter.domain.auth.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * Jwt 토큰 시간 설정 등을 하는 클래스
 *
 * @author 김훈민
 */
@Getter
@Configuration
public class JwtConfig {

    /**
     * access token 만료시간
     */
    @Value("${jwt.access-token.expiration}")
    private long accessTokenExpiration;

    /**
     * refresh token 만료시간
     */
    @Value("${jwt.refresh-token.expiration}")
    private long refreshTokenExpiration;
}
