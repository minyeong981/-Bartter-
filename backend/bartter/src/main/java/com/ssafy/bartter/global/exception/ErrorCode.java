package com.ssafy.bartter.global.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;


@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // Common - 1000
    SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 9999, "서버 에러입니다. 관리자에게 문의해주세요."),
    INVALID_INPUT_VALUE(HttpStatus.BAD_REQUEST, 1000, "올바르지 않은 입력 값입니다. 다시 한번 확인해주세요."),
    EMPTY_FILE(HttpStatus.BAD_REQUEST, 1001, "빈 파일입니다."),
    FAIL_TO_CREATE_FILE(HttpStatus.INTERNAL_SERVER_ERROR, 1002, "파일 생성에 실패했습니다."),
    FAIL_TO_DELETE_FILE(HttpStatus.INTERNAL_SERVER_ERROR, 1003, "파일 삭제에 실패했습니다."),
    NOT_SUPPORTED_EXTENSION(HttpStatus.BAD_REQUEST, 1004, "지원하지 않는 파일 확장자입니다."),
    INVALID_LOCATION(HttpStatus.BAD_REQUEST, 1005, "유효하지 않은 위치입니다."),

    // Auth & User - 2000
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, 2000, "해당 ID의 사용자를 찾을 수 없습니다."),

    // Crop - 3000
    CROP_NOT_FOUND(HttpStatus.NOT_FOUND, 3000, "해당 ID의 농작물을 찾을 수 없습니다."),
    CROP_CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, 3001, "해당 ID의 농작물 카테고리를 찾을 수 없습니다.")

    // Diary

    // Trade

    // Chat

    ;

    private final HttpStatus status;
    private final int code;
    private final String message;
}
