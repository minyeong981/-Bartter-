package com.ssafy.bartter.domain.trade.dto;

import com.ssafy.bartter.domain.crop.dto.CropCategoryDto.CropCategoryDetail;
import com.ssafy.bartter.domain.user.dto.UserDto;
import com.ssafy.bartter.domain.user.dto.UserDto.SimpleUserProfile;
import com.ssafy.bartter.global.common.SimpleLocation;
import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.domain.trade.entity.TradeStatus;
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
        private String image;
        private TradeStatus status;
        private SimpleLocation location;
        private int likeCount;
        private LocalDateTime createdAt;
        private Boolean isLike;
        private Boolean isShare;


        public static SimpleTradePostDetail of(TradePost tradePost, int currentUserId) {
            return SimpleTradePostDetail.builder()
                    .cropTradePostId(tradePost.getId())
                    .title(tradePost.getTitle())
                    .image(tradePost.getImageList().isEmpty() ? null : tradePost.getImageList().get(0).getImageUrl())
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
        private SimpleUserProfile author;
        private Boolean isLike;
        private Boolean isShare;
        private boolean hasCrop;
        private int cropId;
        private List<String> imageList;
        private SimpleLocation location;
        private List<CropCategoryDetail> desiredCategoryList;
        private LocalDateTime createdAt;

        public static TradePostDetail of(TradePost tradePost, List<String> imageList, List<CropCategoryDetail> desiredCategoryList, int currentUserId) {
            return TradePostDetail.builder()
                    .tradePostId(tradePost.getId())
                    .title(tradePost.getTitle())
                    .content(tradePost.getContent())
                    .author(UserDto.SimpleUserProfile.of(tradePost.getUser()))
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

        @NotBlank(message = "제목을 입력해주세요")
        private String title;

        @NotBlank(message = "내용을 입력해주세요")
        private String content;

        private boolean shareStatus;

        @Min(value = 0, message = "메시지를 입력해주세요")
        private int locationId;

        private int cropId;

        @Min(value = 0, message = "농작물 카테고리를 선택해주세요")
        private int cropCategoryId;

        private List<Integer> wishCropCategoryList;
    }
}
