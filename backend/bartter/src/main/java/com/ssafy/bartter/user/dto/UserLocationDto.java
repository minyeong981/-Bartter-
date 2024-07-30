package com.ssafy.bartter.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 사용자로부터 받은 위치 정보를 담는 DTO 클래스
 *
 * @author 김훈민
 */
@Getter
@AllArgsConstructor
public class UserLocationDto {

    @NotNull(message = "위도는 필수 입력 값입니다.")
    private Double latitude;

    @NotNull(message = "경도는 필수 입력 값입니다.")
    private Double longitude;
}
