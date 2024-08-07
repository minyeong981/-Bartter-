package com.ssafy.bartter.domain.auth.dto;


import com.ssafy.bartter.domain.user.entity.Provider;
import lombok.Getter;

import java.util.Map;

/**
 * OAuth2 인증 응답 데이터를 담는 DTO 클래스.
 *
 * @author 김훈민
 */
@Getter
public class OAuth2ResponseDto {

    /**
     * OAuth2 공급자 정보.
     */
    private final Provider provider;

    /**
     * OAuth2 공급자로부터 받은 사용자 ID.
     */
    private final String providerId;

    /**
     * 사용자 이메일.
     */
    private final String email;

    /**
     * 사용자 닉네임.
     */
    private final String nickname;

    /**
     * 사용자 프로필 이미지 URL.
     */
    private final String profileImg;


    /**
     * OAuth2 인증 응답 데이터를 기반으로 OAuth2ResponseDto 객체를 생성합니다.
     *
     * @param attributes OAuth2 공급자로부터 받은 사용자 정보가 담긴 Map 객체.
     */
    public OAuth2ResponseDto(Map<String, Object> attributes) {
        this.provider = Provider.KAKAO;
        this.providerId = attributes.get("id").toString();

        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        this.email = kakaoAccount.get("email").toString();

        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
        this.nickname = profile.get("nickname").toString();
        this.profileImg = profile.get("profile_image_url").toString();
    }
}
