package com.ssafy.bartter.domain.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * 인증되지 않은 접근에 대한 예외 처리를 담당하는 클래스
 *
 * @author 김훈민
 */
@Component
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    /**
     * 인증되지 않은 요청이 들어왔을 때 호출되는 메서드.
     * JSON 형식으로 에러 응답을 생성하여 반환합니다.
     *
     * @param request       HttpServletRequest 객체
     * @param response      HttpServletResponse 객체
     * @param authException AuthenticationException 객체
     * @throws IOException 입출력 예외가 발생할 경우
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        CustomException exception = new CustomException(ErrorCode.UNAUTHORIZED);

        ErrorResponse errorResponse = ErrorResponse.of(exception);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(errorResponse);
        response.getWriter().write(jsonResponse);
    }
}
