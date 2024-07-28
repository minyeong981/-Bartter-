package com.ssafy.bartter.auth.utils;

import io.jsonwebtoken.Jwts;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

/**
 * jwt 토큰 생성, 검증 등을 위한 클래스
 *
 * @author 김훈민
 */
@Component
public class JwtUtil {

    private final SecretKey secretKey;

    public JwtUtil(@Value("${spring.jwt.secret}") String secret) {
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    /**
     * JWT 토큰을 생성하는 메서드
     *
     * @param category 토큰의 유형
     * @param username 사용자 이름
     * @param role 사용자의 role
     * @param expiredMs 토큰의 유효 기간 (밀리초 단위)
     * @return 생성된 JWT 토큰
     */
    public String generateToken(String category, String username, String role, Long expiredMs) {
        return Jwts.builder()
                .subject(username)
                .claim("role", role)
                .claim("category", category)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey, Jwts.SIG.HS256)
                .compact();
    }

    /**
     * JWT 토큰의 만료 여부를 확인하는 메서드
     *
     * @param token 확인할 JWT 토큰
     */
    public void isExpired(String token) {
        Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration();
    }

    /**
     * JWT 토큰에서 사용자 이름을 추출하는 메서드
     *
     * @param token 추출할 JWT 토큰
     * @return 토큰에 포함된 사용자 이름
     */
    public String getUsername(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username", String.class);
    }


    /**
     * JWT 토큰에서 사용자의 역할을 추출하는 메서드
     *
     * @param token 추출할 JWT 토큰
     * @return 토큰에 포함된 사용자 역할
     */
    public String getRole(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
    }

    /**
     * JWT 토큰에서 카테고리를 추출하는 메서드
     *
     * @param token 추출할 JWT 토큰
     * @return 토큰에 포함된 카테고리
     */
    public String getCategory(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("category", String.class);
    }



}
