package com.ssafy.bartter.domain.search.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.search.dto.SearchDto.Delete;
import com.ssafy.bartter.domain.search.repository.RedisSearchLogRepository;
import com.ssafy.bartter.domain.search.service.SearchService;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.SuccessResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {

    private final RedisSearchLogRepository redisSearchLogRepository;
    private final SearchService searchService;

    @GetMapping("")
    public SuccessResponse<List<String>> getSearchList(
            @RequestParam(value = "keyword", required = false) String keyword,
            @CurrentUser UserAuthDto user) {
        searchService.saveRecentSearchKeyword(keyword, user.getUsername());
        searchService.searchByKeyword(keyword);

        return SuccessResponse.of(null);
    }

    @GetMapping("/recent")
    public SuccessResponse<List<String>> getRecentSearchTerm(@CurrentUser UserAuthDto user) {
        return SuccessResponse.of(searchService.getRecentSearchKeyword(user.getUsername()));
    }

    @DeleteMapping("/recent")
    public SuccessResponse<Void> deleteRecentSearchTerm(
            @Valid @RequestBody Delete delete,
            BindingResult bindingResult,
            @CurrentUser UserAuthDto user) {
        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, "삭제 할 키워드가 존재하지않습니다.");
        }
        searchService.deleteRecentSearchKeyword(delete.getKeyword(), user.getUsername());
        return SuccessResponse.empty();
    }
}
