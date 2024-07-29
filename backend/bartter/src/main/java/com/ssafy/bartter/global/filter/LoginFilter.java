package com.ssafy.bartter.global.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.bartter.auth.dto.AuthUserDetails;
import com.ssafy.bartter.auth.dto.RefreshTokenDto;
import com.ssafy.bartter.auth.dto.UserAuthDto;
import com.ssafy.bartter.auth.entity.Refresh;
import com.ssafy.bartter.auth.repository.RefreshRepository;
import com.ssafy.bartter.auth.utils.CookieUtil;
import com.ssafy.bartter.auth.utils.JwtUtil;
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
import java.util.Date;
import java.util.Iterator;


/**
 * user 의 login 요청을 검증하는 클래스
 *
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
        UserAuthDto userAuthDto;
        try {
            userAuthDto = mapper.readValue(request.getInputStream(), UserAuthDto.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        String username = userAuthDto.getUsername();
        String password = userAuthDto.getPassword();
        log.debug("username : {}", username);
        log.debug("password : {}", password);
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

        // Refresh 토큰 저장
        saveRefreshToken(username, refresh, 86400000L);

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
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        // 401 error
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        System.out.println("unsuccessful authentication");
    }

    private void saveRefreshToken(String username, String refresh, Long expiredMs) {
        Date date = new Date(System.currentTimeMillis() + expiredMs);
        Refresh refreshEntity = Refresh.builder()
                .username(username)
                .refresh(refresh)
                .expiration(date.toString())
                .build();

        // db에 토큰 저장
        refreshRepository.save(refreshEntity);
    }

}
