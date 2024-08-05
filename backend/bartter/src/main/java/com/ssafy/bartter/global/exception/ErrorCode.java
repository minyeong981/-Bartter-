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
    LOCATION_NOT_FOUND(HttpStatus.NOT_FOUND, 1006, "해당 위치를 찾을 수 없습니다."),
    IMAGE_NOT_ADDED(HttpStatus.BAD_REQUEST, 1007, "이미지를 첨부해야 합니다."),
    BAD_REQUEST(HttpStatus.BAD_REQUEST, 1008, "잘못된 요청입니다. 요청을 확인해주세요."),

    // Auth & User - 2000
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, 2000, "해당 ID의 사용자를 찾을 수 없습니다."),
    ACCESS_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, 2001, "만료된 액세스 토큰입니다."),
    REFRESH_TOKEN_MISSING(HttpStatus.BAD_REQUEST, 2002, "리프레시 토큰이 누락되었습니다."),
    REFRESH_TOKEN_EXPIRED(HttpStatus.BAD_REQUEST, 2003, "리프레시 토큰이 만료되었습니다."),
    INVALID_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, 2004, "유효하지 않은 리프레시 토큰입니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, 2005, "인증에 실패하였습니다."),
    USER_ALREADY_EXISTS(HttpStatus.CONFLICT, 2006, "이미 존재하는 사용자입니다."),
    USER_LOCATION_NOT_FOUND(HttpStatus.NOT_FOUND, 2007, "사용자의 위치 정보를 찾을 수 없습니다."),
    UNAUTHENTICATED(HttpStatus.UNAUTHORIZED, 2008, "접근 권한이 없습니다."),
    ACCESS_TOKEN_MISSING(HttpStatus.BAD_REQUEST, 2009, "액세스 토큰이 누락되었습니다."),
    USER_ACCOUNT_DEACTIVATED(HttpStatus.FORBIDDEN, 2010, "탈퇴한 회원입니다."),
    FOLLOW_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, 2011 , "이미 팔로우 한 회원입니다."),
    FOLLOW_SELF_NOT_ALLOWED(HttpStatus.BAD_REQUEST, 2012, "자기 자신을 팔로우할 수 없습니다."),
    UNFOLLOW_SELF_NOT_ALLOWED(HttpStatus.BAD_REQUEST, 2013, "자기 자신을 언팔로우할 수 없습니다."),
    FOLLOW_NOT_EXIST(HttpStatus.BAD_REQUEST, 2014, "팔로우한 적 없는 대상입니다."),

    // Crop - 3000
    CROP_NOT_FOUND(HttpStatus.NOT_FOUND, 3000, "해당 ID의 농작물을 찾을 수 없습니다."),
    CROP_CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, 3001, "해당 ID의 농작물 카테고리를 찾을 수 없습니다."),

    // Diary - 4000
    CROP_DIARY_NOT_FOUND(HttpStatus.NOT_FOUND, 4000, "해당 ID의 농사일지를 찾을 수 없습니다."),

    // Community - 5000
    COMMUNITY_POST_NOT_FOUND(HttpStatus.NOT_FOUND, 5000, "해당 ID의 동네모임 게시글을 찾을 수 없습니다."),
    COMMUNITY_POST_COMMENT_NOT_FOUND(HttpStatus.NOT_FOUND, 5001, "해당 ID의 동네모임 게시글 댓글을 찾을 수 없습니다."),
    COMMUNITY_POST_LIKE_NOT_FOUND(HttpStatus.NOT_FOUND, 5001, "해당 게시글에 누른 좋아요가 없습니다."),
    COMMUNITY_POST_LIKE_ALREADY_EXISTS(HttpStatus.NOT_FOUND, 5001, "해당 게시글에 이미 좋아요를 눌렀습니다."),

    // Trade - 6000
    TRADE_POST_NOT_FOUND(HttpStatus.NOT_FOUND,6000,"해당 ID의 물물교환 게시글을 찾을 수 없습니다." ),
    TRADE_POST_INVALID_REQUEST(HttpStatus.BAD_REQUEST, 6001, "해당 ID의 물물교환 게시글을 찾을 수 없거나 게시글 작성자가 아닙니다."),
    TRADE_POST_LIKE_EXIST(HttpStatus.BAD_REQUEST, 6002," 사용자가 해당 물물교환 게시글을 이미 좋아요 했습니다. "),
    TRADE_POST_LIKE_NOT_FOUND(HttpStatus.NOT_FOUND,6003,"사용자가 해당 물물교환 게시글을 좋아요하지 않았습니다."),
    TRADE_POST_SAME_STATUS(HttpStatus.BAD_REQUEST, 6004, "해당 물물교환 게시글에 대한 잘못된 상태 변경 요청입니다."),

    // Report - 7000
    CROP_REPORT_NOT_FOUND(HttpStatus.NOT_FOUND,7000,"해당 ID의 AI 요약 리포트를 찾을 수 없습니다.")

    // Chat

    ;

    private final HttpStatus status;
    private final int code;
    private final String message;
}
