package com.ssafy.bartter.domain.trade.services;

import com.ssafy.bartter.domain.trade.dto.TradeDto;
import com.ssafy.bartter.domain.trade.dto.TradeDto.TradeInfo;
import com.ssafy.bartter.domain.trade.entity.Trade;
import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.domain.trade.entity.TradeStatus;
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
        return TradeInfo.of(tradePost, trade.getId(), userId);
    }

    private Trade createTrade(TradePost tradePost, User user) {
        Trade trade = Trade.of(user, tradePost);
        return tradeRepository.save(trade);
    }

    public void isParticipant(int userId, int tradeId) {
        if(!tradeRepository.existsByTradeIdAndUserId(userId, tradeId)){
            throw new CustomException(ErrorCode.TRADE_CHAT_UNAUTHENTICATED);
        }
    }

    @Transactional
    public void changeStatus(int tradeId, int userId, TradeStatus newStatus) {
        log.debug("tradeId : {}, userId:{} ", tradeId, userId);
        if (!tradeRepository.existByUserIdAndTradePost(userId, tradeId)) {
            throw new CustomException(ErrorCode.BAD_REQUEST, "게시글 상태를 변경 할 권한이 없습니다.");
        }

        // 해당 게시글의 정보 변경
        Trade trade = tradeRepository.findById(tradeId).orElseThrow(() -> new CustomException(ErrorCode.TRADE_NOT_FOUND));
        if (trade.getStatus() == newStatus) {
            throw new CustomException(ErrorCode.TRADE_POST_SAME_STATUS);
        }
        trade.changeStatus(newStatus);

        tradeRepository.save(trade);

        TradePost tradePost = trade.getTradePost();
        tradePost.changeStatus(newStatus);
    }
}
