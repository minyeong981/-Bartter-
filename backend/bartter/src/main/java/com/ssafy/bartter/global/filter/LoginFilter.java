package com.ssafy.bartter.global.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.bartter.domain.auth.dto.AuthUserDetails;
import com.ssafy.bartter.domain.auth.dto.AuthUserLoginDto;
import com.ssafy.bartter.domain.auth.repository.RefreshRepository;
import com.ssafy.bartter.domain.auth.utils.CookieUtil;
import com.ssafy.bartter.domain.auth.utils.JwtUtil;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.ErrorResponse;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;


/**
 * user 의 login 요청을 검증하는 클래스
 *
 * @author 김훈민
 */
@Slf4j
@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;
    private final RefreshRepository refreshRepository;

    /**
     * 사용자의 인증을 시도하는 메서드
     *
     * @param request  HttpServletRequest 객체
     * @param response HttpServletResponse 객체
     * @return 인증된 Authentication 객체
     * @throws AuthenticationException 인증 실패 시 예외 발생
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        ObjectMapper mapper = new ObjectMapper();
        AuthUserLoginDto authUserLoginDto;
        try {
            authUserLoginDto = mapper.readValue(request.getInputStream(), AuthUserLoginDto.class);
        } catch (IOException e) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, "잘못된 입력 값입니다.");
        }

        String username = authUserLoginDto.getUsername();
        String password = authUserLoginDto.getPassword();
        log.debug("username : {}", username);
        // TODO: ADMIN 권한 체크를 추가해야한다면 role 도 넘겨주어야 한다
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password, null);

        return authenticationManager.authenticate(authToken);
    }

    /**
     * 인증 성공 시 호출되는 메서드
     * 성공적인 인증 후 JWT 토큰을 생성함
     *
     * @param request        HttpServletRequest 객체
     * @param response       HttpServletResponse 객체
     * @param chain          FilterChain 객체
     * @param authentication 인증 객체
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {
        AuthUserDetails authUserDetails = (AuthUserDetails) authentication.getPrincipal();
        String username = authUserDetails.getUsername();
        int userId = authUserDetails.getUserId();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority grantedAuthority = iterator.next();
        String role = grantedAuthority.getAuthority();

        // 토큰 생성
        String access = jwtUtil.generateToken("accessToken", username, userId, role, 600000L); // 10m
        String refresh = jwtUtil.generateToken("refreshToken", username, userId, role, 864600000L); // 1d

        // TODO: 시간 application.properties
        // Refresh 토큰 저장
        refreshRepository.save(username, refresh, 864600000L);

        // 응답 설정
        response.setHeader("Authorization", "Bearer " + access);
        response.addCookie(cookieUtil.createCookie("refresh", refresh));
        response.setStatus(HttpStatus.OK.value());
    }

    /**
     * 인증 실패 시 호출되는 메서드
     * 인증에 실패한 경우 401 상태 코드를 설정하여 응답
     *
     * @param request  HttpServletRequest 객체
     * @param response HttpServletResponse 객체
     * @param failed   AuthenticationException 객체
     */
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {
        log.error("인증 실패: {}", failed.getMessage());
        // ErrorResponse 객체 생성
        CustomException customException = new CustomException(ErrorCode.UNAUTHORIZED, failed.getMessage());
        ErrorResponse errorResponse = ErrorResponse.of(customException);

        // JSON 응답 작성
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        // 객체를 JSON 문자열로 변환하여 응답 본문에 작성
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse = objectMapper.writeValueAsString(errorResponse);
        response.getWriter().write(jsonResponse);
    }
}
