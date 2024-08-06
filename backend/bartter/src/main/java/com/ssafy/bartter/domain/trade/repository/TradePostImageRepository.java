package com.ssafy.bartter.domain.trade.repository;

import com.ssafy.bartter.domain.trade.entity.TradePostImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TradePostImageRepository extends JpaRepository<TradePostImage, Integer> {

    @Query("SELECT tpi FROM TradePostImage tpi " +
            "WHERE tpi.tradePost.id = :tradePostId")
    List<TradePostImage> findByTradePostId(@Param("tradePostId") int tradePostId);
}
