package com.ssafy.bartter.community.dto;

import com.ssafy.bartter.community.dto.CommunityPostCommentDto.CommunityPostCommentDetail;
import com.ssafy.bartter.community.entity.CommunityPost;
import com.ssafy.bartter.community.entity.CommunityPostImage;
import com.ssafy.bartter.global.common.SimpleLocation;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 동네모임 게시글 Entity 관련 DTO
 *
 * @author 김가람
 */
public class CommunityPostDto {

    /**
     * 동네모임 게시글 Request
     * */
    @Getter
    @AllArgsConstructor
    public static class Create {
        @NotBlank(message = "게시글 제목을 입력하세요.")
        private final String title;

        @NotBlank(message = "게시글 내용을 입력하세요.")
        private final String content;
    }

    /**
     * 동네모임 게시글 Response
     * */
    @Builder
    @Getter
    @AllArgsConstructor
    public static class CommunityPostDetail {
        private final Integer communityPostId;
        // TODO : SimpleUser 엔티티로 변경
        private final Integer userId;
        private final SimpleLocation location;
        private final String title;
        private final String content;
        private final Integer likeCount;
        private final Boolean isLike;
        private final List<SimpleCommunityImage> imageList;
        private final List<CommunityPostCommentDetail> commentList;
        private final LocalDateTime createdAt;

        public static CommunityPostDetail of(CommunityPost post, Integer currentUserId) {
            return CommunityPostDetail.builder()
                    .communityPostId(post.getId())
                    .userId(post.getUser().getId())
                    .location(SimpleLocation.of(post.getLocation()))
                    .title(post.getTitle())
                    .content(post.getContent())
                    .likeCount(post.getLikeList().size())
                    .isLike(post.getLikeList().stream()
                            .anyMatch(like -> like.getUser().getId().equals(currentUserId))
                    )
                    .commentList(
                            post.getCommentList().stream()
                                    .map(CommunityPostCommentDetail::of)
                                    .collect(Collectors.toList())
                    )
                    .imageList(
                            post.getImageList().stream()
                                    .map(SimpleCommunityImage::of)
                                    .collect(Collectors.toList())
                    )
                    .createdAt(post.getCreatedAt())
                    .build();
        }
    }

    /**
     * 간단한 동네모임 이미지 Response
     * */
    @Builder
    @Getter
    @AllArgsConstructor
    public static class SimpleCommunityImage {
        private final String imageUrl;
        private final Integer imageOrder;

        public static SimpleCommunityImage of(CommunityPostImage communityPostImage) {
            return SimpleCommunityImage.builder()
                    .imageUrl(communityPostImage.getImageUrl())
                    .imageOrder(communityPostImage.getOrder())
                    .build();
        }
    }
}
