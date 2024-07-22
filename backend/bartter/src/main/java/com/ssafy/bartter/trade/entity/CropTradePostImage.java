package com.ssafy.bartter.trade.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import jakarta.persistence.*;

/**
 * Crop Trade Post Image Entity
 *
 * @author 김용수
 */
@Entity
@Table(name = "crop_trade_post_image")
public class CropTradePostImage extends BaseEntity {

    /**
     * 물물교환 이미지 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crop_trade_post_image_id")
    private Integer id;

    /**
     * 이미지를 가진 물물교환 게시글
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_trade_post_id", nullable = false)
    private CropTradePost cropTradePost;

    /**
     * AWS S3에 업로드 된 이미지 주소
     */
    @Column(name = "crop_trade_post_image_url", nullable = false, length = 300)
    private String imageUrl;

    /**
     * 이미지 순서
     */
    @Column(name = "crop_trade_post_image_order",nullable = false)
    private Integer order;
}
