package com.ssafy.bartter.global.filter;

import com.ssafy.bartter.auth.utils.JwtUtil;
import com.ssafy.bartter.global.exception.ErrorCode;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;

/**
 * JWT 인증을 위한 필터 클래스.
 *
 * @author 김훈민
 */
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    /**
     * 요청에 대한 필터링을 수행하는 메서드
     * 헤더에서 JWT 토큰을 추출하고, 유효성 및 만료 여부를 확인하는 등 검증 진행
     *
     * @param request     HttpServletRequest 객체
     * @param response    HttpServletResponse 객체
     * @param filterChain FilterChain 객체
     * @throws ServletException Servlet 관련 예외
     * @throws IOException      입출력 관련 예외
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 헤더에서 accessToken 추출
        String accessToken = request.getHeader("accessToken");

        // 토큰이 없다면 다음 필터로
        if(accessToken == null) {
            filterChain.doFilter(request, response);
            return;
        }


        // 토큰 만료 여부 확인
        try{
            jwtUtil.isExpired(accessToken);
        } catch (ExpiredJwtException e){
            ErrorCode errorCode = ErrorCode.ACCESS_TOKEN_EXPIRED;
            response.setStatus(errorCode.getStatus().value());
            response.setContentType("application/json");

            // 에러 메시지 전송
            PrintWriter printWriter = response.getWriter();
            printWriter.print("{\"errorCode\": " + errorCode.getCode() + ", \"message\": \"" + errorCode.getMessage() + "\"}");
            printWriter.flush();
        }


        // 토큰이 accessToken 인지 확인
        String category = jwtUtil.getCategory(accessToken);
        if (!category.equals("accessToken")) {
            PrintWriter writer = response.getWriter();
            writer.print("invalid access token");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }


        // username 을 획득
        String username = jwtUtil.getUsername(accessToken);
        String role = jwtUtil.getRole(accessToken);
    }
}
