package com.ssafy.bartter.domain.auth.dto;

import lombok.Builder;
import lombok.Getter;

/**
 * Refresh Token 생성을 위한 Dto
 *
 * @author 김훈민
 */
@Getter
@Builder
public class RefreshTokenDto {
    private String username;
    private String refresh;
    private String expiration;
}
