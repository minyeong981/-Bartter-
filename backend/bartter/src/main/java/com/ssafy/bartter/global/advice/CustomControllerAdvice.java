package com.ssafy.bartter.global.advice;

import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class CustomControllerAdvice {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleException(Exception exception) {
        log.error("",exception);
        return ErrorResponse.of(new CustomException(ErrorCode.SERVER_ERROR, "서버 에러가 발생했습니다."));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ErrorResponse handleReadableException(Exception exception) {
        log.error("",exception);
        return ErrorResponse.of(new CustomException(ErrorCode.BAD_REQUEST));
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException exception) {
        log.error("", exception);
        return ResponseEntity.status(exception.getErrorCode().getStatus())
                .body(ErrorResponse.of(exception));
    }
}
