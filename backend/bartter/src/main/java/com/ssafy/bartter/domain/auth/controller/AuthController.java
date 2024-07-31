package com.ssafy.bartter.domain.auth.controller;

import com.ssafy.bartter.domain.auth.repository.RefreshRepository;
import com.ssafy.bartter.domain.auth.utils.CookieUtil;
import com.ssafy.bartter.domain.auth.utils.JwtUtil;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.SuccessResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final JwtUtil jwtUtil;
    private final RefreshRepository refreshRepository;
    private final CookieUtil cookieUtil;

    @PostMapping("/reissue")
    public SuccessResponse<Void> reissue(HttpServletRequest request, HttpServletResponse response) {
        log.info("reissue");
        // get refresh token
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
            }
        }
        log.debug("refresh : {}", refresh);
        if (refresh == null) {
            // response status code
            throw new CustomException(ErrorCode.REFRESH_TOKEN_MISSING);
        }

        // expired check
        jwtUtil.isExpired(refresh);

        // 토큰이 refresh 인지 확인
        String category = jwtUtil.getCategory(refresh);
        if (!category.equals("refreshToken")) {
            // response status code
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        // DB에 저장되어 있는지 확인
        boolean isExist = Objects.nonNull(refreshRepository.find(refresh));
        if (!isExist) {
            // response body
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        String username = jwtUtil.getUsername(refresh);
        String role = jwtUtil.getRole(refresh);
        int userId = jwtUtil.getUserId(refresh);

        // make new JWT
        String newAccess = jwtUtil.generateToken("accessToken", username, userId, role, 600000L); // 10m
        // rotate refresh
        String newRefresh = jwtUtil.generateToken("refreshToken", username, userId, role, 864600000L);

        //Refresh 토큰 저장 DB에 기존의 Refresh 토큰 삭제 후 새 Refresh 토큰 저장
        refreshRepository.save(username, newRefresh, 86400000L);

        // response
        response.setHeader("Authorization", newAccess);
        response.addCookie(cookieUtil.createCookie("refresh", newRefresh));

        return SuccessResponse.empty();
    }
}
