package com.ssafy.bartter.community.controller;


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
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.bartter.community.dto.CommunityPostDto.CommunityPostDetail;
import static com.ssafy.bartter.community.dto.CommunityPostDto.Create;

@RestController
@RequiredArgsConstructor
@RequestMapping("/community/posts")
@Tag(name = "동네모임 게시글 API", description = "동네모임 게시글 등록/조회/삭제 관련 API입니다.")
public class CommunityPostController {

    private final CommunityPostService communityPostService;

    @Operation(summary = "동네모임 게시글 작성", description = "동네모임 게시글을 작성한다.")
    @PostMapping("")
    public SuccessResponse<CommunityPostDetail> createCommunityPost(
            @RequestBody @Valid Create request,
            BindingResult bindingResult,
            List<MultipartFile> imageList) {
        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE);
        }
        CommunityPost post = communityPostService.createPost(request, imageList);
        return new SuccessResponse<>(CommunityPostDetail.of(post));
    }

    @Operation(summary = "동네모임 게시글 조회", description = "동네모임 게시글의 ID를 통해 게시글의 상세 정보를 조회한다.")
    @GetMapping("/{communityPostId}")
    public SuccessResponse<CommunityPostDetail> getCommunityPost(@PathVariable("communityPostId") Integer communityPostId) {
        CommunityPost post = communityPostService.getPost(communityPostId);
        return new SuccessResponse<>(CommunityPostDetail.of(post));
    }

    @Operation(summary = "동네모임 게시글 삭제", description = "동네모임 게시글의 ID를 통해 게시글의 상세 정보를 조회한 후 삭제한다.")
    @DeleteMapping("/{communityPostId}")
    public SuccessResponse<Void> deleteCommunityPost(@PathVariable("communityPostId") Integer communityPostId) {
        communityPostService.deletePost(communityPostId);
        return new SuccessResponse<>();
    }
}
