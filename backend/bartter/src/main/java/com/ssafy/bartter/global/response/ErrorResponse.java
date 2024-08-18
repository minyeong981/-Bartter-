package com.ssafy.bartter.global.response;

import com.ssafy.bartter.global.exception.CustomException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.validation.SimpleErrors;

import java.util.ArrayList;
import java.util.List;

/**
 * 에러 발생시 리턴 할 에러 응답 객체
 *
 * @author 김용수
 */
@Slf4j
public class ErrorResponse extends BaseResponse<Void> {

    public ErrorResponse(boolean isSuccess, int code, String message, Errors errors) {
        super(isSuccess, code, message);
        super.errors = parseErrors(errors);
    }

    public ErrorResponse(CustomException exception) {
        this(false, exception.getErrorCode().getCode(), exception.getMessage(), exception.getErrors());
    }

    public ErrorResponse(CustomException exception, String message) {
        this(false, 1, message, exception.getErrors());
    }

    public static ErrorResponse of(CustomException exception) {
        return new ErrorResponse(exception);
    }

    public static ErrorResponse of(CustomException exception, String message) {
        return new ErrorResponse(exception, message);
    }

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
        if (errors == null) return new ArrayList<>();

        // 유효성 검사 실패한 필드 정보 담기
        List<CustomError> customErrors = new ArrayList<>();
        for (FieldError error : errors.getFieldErrors()) {
            log.debug("{}", error);
            customErrors.add(new CustomError(error.getField(), error.getCode(), error.getDefaultMessage(), error.getObjectName()));
        }

        // 객체 에러 정보 담기
        for (ObjectError error : errors.getGlobalErrors()) {
            customErrors.add(new CustomError(null, error.getCode(), error.getDefaultMessage(), error.getObjectName()));
        }
        return customErrors;
    }
}
