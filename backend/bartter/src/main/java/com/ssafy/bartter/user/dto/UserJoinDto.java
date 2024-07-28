package com.ssafy.bartter.user.dto;

import com.ssafy.bartter.user.entity.Gender;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

/**
 * 사용자의 회원가입 정보를 담는 DTO 클래스
 *
 * @author 김훈민
 */
@Getter
@Builder
public class UserJoinDto {

    /**
     * 사용자 아이디
     */
    private String username;

    /**
     * 사용자 비밀번호
     */
    private String password;

    /**
     * 사용자 닉네임
     */
    private String nickname;

    /**
     * 사용자 생년월일 (형식: "yyyy-MM-dd")
     */
    private LocalDate birth;

    /**
     * 사용자 성별 ("F" 또는 "M")
     */
    private Gender gender;

    /**
     * 사용자의 위치 정보 - 위도
     */
    private double latitude;

    /**
     * 사용자의 위치 정보 - 경도
     */
    private double longitude;

    /**
     * 사용자 핸드폰 번호
     */
    private String phone;

    /**
     * 사용자 이메일
     */
    private String email;
}