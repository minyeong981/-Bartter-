package com.ssafy.bartter.domain.trade.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import com.ssafy.bartter.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Trade Post Like Entity
 *
 * @author 김용수
 */
@Entity
@Getter
@Table(name = "trade_post_like")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TradePostLike extends BaseEntity {

    /**
     * 농작물 물물교환 찜 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trade_post_like_id")
    private Integer id;

    /**
     * 찜한 사용자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 찜한 물물교환 게시글
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_post_id", nullable = false)
    private TradePost tradePost;

}
