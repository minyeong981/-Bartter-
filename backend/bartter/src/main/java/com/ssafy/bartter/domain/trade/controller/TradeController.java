package com.ssafy.bartter.domain.trade.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.trade.dto.TradeDto;
import com.ssafy.bartter.domain.trade.dto.TradeDto.TradeInfo;
import com.ssafy.bartter.domain.trade.entity.Trade;
import com.ssafy.bartter.domain.trade.services.TradeService;
import com.ssafy.bartter.global.response.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/trades")
@RequiredArgsConstructor
public class TradeController {
    private final TradeService tradeService;

    @GetMapping("/{tradePostId}")
    public SuccessResponse<TradeInfo> getTrade(
            @PathVariable int tradePostId,
            @CurrentUser UserAuthDto user
    ){
        TradeInfo tradeInfo = tradeService.createOrGetTrade(tradePostId, user.getId());
        return SuccessResponse.of(tradeInfo);
    }
}
