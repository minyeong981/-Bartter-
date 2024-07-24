package com.ssafy.bartter.crop.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import com.ssafy.bartter.trade.entity.TradePost;
import com.ssafy.bartter.trade.entity.TradeWishCropCategory;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Crop Category Entity
 *
 * @author 김용수
 */
@Entity
@Table(name = "crop_category")
public class CropCategory extends BaseEntity {

    /**
     * 농작물 카테고리 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crop_category_id")
    private Integer id;

    /**
     * 농작물 카테고리 이름
     */
    @Column(name = "crop_category_name", nullable = false, length = 20)
    private String name;

    /**
     * 농작물 카테고리 이미지
     */
    @Column(name = "crop_category_image", nullable = false, length = 300)
    private String image;

    /**
     * 해당 카테고리에 속한 농작물 목록
     */
    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Crop> cropList = new ArrayList<>();

    /**
     * 해당 카테고리에 속한 물물교환 게시글 목록
     */
    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TradePost> tradePostList = new ArrayList<>();

    /**
     * 희망 농작물 카테고리 목록
     */
    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TradeWishCropCategory> tradeWishList = new ArrayList<>();
}
