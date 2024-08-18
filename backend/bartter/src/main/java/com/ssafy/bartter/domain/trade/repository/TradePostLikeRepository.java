package com.ssafy.bartter.domain.trade.repository;

import com.ssafy.bartter.domain.trade.entity.TradePostLike;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TradePostLikeRepository extends JpaRepository<TradePostLike, Integer> {

    Optional<TradePostLike> findByTradePostIdAndUserId(int tradePostId, int userId);

    @Query("SELECT tpl.tradePost.id FROM TradePostLike tpl " +
            "WHERE tpl.user.id = :userId")
    List<Integer> findTradePostLikeIdList(@Param("userId")int userId, Pageable pageable);
}
