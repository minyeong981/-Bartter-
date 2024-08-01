package com.ssafy.bartter.domain.trade.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.bartter.domain.crop.dto.CropCategoryDto.CropCategoryDetail;
import com.ssafy.bartter.global.common.SimpleLocation;
import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.domain.trade.entity.TradeStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 물물교환 게시글 Dto
 *
 * @author 김용수
 */
public class TradePostDto {

    /**
     * 물물교환 목록 Dto
     */
    @Getter
    @Builder
    public static class SimpleTradePostDetail {
        private int cropTradePostId;
        private String title;
        private String imageURL;
        private TradeStatus status;
        private SimpleLocation location;
        private int likeCount;
        @JsonProperty("isLike")
        private boolean isLike;
        @JsonProperty("isShare")
        private boolean isShare;
        private LocalDateTime createdAt;

        public static SimpleTradePostDetail of(TradePost tradePost) {
            // TODO: 현재 사용자의 userID가 1이라고 가정하고 구현 추후 리팩토링 예정
            int currentUserId = 1;
            return SimpleTradePostDetail.builder()
                    .cropTradePostId(tradePost.getId())
                    .title(tradePost.getTitle())
                    .imageURL(tradePost.getImageList().isEmpty() ? null : tradePost.getImageList().get(0).getImageUrl())
                    .status(tradePost.getStatus())
                    .location(SimpleLocation.of(tradePost.getLocation()))
                    .likeCount(tradePost.getLikeList().size())
                    .isLike(tradePost.getLikeList().stream().anyMatch(like -> like.getUser().getId() == currentUserId)) // TODO : 실제 좋아요 여부를 사용자와 관련하여 추후 로직 수정
                    .isShare(tradePost.isShare())
                    .createdAt(tradePost.getCreatedAt())
                    .build();
        }
    }

    /**
     * 물물교환 상세조회 Dto
     */
    @Getter
    @Builder
    public static class TradePostDetail {
        private int tradePostId;
        private String title;
        private String content;

        // TODO: SimpleUserProfile Refactoring
        private int userId;
        private String nickname;
        private String profileImage;

        @JsonProperty("isLike")
        private boolean isLike;
        @JsonProperty("isShare")
        private boolean isShare;
        private boolean hasCrop;
        private int cropId;

        private List<String> imageList;
        private SimpleLocation location;
        private List<CropCategoryDetail> desiredCategoryList;
        private LocalDateTime createdAt;

        public static TradePostDetail of(TradePost tradePost, List<String> imageList,List<CropCategoryDetail> desiredCategoryList) {
            int currentUserId = 1;
            return TradePostDetail.builder()
                    .tradePostId(tradePost.getId())
                    .title(tradePost.getTitle())
                    .content(tradePost.getContent())
                    .userId(tradePost.getUser().getId())
                    .nickname(tradePost.getUser().getNickname())
                    .profileImage(tradePost.getUser().getProfileImage())
                    .hasCrop(tradePost.getCrop() != null)
                    .isShare(tradePost.isShare())
                    .isLike(tradePost.getLikeList().stream().anyMatch(like -> like.getUser().getId() == currentUserId))
                    .cropId(tradePost.getCrop() == null ? 0 : tradePost.getCrop().getId())
                    .imageList(imageList)
                    .location(SimpleLocation.of(tradePost.getLocation()))
                    .desiredCategoryList(desiredCategoryList)
                    .createdAt(tradePost.getCreatedAt())
                    .build();
        }
    }

    /**
     * 물물교환 게시글 작성 Dto
     */
    @Data
    public static class Create {

        @NotBlank
        private String title;

        @NotBlank
        private String content;

        private boolean shareStatus;

        @Min(value = 0)
        private int locationId;

        private int cropId;

        @Min(value = 0)
        private int cropCategoryId;

        private List<Integer> wishCropCategoryList;
    }
}
