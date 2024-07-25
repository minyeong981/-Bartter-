package com.ssafy.bartter.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;


@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // Common - 1000
    SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 9999, "서버 에러입니다. 관리자에게 문의해주세요"),
    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, 1000, "올바르지 않는 입력 값 입니다. 다시 한번 확인해주세요"),
    EMPTY_FILE(HttpStatus.BAD_REQUEST, 1003, "빈 파일입니다."),
    FAIL_TO_CREATE_FILE(HttpStatus.INTERNAL_SERVER_ERROR, 1004, "파일 생성에 실패했습니다."),
    FAIL_TO_DELETE_FILE(HttpStatus.INTERNAL_SERVER_ERROR, 1005, "파일 삭제에 실패했습니다."),
    NOT_SUPPORTED_EXTENSION(HttpStatus.BAD_REQUEST, 1006, "지원하지 않는 파일 확장자입니다.")

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
