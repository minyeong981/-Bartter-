package com.ssafy.bartter.global.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.bartter.auth.dto.UserAuthDto;
import com.ssafy.bartter.auth.repository.RefreshRepository;
import com.ssafy.bartter.auth.utils.CookieUtil;
import com.ssafy.bartter.auth.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
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
 *
 * @author 김훈민
 */
@RequiredArgsConstructor
public class LoginFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;
    private final RefreshRepository refreshRepository;

    // 인증을 진행하는 메서드
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        // JSON 요청 본문을 UserAuthDto 로 파싱
        ObjectMapper mapper = new ObjectMapper();
        UserAuthDto loginRequest;
        try {
            loginRequest = mapper.readValue(request.getInputStream(), UserAuthDto.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String username = loginRequest.username();
        String password = loginRequest.password();

        System.out.println("username : " + username);
        System.out.println("password : " + password);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password, null);

        return authenticationManager.authenticate(authToken);
    }

    // 로그인 성공시 실행 메서드
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {

        String username = authentication.getName();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority grantedAuthority = iterator.next();
        String role = grantedAuthority.getAuthority();

        // 토큰 생성
        String access = jwtUtil.generateToken("accessToken", username, role, 600000L); // 10m
        String refresh = jwtUtil.generateToken("refreshToken", username, role, 864600000L); // 1d

        // Refresh 토큰 저장
//        addRefreshEntity(username, refresh, 86400000L);

        // 응답 설정
        response.setHeader("accessToken", access);
        response.addCookie(cookieUtil.createCookie("refresh", refresh));
        response.setStatus(HttpStatus.OK.value());
    }

    // 로그인 실패시 실행 메서드
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        // 401 error
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        System.out.println("unsuccessful authentication");
    }

}
