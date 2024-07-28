package com.ssafy.bartter.trade.controller;

import com.ssafy.bartter.global.response.SuccessResponse;
import com.ssafy.bartter.trade.dto.TradePost;
import com.ssafy.bartter.trade.services.TradePostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class TradeController {

    private final TradePostService cropTradeService;

    @GetMapping("/trades")
    public SuccessResponse<List<TradePost.SimpleCropTradePost>> getTradePostList(
            @RequestParam(value = "offset", defaultValue = "0") int offset,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @RequestParam(value = "givenCategory" , required = false) int givenCategory,
            @RequestParam(value = "desiredCategories", required = false) List<Integer> desiredCategories
            ) {
        int locationId = 1;
        log.debug("offset : {}, limit : {}, givenCategory : {}, desiredCategories : {}", offset, limit, givenCategory, desiredCategories);
        cropTradeService.getTradePostList(offset, limit, givenCategory, desiredCategories, locationId);
        return SuccessResponse.of(null);
    }
}
