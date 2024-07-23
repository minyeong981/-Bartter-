package com.ssafy.bartter.trade.entity;

import com.ssafy.bartter.crop.entity.CropCategory;
import jakarta.persistence.*;

/**
 * Trade Wish Crop Category Entity
 *
 * @author 김용수
 */
@Entity
@Table(name = "trade_wish_crop_category")
public class TradeWishCropCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trade_wish_crop_category_id", nullable = false)
    private Integer id;

    /**
     * 희망 농작물 카테고리
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_category_id", nullable = false)
    private CropCategory category;

    /**
     * 물물교환 게시글
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_post_id", nullable = false)
    private TradePost tradePost;
}
