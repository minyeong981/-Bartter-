package com.ssafy.bartter.community.dto;

import com.ssafy.bartter.community.entity.CommunityPostComment;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

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
    @Getter
    @AllArgsConstructor
    public static class Create {
        @NotBlank(message = "댓글 내용을 입력하세요.")
        private final String content;
    }

    /**
     * 동네모임 댓글 Response
     * */
    @Builder
    @Getter
    @AllArgsConstructor
    public static class CommunityPostCommentDetail {
        private final Integer communityPostCommentId;
        // TODO : SimpleUser 엔티티로 변경
        private final Integer userId;
        private final String content;
        private final LocalDateTime createdAt;

        public static CommunityPostCommentDetail of(CommunityPostComment comment) {
            return CommunityPostCommentDetail.builder()
                    .communityPostCommentId(comment.getId())
                    .userId(comment.getUser().getId())
                    .content(comment.getContent())
                    .createdAt(comment.getCreatedAt())
                    .build();
        }
    }
}
