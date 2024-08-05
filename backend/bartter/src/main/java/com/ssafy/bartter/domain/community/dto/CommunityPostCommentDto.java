package com.ssafy.bartter.domain.community.dto;

import com.ssafy.bartter.domain.community.entity.CommunityPostComment;
import com.ssafy.bartter.domain.user.dto.UserDto.SimpleUserProfile;
import jakarta.validation.constraints.NotBlank;
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
    public static class CommunityPostCommentDetail {
        private final Integer communityPostCommentId;
        private final SimpleUserProfile author;
        private final String content;
        private final LocalDateTime createdAt;

        public static CommunityPostCommentDetail of(CommunityPostComment comment) {
            return CommunityPostCommentDetail.builder()
                    .communityPostCommentId(comment.getId())
                    .author(SimpleUserProfile.of(comment.getUser()))
                    .content(comment.getContent())
                    .createdAt(comment.getCreatedAt())
                    .build();
        }
    }
}
