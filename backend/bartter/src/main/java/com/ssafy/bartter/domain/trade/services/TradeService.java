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

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradePostRepository tradePostRepository;
    private final UserRepository userRepository;
    private final TradeRepository tradeRepository;

    @Transactional
    public int getOrCreateTrade(int tradePostId, int userId) {
        TradePost tradePost = tradePostRepository.findTradePostById(tradePostId)
                .orElseThrow(() -> new CustomException(ErrorCode.TRADE_POST_NOT_FOUND));
        log.debug("해당 게시글 : {}", tradePost.getId());
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        log.debug("나 : {}", userId);

        Trade trade = tradeRepository.findByTradePostAndUser(tradePost.getId(), userId).orElseGet(() -> createTrade(tradePost, user));
        return trade.getId();
    }

    @Transactional
    public Trade getTrade(int tradeId) {
        return tradeRepository.findById(tradeId).orElseThrow(() -> new CustomException(ErrorCode.TRADE_NOT_FOUND));
    }

    private Trade createTrade(TradePost tradePost, User user) {
        Trade trade = Trade.of(user, tradePost);
        return tradeRepository.save(trade);
    }

    public void isParticipant(int userId, int tradeId) {
        log.debug("참여 원하는 유저 :{}, tradeId :{}", userId, tradeId);
        if(!tradeRepository.existsByTradeIdAndUserId(userId, tradeId)){
            throw new CustomException(ErrorCode.TRADE_CHAT_UNAUTHENTICATED);
        }
        log.debug("문제 없습니다.");
    }

    public List<Integer> getParticipantList(int tradeId) {
        int requesterId  = tradeRepository.findTradeUserIdByTradeId(tradeId);
        int receiverId  = tradeRepository.findTradePostUserIdByTradeId(tradeId);
        return List.of(requesterId, receiverId);
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

    public List<Trade> getTradeListByTradePostId(int tradePostId) {
        return tradeRepository.findTradeListByTradePostId(tradePostId);
    }

    public List<Trade> getTradeListByUserId(int userId) {
        return tradeRepository.findTradeListByUserId(userId);
    }
}
