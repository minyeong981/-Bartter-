package com.ssafy.bartter.domain.trade.dto;

import com.ssafy.bartter.domain.trade.entity.Trade;
import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.domain.user.dto.UserDto;
import com.ssafy.bartter.domain.user.dto.UserDto.SimpleUserProfile;
import com.ssafy.bartter.domain.user.entity.User;
import lombok.Data;

import static com.ssafy.bartter.domain.trade.dto.TradePostDto.*;

public class TradeDto {

    @Data
    public static class TradeInfo {
        private int tradeId;
        private SimpleTradePostDetail simpleTradePostDetail;
        private SimpleUserProfile userProfile;

        public static TradeInfo of(TradePost tradePost, int tradeId, int userId) {
            TradeInfo tradeInfo = new TradeInfo();
            tradeInfo.tradeId = tradeId;
            tradeInfo.userProfile = SimpleUserProfile.of(tradePost.getUser());
            tradeInfo.simpleTradePostDetail = SimpleTradePostDetail.of(tradePost, userId);
            return tradeInfo;
        }
    }

    @Data
    public static class SimpleTradeInfo {
        private int tradeId;
        private SimpleUserProfile userProfile;
        private String message;

        public static SimpleTradeInfo of(Trade trade, String message) {
            SimpleTradeInfo tradeInfo = new SimpleTradeInfo();
            tradeInfo.tradeId = trade.getId();
            tradeInfo.userProfile = SimpleUserProfile.of(trade.getUser());
            tradeInfo.message = message;
            return tradeInfo;
        }
    }
}