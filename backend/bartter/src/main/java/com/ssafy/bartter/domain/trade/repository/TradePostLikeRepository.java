package com.ssafy.bartter.domain.trade.repository;

import com.ssafy.bartter.domain.trade.entity.TradePostLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TradePostLikeRepository extends JpaRepository<TradePostLike, Integer> {

    Optional<TradePostLike> findByTradePostIdAndUserId(int tradePostId, int userId);
}
