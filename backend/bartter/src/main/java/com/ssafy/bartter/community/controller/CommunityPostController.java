package com.ssafy.bartter.community.controller;


import com.ssafy.bartter.community.entity.CommunityPost;
import com.ssafy.bartter.community.service.CommunityPostService;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.ssafy.bartter.community.dto.CommunityPostDto.CommunityPostDetail;
import static com.ssafy.bartter.community.dto.CommunityPostDto.Create;

@RestController
@RequiredArgsConstructor
@RequestMapping("/community/posts")
@Tag(name = "동네모임 게시글 API", description = "동네모임 게시글 등록/조회/삭제 관련 API입니다.")
public class CommunityPostController {

    private final CommunityPostService communityPostService;

    @Operation(summary = "게시글 작성", description = "동네모임 게시글을 작성한다.")
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
}
