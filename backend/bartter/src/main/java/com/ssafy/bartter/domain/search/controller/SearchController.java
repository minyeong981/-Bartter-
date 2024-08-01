package com.ssafy.bartter.domain.search.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.search.dto.SearchDto.Delete;
import com.ssafy.bartter.domain.search.dto.SearchDto.SimpleKeywordList;
import com.ssafy.bartter.domain.search.service.SearchService;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "통합검색 API", description = "물물교환/커뮤니티/유저 통합검색 API")
public class SearchController {

    private final SearchService searchService;

    @GetMapping("")
    @Operation(summary = "통합검색", description = "키워드가 들어간 물물교환 게시글 2개, 커뮤니티 게시글 2개, 유저 정보5개")
    public SuccessResponse<SimpleKeywordList> getSearchList(
            @RequestParam(value = "keyword", required = false) String keyword,
            @CurrentUser UserAuthDto user) {
        if(keyword == null){
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, "키워드를 입력해주세요");
        }
        searchService.saveRecentSearchKeyword(keyword, user.getUsername());
        SimpleKeywordList keywordList = searchService.searchByTotalKeyword(keyword, user.getId());

        return SuccessResponse.of(keywordList);
    }

    @GetMapping("/recent")
    @Operation(summary = "최근 검색어 목록", description = "가장 촤근 검색한 단어(최대 10개)를 리턴한다. ")
    public SuccessResponse<List<String>> getRecentSearchTerm(@CurrentUser UserAuthDto user) {
        return SuccessResponse.of(searchService.getRecentSearchKeyword(user.getUsername()));
    }

    @DeleteMapping("/recent")
    @Operation(summary = "최근 검색어 삭제", description = "검색한 단어를 삭제한다.")
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
