package com.ssafy.bartter.global.filter;

import com.ssafy.bartter.domain.auth.dto.AuthUserDetails;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.auth.utils.JwtUtil;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
        String accessToken = request.getHeader("Authorization");
        // 토큰이 없다면 다음 필터로 넘김
        if (accessToken == null) {
            filterChain.doFilter(request, response);
            return;
        }

        // 로그인 요청 URI 및 메서드 확인
        // TODO : 더 좋은 방법으로 처리 할 예정
//        String requestUri = request.getRequestURI();
//        String requestMethod = request.getMethod();
//        boolean isLoginRequest = requestUri.equals("/login") && requestMethod.equals("POST");
//        boolean isLocationRequest = requestUri.equals("/user/location") && requestMethod.equals("POST");
//        boolean isJoinRequest = requestUri.equals("/user/join") && requestMethod.equals("POST");
//        if (accessToken == null) {
//            if (isLoginRequest || isLocationRequest || isJoinRequest) {
//                filterChain.doFilter(request, response);
//                return;
//            }
//            throw new CustomException(ErrorCode.ACCESS_TOKEN_MISSING);
//        }



        // 토큰 만료 여부 확인
        accessToken = accessToken.substring(7);
        jwtUtil.isExpired(accessToken);

        // 토큰이 accessToken 인지 확인
        String category = jwtUtil.getCategory(accessToken);
        if (!category.equals("accessToken")) {
            PrintWriter writer = response.getWriter();
            writer.print("invalid access token");
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        UserAuthDto userAuthDto = UserAuthDto.builder()
                .id(jwtUtil.getUserId(accessToken))
                .username(jwtUtil.getUsername(accessToken))
                .role(jwtUtil.getRole(accessToken))
                .build();

        AuthUserDetails customUserDetails = new AuthUserDetails(userAuthDto);
        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);
        filterChain.doFilter(request, response);
    }
}
