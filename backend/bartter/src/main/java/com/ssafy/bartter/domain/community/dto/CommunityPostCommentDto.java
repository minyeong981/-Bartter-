package com.ssafy.bartter.domain.community.dto;

import com.ssafy.bartter.domain.community.entity.CommunityPostComment;
import com.ssafy.bartter.domain.user.dto.UserDto.SimpleUserProfile;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 동네모임 댓글 DTO
 *
 * @author 김가람
 */
public class CommunityPostCommentDto {

    /**
     * 동네모임 댓글 작성 Request
     * */
    @Data
    @Schema(name = "CommunityPostCommentCreateRequest", description = "동네모임 댓글 작성 요청")
    public static class Create {
        @Schema(description = "댓글 내용")
        @NotBlank(message = "댓글 내용을 입력하세요.")
        private String content;
    }

    /**
     * 동네모임 댓글 Response
     * */
    @Builder
    @Data
    public static class CommunityPostCommentDetail {
        private final int communityPostCommentId;
        private final int communityPostId;
        private final SimpleUserProfile author;
        private final String content;
        private final LocalDateTime createdAt;

        public static CommunityPostCommentDetail of(CommunityPostComment comment) {
            return CommunityPostCommentDetail.builder()
                    .communityPostCommentId(comment.getId())
                    .communityPostId(comment.getCommunityPost().getId())
                    .author(SimpleUserProfile.of(comment.getUser()))
                    .content(comment.getContent())
                    .createdAt(comment.getCreatedAt())
                    .build();
        }
    }
}
