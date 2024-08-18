package com.ssafy.bartter.domain.trade.entity;

import com.ssafy.bartter.domain.crop.entity.CropCategory;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Trade Wish Crop Category Entity
 *
 * @author 김용수
 */
@Entity
@Getter
@Table(name = "trade_wish_crop_category")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    public static TradeWishCropCategory of(TradePost tradePost, CropCategory category) {
        TradeWishCropCategory wishCropCategory = new TradeWishCropCategory();
        wishCropCategory.tradePost = tradePost;
        wishCropCategory.category = category;
        return wishCropCategory;
    }
}
