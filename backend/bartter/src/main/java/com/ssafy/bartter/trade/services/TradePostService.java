package com.ssafy.bartter.trade.services;

import com.ssafy.bartter.trade.dto.TradePost;
import com.ssafy.bartter.trade.repository.TradePostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TradePostService {

    private final TradePostRepository cropTradeRepository;

    public List<TradePost> getTradePostList(int offset, int limit, int givenCategory, List<Integer> desiredCategories, int locationId) {
        return null;
    }
}
