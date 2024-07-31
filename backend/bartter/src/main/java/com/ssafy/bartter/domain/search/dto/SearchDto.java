package com.ssafy.bartter.domain.search.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

public class SearchDto {

    public static int SEARCH_KEYWORD_SIZE = 10;

    @Data
    public static class SearchLog implements Serializable {
        private String keyword;
        private String createdAt;

        public static SearchLog of(String keyword, String createdAt) {
            SearchLog searchLog = new SearchLog();
            searchLog.keyword = keyword;
            searchLog.createdAt = createdAt;
            return searchLog;
        }
    }
}
