package com.ssafy.bartter.trade.dto;

import com.ssafy.bartter.global.common.SimpleLocation;
import com.ssafy.bartter.trade.entity.TradeStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

public class TradePost {

    @Getter
    @Builder
    public static class SimpleCropTradePost{
        private int cropTradePostId;
        private String title;
        private String imageURL;
        private TradeStatus status;
        private SimpleLocation location;
        private int likeCount;
        private boolean isLike;
        private LocalDateTime createdAt;
    }
}
