package com.ssafy.bartter.global.filter;

import com.ssafy.bartter.auth.service.JwtTokenService;
import com.ssafy.bartter.global.exception.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;

/**
 * jwt 인증을 위한 필터
 *
 * @author 김훈민
 */
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenService jwtTokenService;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 헤더에서 accessToken 추출
        String accessToken = request.getHeader("accessToken");


        if(accessToken == null) {
            filterChain.doFilter(request, response);
            return;
        }


        // 토큰 만료 여부 확인
        try{
            jwtTokenService.isExpired(accessToken);
        } catch (ExpiredJwtException e){
            ErrorCode errorCode = ErrorCode.ACCESS_TOKEN_EXPIRED;
            response.setStatus(errorCode.getStatus().value());  // 상태 코드 설정
            response.setContentType("application/json");        // 응답 유형 설정

            // 에러 메시지 전송
            PrintWriter printWriter = response.getWriter();
            printWriter.print("{\"errorCode\": " + errorCode.getCode() + ", \"message\": \"" + errorCode.getMessage() + "\"}");
            printWriter.flush();
        }


        // 토큰이 accessToken 인지 확인
        String category = jwtTokenService.getCategory(accessToken);
        if (!category.equals("accessToken")) {
            PrintWriter writer = response.getWriter();
            writer.print("invalid access token");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }


        // username 을 획득
        String username = jwtTokenService.getUsername(accessToken);
        String role = jwtTokenService.getRole(accessToken);
    }
}
