package com.ssafy.bartter.domain.trade.repository;

import com.ssafy.bartter.domain.trade.entity.Trade;
import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TradeRepository extends JpaRepository<Trade, Integer> {
    Optional<Trade> findByTradePostAndUser(TradePost tradePost, User user);
}
