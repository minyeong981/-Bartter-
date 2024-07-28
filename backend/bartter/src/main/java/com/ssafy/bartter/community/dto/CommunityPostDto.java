package com.ssafy.bartter.community.dto;

import com.ssafy.bartter.community.dto.CommunityPostCommentDto.SimpleCommunityPostComment;
import com.ssafy.bartter.community.entity.CommunityPost;
import com.ssafy.bartter.community.entity.CommunityPostImage;
import com.ssafy.bartter.global.common.SimpleLocation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class CommunityPostDto {

    @Getter
    @AllArgsConstructor
    public static class Create {
        @NotNull(message = "유저 정보를 입력하세요.")
        private final Integer userId;

        @NotBlank(message = "게시글 제목을 입력하세요.")
        private final String title;

        @NotBlank(message = "게시글 내용을 입력하세요.")
        private final String content;
    }

    @Builder
    @AllArgsConstructor
    public static class CommunityPostDetail {
        private final Integer communityPostId;
        // TODO : SimpleUser 엔티티로 변경
        private final Integer userId;
        private final SimpleLocation location;
        private final String title;
        private final String content;
        private final Integer likeCount;
        private final List<SimpleCommunityPostComment> commentList;
        private final List<SimpleCommunityImage> imageList;
        private final LocalDateTime createdAt;

        public static CommunityPostDetail of(CommunityPost post) {
            return CommunityPostDetail.builder()
                    .communityPostId(post.getId())
                    .userId(post.getUser().getId())
                    .location(SimpleLocation.of(post.getLocation()))
                    .title(post.getTitle())
                    .content(post.getContent())
                    .likeCount(post.getLikeList().size())
                    .commentList(
                            post.getCommentList().stream()
                                    .map(SimpleCommunityPostComment::of)
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

    @Builder
    @Getter
    @AllArgsConstructor
    public static class SimpleCommunityImage {
        private final Integer imageId;
        private final String imageUrl;
        private final Integer imageOrder;

        public static SimpleCommunityImage of(CommunityPostImage communityPostImage) {
            return SimpleCommunityImage.builder()
                    .imageId(communityPostImage.getId())
                    .imageUrl(communityPostImage.getImageUrl())
                    .imageOrder(communityPostImage.getOrder())
                    .build();
        }
    }
}
