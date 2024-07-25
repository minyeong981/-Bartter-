package com.ssafy.bartter.global.response;

import org.springframework.http.HttpStatus;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import java.util.ArrayList;
import java.util.List;

/**
 * 에러 발생시 리턴 할 에러 응답 객체
 *
 * @author 김용수
 */
public class ErrorResponse extends BaseResponse<Void> {

    /**
     * 생성자
     *
     * @param isSuccess 응답 성공 여부
     * @param code      응답 코드
     * @param message   응답 메시지
     */
    public ErrorResponse(boolean isSuccess, int code, String message, Errors errors) {
        super(isSuccess, code, message);
        super.errors = parseErrors(errors);
    }

    /**
     * 에러가 담긴 응답 객체를 만들어주는 메서드
     *
     * @param exception 예외
     * @return 에러 응답 객체
     */
    public static ErrorResponse of(Exception exception) {
        return new ErrorResponse(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), exception.getMessage(), null);
    }

    /**
     * 전달 받은 Errors 커스텀에러로 파싱해주는 메서드
     *
     * @param errors Error 담긴 객체
     * @return CustomError 리스트
     */
    private List<CustomError> parseErrors(Errors errors) {
        List<CustomError> customErrors = new ArrayList<>();
        if (errors == null) return customErrors;

        // 유효성 검사 실패한 필드 정보 담기
        for (FieldError error : errors.getFieldErrors()) {
            customErrors.add(new CustomError(error.getField(), error.getCode(), error.getDefaultMessage(), error.getObjectName()));
        }

        // 객체 에러 정보 담기
        for (ObjectError error : errors.getGlobalErrors()) {
            customErrors.add(new CustomError(null, error.getCode(), error.getDefaultMessage(), error.getObjectName()));
        }
        return customErrors;
    }
}
