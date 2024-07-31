package com.ssafy.bartter.domain.community.controller;


import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.community.entity.CommunityPost;
import com.ssafy.bartter.domain.community.service.CommunityPostService;
import com.ssafy.bartter.domain.community.dto.CommunityPostDto;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.bartter.domain.community.dto.CommunityPostDto.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/community/posts")
@Tag(name = "동네모임 게시글 API", description = "동네모임 게시글 등록/조회/삭제 관련 API입니다.")
public class CommunityPostController {

    private final CommunityPostService communityPostService;

    @Operation(summary = "동네모임 게시글 작성", description = "동네모임 게시글을 작성한다.")
    @PostMapping("")
    public SuccessResponse<CommunityPostDetail> createCommunityPost(
            @CurrentUser UserAuthDto currentUser,
            @ModelAttribute @Valid Create request,
            BindingResult bindingResult,
            MultipartFile[] imageList) {
        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, bindingResult);
        }

        CommunityPost post = communityPostService.createPost(request, imageList, currentUser.getId());
        CommunityPostDetail response = CommunityPostDetail.of(post, currentUser.getId());
        return SuccessResponse.of(response);
    }

    @Operation(summary = "동네모임 게시글 상세 조회", description = "동네모임 게시글의 ID를 통해 게시글의 상세 정보를 조회한다.")
    @GetMapping("/{communityPostId}")
    public SuccessResponse<CommunityPostDetail> getCommunityPost(
            @PathVariable("communityPostId") int communityPostId,
            @CurrentUser UserAuthDto currentUser
    ) {
        CommunityPost post = communityPostService.getPost(communityPostId);
        CommunityPostDetail response = CommunityPostDetail.of(post, currentUser.getId());
        return SuccessResponse.of(response);
    }

    @Operation(summary = "동네모임 게시글 전체 조회", description = "동네모임 전체 게시글을 조회한다.")
    @GetMapping("")
    public SuccessResponse<List<CommunityPostDetail>> getCommunityPostList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @RequestParam(value = "isCommunity", defaultValue = "false") boolean isCommunity,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @CurrentUser UserAuthDto currentUser
    ) {
        Integer userId = currentUser.getId();
        List<CommunityPost> postList = communityPostService.getPostList(page, limit, keyword, isCommunity, userId);
        List<CommunityPostDetail> response = postList.stream()
                .map((CommunityPost post) -> CommunityPostDetail.of(post, userId))
                .collect(Collectors.toList());
        return SuccessResponse.of(response);
    }

    @Operation(summary = "동네모임 게시글 삭제", description = "동네모임 게시글의 ID를 통해 게시글의 상세 정보를 조회한 후 삭제한다.")
    @DeleteMapping("/{communityPostId}")
    public SuccessResponse<Void> deleteCommunityPost(
            @PathVariable("communityPostId") int communityPostId,
            @CurrentUser UserAuthDto currentUser
    ) {
        communityPostService.deletePost(communityPostId, currentUser.getId());
        return SuccessResponse.empty();
    }

    @Operation(summary = "동네모임 게시글 좋아요 생성", description = "동네모임 게시글에 좋아요를 생성한다.")
    @PostMapping("/{communityPostId}/like")
    public SuccessResponse<Void> createCommunityLike(
            @PathVariable("communityPostId") int communityPostId,
            @CurrentUser UserAuthDto currentUser
    ) {
        communityPostService.createCommunityLike(communityPostId, currentUser.getId());
        return SuccessResponse.empty();
    }

    @Operation(summary = "동네모임 게시글 좋아요 취소", description = "동네모임 게시글에 등록된 좋아요를 삭제한다.")
    @DeleteMapping("/{communityPostId}/like")
    public SuccessResponse<Void> deleteCommunityLike(
            @PathVariable("communityPostId") int communityPostId,
            @CurrentUser UserAuthDto currentUser
    ) {
        communityPostService.deleteCommunityLike(communityPostId, currentUser.getId());
        return SuccessResponse.empty();
    }
}
