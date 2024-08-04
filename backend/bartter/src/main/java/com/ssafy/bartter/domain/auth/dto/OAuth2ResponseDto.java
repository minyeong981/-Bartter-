package com.ssafy.bartter.domain.auth.dto;


import com.ssafy.bartter.domain.user.entity.Provider;
import lombok.Getter;

import java.util.Map;

@Getter
public class OAuth2ResponseDto {
    private final Provider provider;
    private final String providerId;
    private final String email;
    private final String nickname;
    private final String profileImg;

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
