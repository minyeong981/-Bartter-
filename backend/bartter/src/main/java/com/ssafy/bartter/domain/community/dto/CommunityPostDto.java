package com.ssafy.bartter.domain.community.dto;

import com.ssafy.bartter.domain.community.dto.CommunityPostCommentDto.CommunityPostCommentDetail;
import com.ssafy.bartter.domain.community.entity.CommunityPost;
import com.ssafy.bartter.domain.community.entity.CommunityPostImage;
import com.ssafy.bartter.domain.user.dto.UserDto.SimpleUserProfile;
import com.ssafy.bartter.global.common.SimpleLocation;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 동네모임 게시글 DTO
 *
 * @author 김가람
 */
public class CommunityPostDto {

    /**
     * 동네모임 게시글 Request
     * */
    @Data
    @Schema(name = "CommunityPostCreateRequest", description = "동네모임 게시글 작성 요청")
    public static class Create {
        @Schema(description = "게시글 제목")
        @NotBlank(message = "게시글 제목을 입력하세요.")
        private String title;

        @Schema(description = "게시글 내용")
        @NotBlank(message = "게시글 내용을 입력하세요.")
        private String content;
    }

    /**
     * 동네모임 게시글 Response
     * */
    @Builder
    @Getter
    public static class CommunityPostDetail {
        private final int communityPostId;
        private final SimpleUserProfile author;
        private final SimpleLocation location;
        private final String title;
        private final String content;
        private final Integer likeCount;
        private final Boolean isLike;
        private final List<SimpleCommunityImage> imageList;
        private final List<CommunityPostCommentDetail> commentList;
        private final LocalDateTime createdAt;

        public static CommunityPostDetail of(CommunityPost post, int currentUserId) {
            return CommunityPostDetail.builder()
                    .communityPostId(post.getId())
                    .author(SimpleUserProfile.of(post.getUser()))
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
     * 동네모임 이미지 Response
     * */
    @Builder
    @Getter
    public static class SimpleCommunityImage {
        private final String imageUrl;
        private final int imageOrder;

        public static SimpleCommunityImage of(CommunityPostImage communityPostImage) {
            return SimpleCommunityImage.builder()
                    .imageUrl(communityPostImage.getImageUrl())
                    .imageOrder(communityPostImage.getOrder())
                    .build();
        }
    }

    /**
     * 동네모임 게시글 목록 조회
     */
    @Builder
    @Getter
    public static class SimpleCommunityPostDetail {
        private final int communityPostId;
        private final String title;
        private final String content;
        private final LocalDateTime createdAt;
        private final int likeCount;
        private final Boolean isLike;
        private final int commentCount;
        private final String imageUrl;
        private final boolean hasImage;
        private final SimpleLocation location;

        public static SimpleCommunityPostDetail of(CommunityPost post,int userId) {
            return SimpleCommunityPostDetail.builder()
                    .communityPostId(post.getId())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .createdAt(post.getCreatedAt())
                    .likeCount(post.getLikeList().size())
                    .isLike(post.getLikeList().stream().anyMatch(like -> like.getUser().getId().equals(userId)))
                    .commentCount(post.getCommentList().size())
                    .imageUrl(post.getImageList().isEmpty() ? null : post.getImageList().get(0).getImageUrl())
                    .hasImage(!post.getImageList().isEmpty())
                    .location(SimpleLocation.of(post.getLocation()))
                    .build();
        }
    }

    /**
     * 내가 쓴 동네모임 게시글 목록 조회 (좋아요, 댓글 정보 없음)
     */
    @Builder
    @Getter
    public static class MyCommunityPostDetail {
        private final int communityPostId;
        private final String title;
        private final String content;
        private final LocalDateTime createdAt;
        private final String imageUrl;
        private final boolean hasImage;
        private final SimpleLocation location;

        public static MyCommunityPostDetail of(CommunityPost post) {
            return MyCommunityPostDetail.builder()
                    .communityPostId(post.getId())
                    .title(post.getTitle())
                    .content(post.getContent())
                    .createdAt(post.getCreatedAt())
                    .imageUrl(post.getImageList().isEmpty() ? null : post.getImageList().get(0).getImageUrl())
                    .hasImage(!post.getImageList().isEmpty())
                    .location(SimpleLocation.of(post.getLocation()))
                    .build();
        }
    }
}
