package com.ssafy.bartter.community.controller;


import com.ssafy.bartter.auth.annotation.CurrentUser;
import com.ssafy.bartter.auth.dto.UserAuthDto;
import com.ssafy.bartter.community.entity.CommunityPost;
import com.ssafy.bartter.community.service.CommunityPostService;
import com.ssafy.bartter.crop.dto.CropCategoryDto;
import com.ssafy.bartter.crop.entity.CropCategory;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.bartter.community.dto.CommunityPostDto.CommunityPostDetail;
import static com.ssafy.bartter.community.dto.CommunityPostDto.Create;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/community/posts")
@Tag(name = "동네모임 게시글 API", description = "동네모임 게시글 등록/조회/삭제 관련 API입니다.")
public class CommunityPostController {

    private final CommunityPostService communityPostService;

    @Operation(summary = "동네모임 게시글 전체 조회", description = "동네모임 전체 게시글을 조회한다.")
    @GetMapping("")
    public SuccessResponse<List<CommunityPostDetail>> getCommunityPostList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @RequestParam(value = "isCommunity", required = false) boolean isCommunity,
            @RequestParam(value = "keyword", required = false) String keyword,
            @CurrentUser UserAuthDto userAuthDto
    ) {
        List<CommunityPost> postList = communityPostService.getPostList(page, limit, keyword, isCommunity, userAuthDto.getId());
        List<CommunityPostDetail> response = postList.stream()
                .map(CommunityPostDetail::of)
                .collect(Collectors.toList());
        return SuccessResponse.of(response);
    }

    @Operation(summary = "동네모임 게시글 작성", description = "동네모임 게시글을 작성한다.")
    @PostMapping("")
    public SuccessResponse<CommunityPostDetail> createCommunityPost(
            @ModelAttribute @Valid Create request,
            @CurrentUser UserAuthDto userAuthDto,
            BindingResult bindingResult,
            MultipartFile[] imageList)
    {
        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, bindingResult);
        }

        CommunityPost post = communityPostService.createPost(request, imageList, userAuthDto.getId());
        CommunityPostDetail response = CommunityPostDetail.of(post);
        return SuccessResponse.of(response);
    }

    @Operation(summary = "동네모임 게시글 상세 조회", description = "동네모임 게시글의 ID를 통해 게시글의 상세 정보를 조회한다.")
    @GetMapping("/{communityPostId}")
    public SuccessResponse<CommunityPostDetail> getCommunityPost(@PathVariable("communityPostId") Integer communityPostId) {
        CommunityPost post = communityPostService.getPost(communityPostId);
        CommunityPostDetail response = CommunityPostDetail.of(post);
        return SuccessResponse.of(response);
    }

    @Operation(summary = "동네모임 게시글 삭제", description = "동네모임 게시글의 ID를 통해 게시글의 상세 정보를 조회한 후 삭제한다.")
    @DeleteMapping("/{communityPostId}")
    public SuccessResponse<Void> deleteCommunityPost(
            @PathVariable("communityPostId") Integer communityPostId,
            @CurrentUser UserAuthDto userAuthDto
    ) {
        communityPostService.deletePost(communityPostId, userAuthDto.getId());
        return SuccessResponse.empty();
    }
}
