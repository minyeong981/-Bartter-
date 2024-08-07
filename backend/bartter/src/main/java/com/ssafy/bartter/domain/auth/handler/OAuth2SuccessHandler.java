package com.ssafy.bartter.domain.auth.handler;

import com.ssafy.bartter.domain.auth.config.JwtConfig;
import com.ssafy.bartter.domain.auth.dto.CustomOAuth2User;
import com.ssafy.bartter.domain.auth.dto.OAuthTempUserInfoDto;
import com.ssafy.bartter.domain.auth.repository.RedisRefreshRepository;
import com.ssafy.bartter.domain.auth.utils.CookieUtil;
import com.ssafy.bartter.domain.auth.utils.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

/**
 * OAuth2 인증 성공 핸들러 클래스
 * OAuth2 인증이 성공한 후 사용자 정보를 처리하고 JWT 토큰을 생성하여 응답
 * 임시 사용자일 경우 세션에 사용자 정보를 저장하고 에러 던짐
 *
 * @author 김훈민
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;
    private final JwtConfig jwtConfig;
    private final RedisRefreshRepository refreshRepository;

    @Value("${app.domain.url}")
    private String domainUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.debug("onAuthenticationSuccess");
        // OAuth2User
        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String username = customOAuth2User.getUsername();
        int userId = customOAuth2User.getUserId();
        String nickname = customOAuth2User.getName();
        String profileImage = customOAuth2User.getProfileImage();
        String email = customOAuth2User.getEmail();
        boolean isTemporaryUser = customOAuth2User.isTemporaryUser();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        if (isTemporaryUser) {
            // 세션에 사용자 정보 저장
            OAuthTempUserInfoDto userInfo = OAuthTempUserInfoDto.create(username, nickname, profileImage, email, role);
            request.getSession(true).setAttribute("userInfo", userInfo);
            log.debug("userInfo: {}", userInfo);
            // 세션 타임아웃 설정 (5분)
            request.getSession().setMaxInactiveInterval(300);

            response.sendRedirect(domainUrl + "/signup/additional?issignup=true");
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

            response.sendRedirect(domainUrl);
        }
    }

}
