package com.ssafy.bartter.domain.auth.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * User Login 을 위한 Dto
 *
 * @author 김훈민
 */
@Getter
@NoArgsConstructor
public class AuthUserLoginDto {
    /**
     * 사용자 아이디
     */
    private String username;

    /**
     * 사용자 비밀번호
     */
    private String password;
}
