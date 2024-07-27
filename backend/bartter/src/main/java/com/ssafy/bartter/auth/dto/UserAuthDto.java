package com.ssafy.bartter.auth.dto;

/**
 * User 인증을 위한 Record 타입 Dto
 *
 * @author 김훈민
 */
public record UserAuthDto(String username, String password) {
}
