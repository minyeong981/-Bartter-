package com.ssafy.bartter.domain.search.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.community.dto.CommunityPostDto.SimpleCommunityPostDetail;
import com.ssafy.bartter.domain.community.entity.CommunityPost;
import com.ssafy.bartter.domain.search.dto.SearchDto.SimpleKeywordList;
import com.ssafy.bartter.domain.search.service.SearchService;
import com.ssafy.bartter.domain.trade.dto.TradePostDto.SimpleTradePostDetail;
import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.domain.user.dto.UserDto.SimpleUserProfile;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.util.StringUtils;
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
            @RequestParam(value = "keyword") String keyword,
            @CurrentUser UserAuthDto user) {
        if (keyword.trim().isEmpty()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, "키워드를 입력해주세요");
        }
        searchService.saveRecentSearchKeyword(keyword.trim(), user.getUsername());
        SimpleKeywordList keywordList = searchService.searchByTotalKeyword(keyword, user.getId());

        return SuccessResponse.of(keywordList);
    }

    @GetMapping("/trades")
    @Operation(summary = "물물교환 통합검색", description = "해당 키워드가 제목, 내용에 표시된 물물교환 게시글을 페이징해서 처리합니다.")
    public SuccessResponse<List<SimpleTradePostDetail>> getSearchTradePostList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @RequestParam(value = "keyword") String keyword,
            @CurrentUser UserAuthDto user
    ){
        String searchKeyword = keyword.trim();
        if(!StringUtils.hasText(searchKeyword)){
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, "키워드를 입력해주세요");
        }
        List<TradePost> keywordContainsTradePostList = searchService.searchTradePostByKeyword(page, limit, searchKeyword);
        List<SimpleTradePostDetail> simpleTradePostList = keywordContainsTradePostList.stream()
                .map(o -> SimpleTradePostDetail.of(o, user.getId())).toList();
        return SuccessResponse.of(simpleTradePostList);
    }

    @GetMapping("/users")
    @Operation(summary = "사용자 통합검색", description = "해당 키워드가 닉네임인 사용자들을 페이징해서 처리합니다.")
    public SuccessResponse<List<SimpleUserProfile>> getSearchUserList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @RequestParam(value = "keyword") String keyword,
            @CurrentUser UserAuthDto user
    ){
        String searchKeyword = keyword.trim();
        if(!StringUtils.hasText(searchKeyword)){
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, "키워드를 입력해주세요");
        }
        List<User> keywordContainsUserList = searchService.searchUserByKeyword(page, limit, searchKeyword);
        List<SimpleUserProfile> simpleUserList = keywordContainsUserList.stream()
                .map(SimpleUserProfile::of).toList();
        return SuccessResponse.of(simpleUserList);
    }

    @GetMapping("/community")
    @Operation(summary = "동네모임 통합검색", description = "해당 키워드가 제목 혹은 내용에 들어간 커뮤니티를 페이징해서 처리합니다.")
    public SuccessResponse<List<SimpleCommunityPostDetail>> getSearchCommunityList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @RequestParam(value = "keyword") String keyword,
            @CurrentUser UserAuthDto user
    ){
        String searchKeyword = keyword.trim();
        if(!StringUtils.hasText(searchKeyword)){
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, "키워드를 입력해주세요");
        }
        List<CommunityPost> keywordContainsCommunityList = searchService.searchCommunityByKeyword(page, limit, searchKeyword, user.getId());
        List<SimpleCommunityPostDetail> simpleCommunityPostList = keywordContainsCommunityList.stream()
                .map(o -> SimpleCommunityPostDetail.of(o, user.getId())).toList();
        return SuccessResponse.of(simpleCommunityPostList);
    }


    @GetMapping("/recent")
    @Operation(summary = "최근 검색어 목록", description = "가장 촤근 검색한 단어(최대 10개)를 리턴한다. ")
    public SuccessResponse<List<String>> getRecentSearchTerm(@CurrentUser UserAuthDto user) {
        return SuccessResponse.of(searchService.getRecentSearchKeyword(user.getUsername()));
    }

    @DeleteMapping("/recent")
    @Operation(summary = "최근 검색어 삭제", description = "검색한 단어를 삭제한다.")
    public SuccessResponse<Void> deleteRecentSearchTerm(
            @RequestParam("keyword") String keyword,
            @CurrentUser UserAuthDto user) {
        searchService.deleteRecentSearchKeyword(keyword, user.getUsername());
        return SuccessResponse.empty();
    }

}
