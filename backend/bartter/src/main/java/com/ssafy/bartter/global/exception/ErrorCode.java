package com.ssafy.bartter.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;


@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    // Common
    SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 9999, "서버 에러입니다. 관리자에게 문의해주세요"),
    
    // Auth & User

    // Crop

    // Diary

    // Trade

    // Chat
    ;

    private final HttpStatus status;
    private final int code;
    private final String message;
}
