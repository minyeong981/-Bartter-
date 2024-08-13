package com.ssafy.bartter.domain.user.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.community.dto.CommunityPostDto;
import com.ssafy.bartter.domain.community.entity.CommunityPost;
import com.ssafy.bartter.domain.trade.dto.TradePostDto;
import com.ssafy.bartter.domain.trade.dto.TradePostDto.SimpleTradePostDetail;
import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.domain.trade.services.TradePostService;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@Tag(name = "유저 작성 물물교환 게시글 조회 API", description = "특정 유저의 물물교환 게시글을 조회하는 API 입니다.")
public class UserTradePostController {

    private final TradePostService tradePostService;

    @Operation(summary = "현재 유저가 작성한 동네모임 게시글 페이징 조회", description = "유저의 PK를 통해 유저가 작성한 동네모임 게시글 전체를 조회한다.")
    @GetMapping("/{userId}/trades/posts")
    public SuccessResponse<List<SimpleTradePostDetail>> getTradePostListById(
            @PathVariable("userId") int userId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @CurrentUser UserAuthDto user
    ) {
        List<TradePost> tradePostList = tradePostService.getTradePostListById(page, limit, user.getId());
        List<SimpleTradePostDetail> simpleTradePostList = tradePostList.stream()
                .map(o -> SimpleTradePostDetail.of(o, user.getId())).toList();
        return SuccessResponse.of(simpleTradePostList);
    }

    @Operation(summary = "현재 유저가 좋아요한 물물교환 게시글 조회", description = "현재 접속중인 사용자가 좋아요한 물물교환 게시글을 조회한다.")
    @GetMapping("/{userId}/trades/posts/likes")
    public SuccessResponse<List<SimpleTradePostDetail>> getTradePostLikeList(
            @PathVariable("userId") int userId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @CurrentUser UserAuthDto user
    ) {
        List<TradePost> tradePostList = tradePostService.getTradePostLikeList(page, limit, user.getId());
        List<SimpleTradePostDetail> simpleTradePostList = tradePostList.stream()
                .map(o -> SimpleTradePostDetail.of(o, user.getId())).toList();
        return SuccessResponse.of(simpleTradePostList);
    }
}
