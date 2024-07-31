package com.ssafy.bartter.domain.user.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.community.dto.CommunityPostDto.CommunityPostDetail;
import com.ssafy.bartter.domain.community.entity.CommunityPost;
import com.ssafy.bartter.domain.community.service.CommunityPostService;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Tag(name = "유저 작성 게시글 조회 API", description = "특정 유저의 동네모임 게시글을 조회하는 API 입니다.")
public class UserCommunityPostController {

    private final CommunityPostService communityPostService;

    @Operation(summary = "유저가 작성한 동네모임 게시글 전체 조회", description = "유저의 PK를 통해 유저가 작성한 동네모임 게시글 전체를 조회한다.")
    @GetMapping("/{userId}/community/posts")
    public SuccessResponse<List<CommunityPostDetail>> getUserCommunityPostList(
            @PathVariable("userId") Integer userId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "6") int limit,
            @CurrentUser UserAuthDto userAuthDto
    ) {
        List<CommunityPost> postList = communityPostService.getUserPostList(page, limit, userId);
        List<CommunityPostDetail> response = postList.stream().map(o -> CommunityPostDetail.of(o, userAuthDto.getId())).collect(Collectors.toList());
        return SuccessResponse.of(response);
    }
}
