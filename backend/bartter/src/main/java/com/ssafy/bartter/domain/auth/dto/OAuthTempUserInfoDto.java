package com.ssafy.bartter.domain.auth.dto;


import lombok.Builder;
import lombok.Getter;

/**
 * 사용자 위치 정보를 받기 전까지
 * OAuth 인증 과정에서 임시로 저장되는 사용자 정보를 담는 클래스.
 *
 * @author 김훈민
 */
@Getter
@Builder
public class OAuthTempUserInfoDto {
    /**
     * 사용자의 이름.
     */
    private String username;

    /**
     * 사용자의 닉네임.
     */
    private String nickname;

    /**
     * 사용자의 프로필 이미지 URL.
     */
    private String profileImage;

    /**
     * 사용자의 이메일 주소.
     */
    private String email;

    /**
     * 사용자의 권한.
     */
    private String role;

    /**
     * OAuthTempUserInfoDto 객체를 생성하는 정적 팩토리 메서드.
     *
     * @param username     사용자의 이름.
     * @param nickname     사용자의 닉네임.
     * @param profileImage 사용자의 프로필 이미지 URL.
     * @param email        사용자의 이메일 주소.
     * @param role         사용자의 권한.
     * @return OAuthTempUserInfoDto 객체.
     */
    public static OAuthTempUserInfoDto create(String username, String nickname, String profileImage, String email, String role) {
        return OAuthTempUserInfoDto.builder()
                .username(username)
                .nickname(nickname)
                .profileImage(profileImage)
                .email(email)
                .role(role)
                .build();
    }
}
