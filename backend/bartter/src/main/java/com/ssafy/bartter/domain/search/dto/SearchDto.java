package com.ssafy.bartter.domain.search.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;


public class SearchDto {

    public static int SEARCH_KEYWORD_SIZE = 10;

    @Data
    public static class Delete {
        @NotBlank(message = "삭제 할 키워드를 선택해주세요")
        private String keyword;
    }
}
