package com.ssafy.bartter.trade.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import com.ssafy.bartter.user.entity.User;
import jakarta.persistence.*;

/**
 * Crop Trade Entity
 *
 * @author 김용수
 */
@Entity
@Table(name = "crop_trade")
public class CropTrade extends BaseEntity {

    /**
     * 물물교환 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trade_id")
    private Integer id;

    /**
     * 물물교환 신청자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 물물교환 게시글
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_trade_post_id", nullable = false)
    private CropTradePost cropTradePost;

    /**
     * 물물교환 상태
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "crop_trade_status", nullable = false)
    private TradeStatus status = TradeStatus.NEW;
}
