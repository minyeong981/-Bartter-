package com.ssafy.bartter.domain.user.dto;

import com.ssafy.bartter.domain.user.entity.Gender;
import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * 사용자의 회원가입 정보를 담는 DTO 클래스
 *
 * @author 김훈민
 */
@Data
public class UserJoinDto {

    /**
     * 사용자 아이디 (최소 8글자 이상)
     */
    @NotNull(message = "아이디를 입력하세요.")
    @Size(min = 8, message = "아이디는 최소 8글자 이상이어야 합니다.")
    private String username;

    /**
     * 사용자 비밀번호
     */
    @NotBlank(message = "비밀번호를 입력하세요.")
    @Pattern(
            regexp = "^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$",
            message = "비밀번호는 최소 8자 이상이어야 하며, 영문자, 숫자, 특수문자를 포함해야 합니다."
    )
    private String password;

    /**
     * 사용자 닉네임
     */
    @NotNull(message = "닉네임을 입력하세요.")
    private String nickname;

    /**
     * 사용자 생년월일 (형식: "yyyy-MM-dd")
     */
    @NotNull(message = "생년월일을 입력하세요.")
    private LocalDate birth;

    /**
     * 사용자 성별 ("F" 또는 "M")
     */
    @NotNull(message = "성별을 입력하세요.")
    private Gender gender;

    /**
     * 사용자의 위치 정보 - 위도
     */
    @NotNull(message = "위도 정보를 입력하세요.")
    private double latitude;

    /**
     * 사용자의 위치 정보 - 경도
     */
    @NotNull(message = "경도 정보를 입력하세요.")
    private double longitude;

    /**
     * 사용자 핸드폰 번호
     * 11글자가 되어야 한다
     */
    @NotNull(message = "핸드폰 번호를 입력하세요.")
    @Pattern(regexp = "^\\d{11}$", message = "핸드폰 번호는 11글자 숫자여야 합니다.")
    private String phone;

    /**
     * 사용자 이메일
     */
    @Email(message = "유효한 이메일 형식이 아닙니다.")
    private String email;
}