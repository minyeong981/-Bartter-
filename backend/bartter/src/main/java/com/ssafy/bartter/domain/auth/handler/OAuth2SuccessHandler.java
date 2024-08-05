package com.ssafy.bartter.domain.auth.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.bartter.domain.auth.config.JwtConfig;
import com.ssafy.bartter.domain.auth.dto.CustomOAuth2User;
import com.ssafy.bartter.domain.auth.repository.RedisRefreshRepository;
import com.ssafy.bartter.domain.auth.utils.CookieUtil;
import com.ssafy.bartter.domain.auth.utils.JwtUtil;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.ErrorResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;
    private final JwtConfig jwtConfig;
    private final RedisRefreshRepository refreshRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.debug("onAuthenticationSuccess");
        // OAuth2User
        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String username = customOAuth2User.getUsername();
        int userId = customOAuth2User.getUserId();
        String nickname = customOAuth2User.getName();
        String profileImage = customOAuth2User.getProfileImage();
        boolean isTemporaryUser = customOAuth2User.isTemporaryUser();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();
        // TODO : 배포시 변경 필요
        if (isTemporaryUser) {
            // Generate token and add it to the cookie
            String token = jwtUtil.generateToken("oauthToken", username, userId, role, jwtConfig.getRefreshTokenExpiration());
            response.addCookie(cookieUtil.createCookie("OAuth", token));

            // Create custom error response
            CustomException customException = new CustomException(ErrorCode.FIRST_LOGIN_REDIRECT);
            ErrorResponse errorResponse = ErrorResponse.of(customException);

            // JSON 응답 작성
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            // 객체를 JSON 문자열로 변환하여 응답 본문에 작성
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonResponse = objectMapper.writeValueAsString(errorResponse);
            response.getWriter().write(jsonResponse);
        }
        else {
            // 토큰 생성
            String access = jwtUtil.generateToken("accessToken", username, userId, role, jwtConfig.getAccessTokenExpiration());
            String refresh = jwtUtil.generateToken("refreshToken", username, userId, role, jwtConfig.getRefreshTokenExpiration());

            // Refresh 토큰 저장
            refreshRepository.save(username, refresh, jwtConfig.getRefreshTokenExpiration());

            // 응답 설정
            response.setHeader("Authorization", "Bearer " + access);
            response.addCookie(cookieUtil.createCookie("refresh", refresh));
            response.setStatus(HttpStatus.OK.value());
        }
    }

}
