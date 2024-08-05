package com.ssafy.bartter.domain.trade.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.chat.service.RedisChatService;
import com.ssafy.bartter.domain.trade.dto.TradeDto;
import com.ssafy.bartter.domain.trade.dto.TradeDto.TradeInfo;
import com.ssafy.bartter.domain.trade.entity.Trade;
import com.ssafy.bartter.domain.trade.services.TradeService;
import com.ssafy.bartter.global.response.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/trades")
@RequiredArgsConstructor
public class TradeController {
    private final TradeService tradeService;
    private final RedisChatService redisChatService;

    @GetMapping("/{tradePostId}")
    public SuccessResponse<TradeInfo> getTrade(
            @PathVariable int tradePostId,
            @CurrentUser UserAuthDto user
    ){
        TradeInfo tradeInfo = tradeService.createOrGetTrade(tradePostId, user.getId());
        return SuccessResponse.of(tradeInfo);
    }

    @GetMapping("/chat/{tradeId}")
    public SuccessResponse<Void> getTradeChat(
            @PathVariable("tradeId") int tradeId,
            @RequestParam(value = "page",defaultValue = "0") int page,
            @RequestParam(value = "limit",defaultValue = "30") int limit
    ){
        redisChatService.getTradeChat(tradeId, page, limit);

        return SuccessResponse.empty();
    }
}
