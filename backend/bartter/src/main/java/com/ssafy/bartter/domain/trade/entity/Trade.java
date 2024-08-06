package com.ssafy.bartter.domain.trade.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import com.ssafy.bartter.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Trade Entity
 *
 * @author 김용수
 */
@Entity
@Getter
@Table(name = "trade")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Trade extends BaseEntity {

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
    @JoinColumn(name = "trade_post_id", nullable = false)
    private TradePost tradePost;

    /**
     * 물물교환 상태
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "trade_status", nullable = false)
    private TradeStatus status = TradeStatus.PROGRESS;

    public static Trade of(User user, TradePost tradePost){
        Trade trade = new Trade();
        trade.user = user;
        trade.tradePost = tradePost;
        return trade;
    }
}
