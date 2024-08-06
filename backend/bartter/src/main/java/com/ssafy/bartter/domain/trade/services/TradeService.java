package com.ssafy.bartter.domain.trade.services;

import com.ssafy.bartter.domain.trade.dto.TradeDto;
import com.ssafy.bartter.domain.trade.dto.TradeDto.TradeInfo;
import com.ssafy.bartter.domain.trade.entity.Trade;
import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.domain.trade.repository.TradePostRepository;
import com.ssafy.bartter.domain.trade.repository.TradeRepository;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.domain.user.repository.UserRepository;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradePostRepository tradePostRepository;
    private final UserRepository userRepository;
    private final TradeRepository tradeRepository;

    @Transactional
    public TradeInfo createOrGetTrade(int tradePostId, int userId) {
        TradePost tradePost = tradePostRepository.findTradePostById(tradePostId)
                .orElseThrow(() -> new CustomException(ErrorCode.TRADE_POST_NOT_FOUND));
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 동일한 tradePost와 user가 있는지 조회
        Trade trade = tradeRepository.findByTradePostAndUser(tradePost, user).orElseGet(() -> createTrade(tradePost, user));
        return TradeInfo.of(tradePost, trade.getId());
    }

    private Trade createTrade(TradePost tradePost, User user) {
        Trade trade = Trade.of(user, tradePost);
        return tradeRepository.save(trade);
    }
}
