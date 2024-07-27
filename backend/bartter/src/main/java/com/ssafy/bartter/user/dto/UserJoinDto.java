package com.ssafy.bartter.user.dto;

import com.ssafy.bartter.user.entity.Gender;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class UserJoinDto {
    private String username;  // 사용자 아이디
    private String password;  // 사용자 비밀번호
    private String nickname;  // 사용자 닉네임
    private LocalDate birth;     // 사용자 생년월일 (형식: "yyyy-MM-dd")
    private Gender gender;    // 사용자 성별 ("F" 또는 "M")
    private double latitude; // 위도
    private double longitude; // 경도
    private String phone;     // 사용자 핸드폰 번호
    private String email;     // 사용자 이메일
}
