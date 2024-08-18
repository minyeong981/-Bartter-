package com.ssafy.bartter.domain.auth.controller;

import com.ssafy.bartter.domain.auth.dto.OAuthTempUserInfoDto;
import com.ssafy.bartter.domain.auth.repository.RedisRefreshRepository;
import com.ssafy.bartter.domain.auth.config.JwtConfig;
import com.ssafy.bartter.domain.auth.utils.CookieUtil;
import com.ssafy.bartter.domain.auth.utils.JwtUtil;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.domain.user.services.UserService;
import com.ssafy.bartter.global.common.SimpleLocation;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;


/**
 * 인증과 관련된 요청을 처리하는 컨트롤러 클래스
 *
 * @author 김훈민
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Tag(name = "인증 API", description = "인증과 관련된 API입니다.")
public class AuthController {

    private final JwtConfig jwtConfig;
    private final JwtUtil jwtUtil;
    private final RedisRefreshRepository refreshRepository;
    private final CookieUtil cookieUtil;
    private final UserService userService;


    /**
     * 리프레시 토큰을 이용하여 새로운 액세스 토큰을 발행하는 메서드
     *
     * @param request  HttpServletRequest 객체
     * @param response HttpServletResponse 객체
     * @return 성공 여부를 나타내는 SuccessResponse 객체
     */
    @PostMapping("/reissue")
    @Operation(summary = "토큰 재발행", description = "리프레시 토큰을 이용하여 새로운 액세스 토큰을 발행합니다.")
    public SuccessResponse<Void> reissue(HttpServletRequest request, HttpServletResponse response) {
        log.info("reissue");
        // get refresh token
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
                break;
            }
        }

        // response status code
        if (refresh == null) {
            throw new CustomException(ErrorCode.REFRESH_TOKEN_MISSING);
        }

        // expired check
        jwtUtil.isExpired(refresh);

        // DB에 저장되어 있는지 확인
        if (Objects.nonNull(refreshRepository.find(refresh))) {
            throw new CustomException(ErrorCode.INVALID_REFRESH_TOKEN);
        }

        String username = jwtUtil.getUsername(refresh);
        String role = jwtUtil.getRole(refresh);
        int userId = jwtUtil.getUserId(refresh);

        // make new JWT
        generateAndSaveTokens(response, username, userId, role);

        return SuccessResponse.empty();
    }

    /**
     * OAuth 로그인 후 추가 정보를 저장하고 JWT 토큰을 발행하는 메서드
     *
     * @param request             HttpServletRequest 객체
     * @param response            HttpServletResponse 객체
     * @param locationRequestDto  위치 정보를 담은 DTO
     * @return 성공 여부를 나타내는 SuccessResponse 객체
     */
    @PostMapping("/additional-info")
    @Operation(summary = "추가 정보 저장", description = "OAuth 로그인 후 추가 정보를 저장하고 JWT 토큰을 발행합니다.")
    public SuccessResponse<?> saveAdditionalInfo(HttpServletRequest request, HttpServletResponse response, @Valid @RequestBody SimpleLocation.LocationRequestDto locationRequestDto) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            OAuthTempUserInfoDto userInfo = (OAuthTempUserInfoDto) session.getAttribute("userInfo");

            if (userInfo != null) {
                // 회원가입 진행
                User user = userService.registerKakaoUser(locationRequestDto, userInfo);
                String username = user.getUsername();
                String role = user.getRole().toString();

                // 세션 무효화
                session.invalidate();
                generateAndSaveTokens(response, username, user.getId(), role);
                return SuccessResponse.empty();
            }
        }
        throw new CustomException(ErrorCode.SESSION_EXPIRED_OR_NOT_FOUND);
    }


    /**
     * 새로운 JWT 토큰을 생성하고 응답에 저장하는 메서드
     *
     * @param response HttpServletResponse 객체
     * @param username 사용자 이름
     * @param userId   사용자 ID
     * @param role     사용자 역할
     */
    private void generateAndSaveTokens(HttpServletResponse response, String username, int userId, String role) {
        // make new JWT
        String newAccess = jwtUtil.generateToken("accessToken", username, userId, role, jwtConfig.getAccessTokenExpiration());
        // rotate refresh
        String newRefresh = jwtUtil.generateToken("refreshToken", username, userId, role, jwtConfig.getRefreshTokenExpiration());

        //Refresh 토큰 저장 DB에 기존의 Refresh 토큰 삭제 후 새 Refresh 토큰 저장
        refreshRepository.save(username, newRefresh, jwtConfig.getRefreshTokenExpiration());

        // response
        response.setHeader("Authorization", "Bearer " + newAccess);
        response.addCookie(cookieUtil.createCookie("refresh", newRefresh));
        response.setStatus(HttpStatus.OK.value());
    }
}
