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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 물물교환과 관련된 요청을 처리하는 컨트롤러 클래스
 *
 * @author 김용수
 */
@Slf4j
@RestController
@RequestMapping("/trades")
@RequiredArgsConstructor
@Tag(name = "물물교환 API", description = "거래와 관련된 API 입니다")
public class TradeController {
    private final TradeService tradeService;
    private final RedisChatService redisChatService;

    /**
     * 특정 물물교환 정보를 조회하는 메서드
     *
     * @param tradePostId 물물교환 게시글 ID
     * @param user 현재 사용자 정보
     * @return 물물교환 정보
     */
    @GetMapping("/{tradePostId}")
    @Operation(summary = "거래 조회", description = "특정 거래 정보를 조회합니다.")
    public SuccessResponse<TradeInfo> getTrade(
            @PathVariable int tradePostId,
            @CurrentUser UserAuthDto user
    ) {
        TradeInfo tradeInfo = tradeService.createOrGetTrade(tradePostId, user.getId());
        return SuccessResponse.of(tradeInfo);
    }

    /**
     * 특정 물물교환의 채팅 내용을 조회하는 메서드
     *
     * @param tradeId 물물교환 ID
     * @param page 페이지 번호
     * @param limit 페이지당 항목 수
     * @param user 현재 사용자 정보
     * @return 채팅 메시지 목록
     */
    @GetMapping("/chat/{tradeId}")
    @Operation(summary = "물물교환 채팅 조회", description = "특정 물물교환 거래의 채팅 내용을 조회합니다.")
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

    /**
     * 물물교환 거래 상태를 진행 중으로 변경하는 메서드
     *
     * @param tradeId 물물교환 거래 ID
     * @param user 현재 사용자 정보
     * @return 성공 여부를 나타내는 SuccessResponse 객체
     */
    @PutMapping("/{tradeId}/progress")
    @Operation(summary = "물물교환 거래 진행 중으로 변경", description = "물물교환 거래 상태를 진행 중으로 변경합니다.")
    public SuccessResponse<Void> setTradeProgress(
            @PathVariable("tradeId") int tradeId,
            @CurrentUser UserAuthDto user
    ) {
        tradeService.changeStatus(tradeId, user.getId(), TradeStatus.PROGRESS);
        return SuccessResponse.empty();
    }

    /**
     * 물물교환 거래 상태를 예약됨으로 변경하는 메서드
     *
     * @param tradeId 물물교환 거래 ID
     * @param user 현재 사용자 정보
     * @return 성공 여부를 나타내는 SuccessResponse 객체
     */
    @PutMapping("/{tradeId}/reserve")
    @Operation(summary = "물물교환 거래 예약됨으로 변경", description = "물물교환 거래 상태를 예약됨으로 변경합니다.")
    public SuccessResponse<Void> setTradePostReserve(
            @PathVariable("tradeId") int tradeId,
            @CurrentUser UserAuthDto user
    ) {
        tradeService.changeStatus(tradeId, user.getId(), TradeStatus.RESERVED);
        return SuccessResponse.empty();
    }

    /**
     * 물물교환 거래 상태를 완료됨으로 변경하는 메서드
     *
     * @param tradeId 물물교환 거래 ID
     * @param user 현재 사용자 정보
     * @return 성공 여부를 나타내는 SuccessResponse 객체
     */
    @PutMapping("/{tradeId}/complete")
    @Operation(summary = "물물교환 거래 완료됨으로 변경", description = "물물교환 거래 상태를 완료됨으로 변경합니다.")
    public SuccessResponse<Void> setTradePostComplete(
            @PathVariable("tradeId") int tradeId,
            @CurrentUser UserAuthDto user
    ) {
        log.debug("tradeId : {}번 완료 상태로 변경 ", tradeId);
        tradeService.changeStatus(tradeId, user.getId(), TradeStatus.COMPLETED);
        return SuccessResponse.empty();
    }
}
