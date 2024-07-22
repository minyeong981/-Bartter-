package com.ssafy.bartter.trade.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import com.ssafy.bartter.user.entity.User;
import jakarta.persistence.*;

/**
 * Crop Trade Post Like Entity
 *
 * @author 김용수
 */
@Entity
@Table(name = "crop_trade_post_like")
public class CropTradePostLike extends BaseEntity {

    /**
     * 농작물 물물교환 찜 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crop_trade_post_like_id")
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
    @JoinColumn(name = "crop_trade_post_id", nullable = false)
    private CropTradePost cropTradePost;

}
