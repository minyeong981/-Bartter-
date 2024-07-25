package com.ssafy.bartter.global.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.Gson;
import lombok.Getter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

/**
 * 응답 형식
 *
 * @param <T> 응답 데이터 형식
 * @author 김용수
 */
@Getter
@ToString
public abstract class BaseResponse<T> {
    /**
     * 성공 여부
     */
    @Getter(onMethod_ = @JsonProperty("isSuccess"))
    private boolean isSuccess;

    /**
     * 응답 코드
     */
    private int code;

    /**
     * 응답 메시지
     */
    private String message;

    /**
     * 응답 데이터
     */
    protected T data;

    /**
     * 에러 리스트
     */
    protected List<CustomError> errors;
    
    public BaseResponse(boolean isSuccess, int code, String message) {
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
        this.data = null;
        this.errors = new ArrayList<>();
    }

    /**
     * Json으로 변환 -> 추후 테스트 코드를 위해 존재
     *
     * @return 문자열로 변환된 객체
     */
    public String toJson() {
        return new Gson().toJson(this);
    }
}
