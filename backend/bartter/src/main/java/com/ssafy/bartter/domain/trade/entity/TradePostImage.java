package com.ssafy.bartter.domain.trade.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Trade Post Image Entity
 *
 * @author 김용수
 */
@Entity
@Getter
@Table(name = "trade_post_image")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TradePostImage extends BaseEntity {

    /**
     * 물물교환 이미지 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trade_post_image_id")
    private Integer id;

    /**
     * 이미지를 가진 물물교환 게시글
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_post_id", nullable = false)
    private TradePost tradePost;

    /**
     * AWS S3에 업로드 된 이미지 주소
     */
    @Column(name = "trade_post_image_url", nullable = false, length = 300)
    private String imageUrl;

    /**
     * 이미지 순서
     */
    @Column(name = "trade_post_image_order",nullable = false)
    private Integer order;
}
