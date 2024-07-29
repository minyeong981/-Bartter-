package com.ssafy.bartter.trade.controller;

import com.ssafy.bartter.global.response.SuccessResponse;
import com.ssafy.bartter.trade.dto.TradePostDto.SimpleTradePost;
import com.ssafy.bartter.trade.entity.TradePost;
import com.ssafy.bartter.trade.services.TradePostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
public class TradeController {

    private final TradePostService cropTradeService;

    @GetMapping("/trades")
    public SuccessResponse<List<SimpleTradePost>> getTradePostList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @RequestParam(value = "givenCategory" , defaultValue = "0") int givenCategory,
            @RequestParam(value = "desiredCategories", required = false) List<Integer> desiredCategories
            ) {
        int locationId = 1; // TODO : 사용자 로그인 구현시 변경 예정

        log.debug("offset : {}, limit : {}, givenCategory : {}, desiredCategories : {}", page, limit, givenCategory, desiredCategories);

        List<TradePost> tradePostList = cropTradeService.getTradePostList(page, limit, givenCategory, desiredCategories, locationId);

        List<SimpleTradePost> simpleTradePostList = tradePostList.stream().map(o -> SimpleTradePost.of(o)).collect(Collectors.toList());
        return SuccessResponse.of(simpleTradePostList);
    }
}
