package com.ssafy.bartter.global.filter;

import com.ssafy.bartter.domain.auth.repository.RedisRefreshRepository;
import com.ssafy.bartter.domain.auth.utils.JwtUtil;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;
import java.util.Objects;

/**
 * 사용자 로그아웃 요청을 처리하는 필터 클래스
 *
 * @author 김훈민
 */
@RequiredArgsConstructor
public class LogoutFilter extends GenericFilterBean {

    private final JwtUtil jwtUtil;
    private final RedisRefreshRepository redisRefreshRepository;

    /**
     * 요청을 필터링하여 로그아웃 요청을 처리한다
     *
     * @param request  서블릿 요청 객체
     * @param response 서블릿 응답 객체
     * @param chain    필터 체인 객체
     * @throws IOException      입출력 예외
     * @throws ServletException 서블릿 예외
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        doFilter((HttpServletRequest) request, (HttpServletResponse) response, chain);
    }

    /**
     * HTTP 요청을 처리하여 로그아웃을 수행하는 메서드
     * 리프레시 토큰의 유효성을 검사하고, 유효하지 않으면 예외를 발생
     * 유효한 토큰인 경우, 데이터베이스에서 토큰을 삭제하고 쿠키를 무효화
     *
     * @param request     HTTP 요청 객체
     * @param response    HTTP 응답 객체
     * @param filterChain 필터 체인 객체
     * @throws IOException      입출력 예외
     * @throws ServletException 서블릿 예외
     */
    private void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {

        // logout 요청이 맞는지 검증
        String requestUri = request.getRequestURI();
        if (!requestUri.matches("/api/user/logout")) {
            filterChain.doFilter(request, response);
            return;
        }

        String requestMethod = request.getMethod();
        if (!requestMethod.equals("POST")) {
            filterChain.doFilter(request, response);
            return;
        }

        // get refresh token
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
            }
        }

        // refresh null check
        if (Objects.isNull(refresh)) {
            throw new CustomException(ErrorCode.REFRESH_TOKEN_MISSING);
        }

        // expired check
        jwtUtil.isExpired(refresh);

        String category = jwtUtil.getCategory(refresh);
        if (!category.equals("refreshToken")) {
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // DB에 저장되어 있는지 확인
        // DB에 없으면 => 로그아웃 한 상태
        boolean isExist = Objects.nonNull(redisRefreshRepository.find(refresh));
        if (!isExist) {
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // 로그아웃 수행: 데이터베이스와 클라이언트 쿠키에서 리프레시 토큰 삭제
        redisRefreshRepository.delete(refresh);
        Cookie cookie = new Cookie("refresh", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
