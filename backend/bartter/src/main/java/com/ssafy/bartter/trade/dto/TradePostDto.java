package com.ssafy.bartter.trade.dto;

import com.ssafy.bartter.global.common.SimpleLocation;
import com.ssafy.bartter.trade.entity.TradePost;
import com.ssafy.bartter.trade.entity.TradeStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

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
    public static class SimpleTradePost {
        private int cropTradePostId;
        private String title;
        private String imageURL;
        private TradeStatus status;
        private SimpleLocation location;
        private int likeCount;
        private boolean isLike;
        private LocalDateTime createdAt;

        public static SimpleTradePost of(TradePost tradePost) {
            // TODO: 현재 사용자의 userID가 1이라고 가정하고 구현 추후 리팩토링 예정
            int currentUserId = 1;
            return SimpleTradePost.builder()
                    .cropTradePostId(tradePost.getId())
                    .title(tradePost.getTitle())
                    .imageURL(tradePost.getImageList().isEmpty() ? null : tradePost.getImageList().get(0).getImageUrl())
                    .status(tradePost.getStatus())
                    .location(SimpleLocation.of(tradePost.getLocation()))
                    .likeCount(tradePost.getLikeList().size())
                    .isLike(tradePost.getLikeList().stream().anyMatch(like -> like.getUser().getId() == currentUserId)) // TODO : 실제 좋아요 여부를 사용자와 관련하여 추후 로직 수정
                    .createdAt(tradePost.getCreatedAt())
                    .build();
        }
    }
}
