package com.ssafy.bartter.domain.trade.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.chat.dto.ChatMessage;
import com.ssafy.bartter.domain.chat.service.RedisChatService;
import com.ssafy.bartter.domain.trade.dto.TradeDto;
import com.ssafy.bartter.domain.trade.dto.TradeDto.TradeInfo;
import com.ssafy.bartter.domain.trade.entity.Trade;
import com.ssafy.bartter.domain.trade.entity.TradeStatus;
import com.ssafy.bartter.domain.trade.services.TradeService;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.global.response.SuccessResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
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
    ) {
        TradeInfo tradeInfo = tradeService.createOrGetTrade(tradePostId, user.getId());
        return SuccessResponse.of(tradeInfo);
    }

    @GetMapping("/chat/{tradeId}")
    public SuccessResponse<List<ChatMessage>> getTradeChat(
            @PathVariable("tradeId") int tradeId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "30") int limit,
            @CurrentUser UserAuthDto user
    ) {
        log.debug("page= {}, limit ={} ", page, limit);
        List<ChatMessage> tradeChat = redisChatService.getTradeChat(user.getId(), tradeId, page, limit);
        return SuccessResponse.of(tradeChat);
    }

    @PutMapping("/{tradeId}/progress")
    public SuccessResponse<Void> setTradeProgress(
            @PathVariable("tradeId") int tradeId,
            @CurrentUser UserAuthDto user
    ) {
        tradeService.changeStatus(tradeId, user.getId(), TradeStatus.PROGRESS);
        return SuccessResponse.empty();
    }

    @PutMapping("/{tradeId}/reserve")
    public SuccessResponse<Void> setTradePostReserve(
            @PathVariable("tradeId") int tradeId,
            @CurrentUser UserAuthDto user
    ) {
        tradeService.changeStatus(tradeId, user.getId(), TradeStatus.RESERVED);
        return SuccessResponse.empty();
    }

    @PutMapping("/{tradeId}/complete")
    public SuccessResponse<Void> setTradePostComplete(
            @PathVariable("tradeId") int tradeId,
            @CurrentUser UserAuthDto user
    ) {
        log.debug("tradeId : {}번 완료 상태로 변경 ", tradeId);
        tradeService.changeStatus(tradeId, user.getId(), TradeStatus.COMPLETED);
        return SuccessResponse.empty();
    }
}
