package com.ssafy.bartter.domain.user.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.chat.service.RedisChatService;
import com.ssafy.bartter.domain.trade.dto.TradeDto.SimpleTradeInfo;
import com.ssafy.bartter.domain.trade.entity.Trade;
import com.ssafy.bartter.domain.trade.services.TradeService;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@Tag(name = "유저가 참여한 채팅 기록", description = "특정 유저의 물물교환 채팅 내역을 조회하는 API 입니다.")
public class UserTradeController {

    private final TradeService tradeService;
    private final RedisChatService redisChatService;

    @Operation(summary = "현재 유저의 채팅 기록 조회", description = "유저의 PK를 통해 유저의 채팅 기록을 조회한다.")
    @GetMapping("/{userId}/trades")
    public SuccessResponse<List<SimpleTradeInfo>> getTradeListById(@CurrentUser UserAuthDto user) {
        List<Trade> tradeList = tradeService.getTradeListByUserId(user.getId());
        List<SimpleTradeInfo> simpleTradeInfoList = tradeList.stream()
                .map(trade -> {
                    String lastMessage = redisChatService.getLastMessage(trade.getId());
                    return SimpleTradeInfo.of(trade, user.getId(), lastMessage);
                })
                .sorted((a, b) -> b.getTradeId() - a.getTradeId())
                .toList();
        return SuccessResponse.of(simpleTradeInfoList);
    }

}
