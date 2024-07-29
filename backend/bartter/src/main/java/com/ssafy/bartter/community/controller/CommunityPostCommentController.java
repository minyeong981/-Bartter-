package com.ssafy.bartter.community.controller;

import com.ssafy.bartter.community.dto.CommunityPostCommentDto.CommunityPostCommentDetail;
import com.ssafy.bartter.community.dto.CommunityPostCommentDto.Create;
import com.ssafy.bartter.community.entity.CommunityPostComment;
import com.ssafy.bartter.community.service.CommunityPostCommentService;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/community/posts")
@Tag(name = "동네모임 게시글 댓글 API", description = "동네모임 게시글 댓글 등록/삭제 관련 API입니다.")
public class CommunityPostCommentController {

    private final CommunityPostCommentService communityPostCommentService;

    @Operation(summary = "동네모임 게시글 댓글 작성", description = "특정 ID를 가진 동네모임 게시글의 댓글을 작성한다.")
    @PostMapping("/{communityPostId}/comment")
    public SuccessResponse<CommunityPostCommentDetail> createComment(
            @PathVariable("communityPostId") Integer communityPostId,
            @RequestBody @Valid Create request,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE);
        }
        CommunityPostComment comment = communityPostCommentService.createComment(communityPostId, request);
        CommunityPostCommentDetail response = CommunityPostCommentDetail.of(comment);
        return SuccessResponse.of(response);
    }

    @Operation(summary = "동네모임 게시글 댓글 삭제", description = "특정 ID를 가진 동네모임 게시글의 댓글 조회하여 삭제한다.")
    @DeleteMapping("/{communityPostId}/comment/{communityPostCommentId}")
    public SuccessResponse<Void> deleteComment(
            @PathVariable("communityPostId") Integer communityPostId,
            @PathVariable("communityPostCommentId") Integer communityPostCommentId
    ) {
        communityPostCommentService.deleteComment(communityPostCommentId);
        return SuccessResponse.empty();
    }
}
