package com.ssafy.bartter.domain.trade.repository;

import com.ssafy.bartter.domain.trade.entity.Trade;
import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TradeRepository extends JpaRepository<Trade, Integer> {

    @Query("SELECT t FROM Trade t " +
            "WHERE t.tradePost.id = :tradePostId " +
            "AND (t.tradePost.user.id = :userId OR t.user.id = :userId)")
    Optional<Trade> findByTradePostAndUser(
            @Param("tradePostId") int tradePostId,
            @Param("userId") int userId);

    @Query("SELECT COUNT(t) > 0 " +
            "FROM Trade t " +
            "WHERE t.id = :tradeId " +
            "AND (t.user.id = :userId OR t.tradePost.user.id = :userId)")
    boolean existsByTradeIdAndUserId(
            @Param("userId") int userId,
            @Param("tradeId") int tradeId
    );

    // 해당 물물교환의 게시글 주인인지 확인
    @Query("SELECT COUNT(t) > 0 " +
            "FROM Trade t " +
            "WHERE t.id = :tradeId " +
            "AND t.tradePost.user.id = :userId")
    boolean existByUserIdAndTradePost(
            @Param("userId") int userId,
            @Param("tradeId") int tradeId
    );

    @Query("SELECT t FROM Trade t " +
            "JOIN FETCH t.user " +
            "JOIN FETCH t.tradePost " +
            "WHERE t.id = :tradeId")
    Optional<Trade> findById(@Param("tradeId") int tradeId);

    @Query("SELECT t.user.id FROM Trade t " +
            "WHERE t.id = :tradeId ")
    Integer findTradeUserIdByTradeId(@Param("tradeId") int tradeId);

    @Query("SELECT t.tradePost.user.id FROM Trade t " +
            "WHERE t.id = :tradeId ")
    Integer findTradePostUserIdByTradeId(@Param("tradeId") int tradeId);

    @Query("SELECT t FROM Trade t " +
            "JOIN FETCH t.user " +
            "WHERE t.tradePost.id = :tradePostId")
    List<Trade> findTradeListByTradePostId(@Param("tradePostId") int tradePostId);

    @Query("SELECT t FROM Trade t " +
            "JOIN FETCH t.user " +
            "WHERE t.tradePost.user.id = :userId")
    List<Trade> findTradeListByUserId(@Param("userId") int userId);


}
