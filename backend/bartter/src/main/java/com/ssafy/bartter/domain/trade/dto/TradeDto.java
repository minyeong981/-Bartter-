package com.ssafy.bartter.domain.trade.dto;

import com.ssafy.bartter.domain.trade.entity.TradePost;
import lombok.Data;

import static com.ssafy.bartter.domain.trade.dto.TradePostDto.*;

public class TradeDto {

    @Data
    public static class TradeInfo{
        private int tradeId;
        private SimpleTradePostDetail simpleTradePostDetail;

        public static TradeInfo of(TradePost tradePost, int tradeId){
            TradeInfo tradeInfo = new TradeInfo();
            tradeInfo.tradeId = tradeId;
            tradeInfo.simpleTradePostDetail = SimpleTradePostDetail.of(tradePost);
            return tradeInfo;
        }
    }
}
