package com.ssafy.bartter.auth.utils;

import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Component;

/**
 * 쿠키 생성 등을 위한 클래스
 *
 * @author 김훈민
 */
@Component
public class CookieUtil {

    /**
     * 쿠키 생성 메서드
     *
     * @param name  쿠키 이름
     * @param value 쿠키 값
     * @param maxAge 쿠키 유효 기간 (초 단위)
     * @param httpOnly HTTPOnly 속성 설정 여부
     * @param secure Secure 속성 설정 여부 (HTTPS 사용 시)
     * @param path 쿠키 적용 경로
     * @return 생성된 쿠키
     */
    public Cookie createCookie(String name, String value, int maxAge, boolean httpOnly, boolean secure, String path) {
        Cookie cookie = new Cookie(name, value);
        cookie.setMaxAge(maxAge);
        cookie.setHttpOnly(httpOnly);
        cookie.setSecure(secure);
        cookie.setPath(path);
        return cookie;
    }

    /**
     * 기본 설정으로 쿠키 생성
     */
    public Cookie createCookie(String name, String value) {
        return createCookie(name, value, 24*60*60, true, false, "/");
    }
}
