package com.ssafy.bartter.global.exception;

import lombok.Getter;
import org.springframework.validation.Errors;

import java.util.Objects;

@Getter
public class CustomException extends RuntimeException{
    private final ErrorCode errorCode;
    private Errors errors;

    public CustomException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public CustomException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public CustomException(ErrorCode errorCode, Errors errors) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
        this.errors = errors;
    }

    public CustomException(ErrorCode errorCode, String message, Errors errors) {
        super(message);
        this.errorCode = errorCode;
        this.errors = errors;
    }

    public boolean hasErrors(){
        return Objects.nonNull(errors) && errors.hasErrors();
    }
}
