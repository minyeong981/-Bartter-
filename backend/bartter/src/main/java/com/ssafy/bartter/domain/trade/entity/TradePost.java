package com.ssafy.bartter.domain.trade.entity;

import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.domain.crop.entity.CropCategory;
import com.ssafy.bartter.global.common.BaseEntity;
import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;

import java.util.ArrayList;
import java.util.List;

/**
 * Trader Post Entity
 *
 * @author 김용수
 */
@Entity
@Getter
@ToString
@Table(name = "trade_post")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TradePost extends BaseEntity {

    /**
     * 물물교환 ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "trade_post_id")
    private Integer id;

    /**
     * 물물교환 게시글 작성자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 물물교환 게시글 농작물
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = true)
    private Crop crop;

    /**
     * 해당 물물교환 게시글이 등록되는 위치
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    /**
     * 해당 농작물 카테고리 - 농작물 등록을 안한 경우 직접 설정
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_category_id", nullable = false)
    private CropCategory category;

    /**
     * 농작물 물물교환 게시글 제목
     */
    @Column(name = "trade_post_title")
    private String title;

    /**
     * 농작물 물물교환 게시글 내용
     */
    @Column(name = "trade_post_content")
    private String content;

    /**
     * 농작물 물물교환 게시글 나눔여부
     */
    @Column(name = "trade_is_share")
    private boolean isShare;

    /**
     * 농작물 물물교환 상태
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "trade_post_status")
    private TradeStatus status = TradeStatus.NEW;

    /**
     * 물물교환 희망 농작물 카테고리 - 받고 싶은 농작물 카테고리
     */
    @OneToMany(mappedBy = "tradePost", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TradeWishCropCategory> wishCropCategoryList = new ArrayList<>();

    /**
     * 물물교환 게시글 이미지 목록
     */
    @OneToMany(mappedBy = "tradePost", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @BatchSize(size = 3)
    private List<TradePostImage> imageList = new ArrayList<>();

    /**
     * 농작물 물물교환 게시글 찜
     */
    @OneToMany(mappedBy = "tradePost", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @BatchSize(size = 100)
    private List<TradePostLike> likeList = new ArrayList<>();

    /**
     * 농작물 물물교환 게시글 거래내역
     */
    @OneToMany(mappedBy = "tradePost", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Trade> tradeList = new ArrayList<>();

    @Builder
    public TradePost(User user, Crop crop, Location location, CropCategory category,
                     String title, String content, boolean isShare) {
        this.user = user;
        this.crop = crop;
        this.location = location;
        this.category = category;
        this.title = title;
        this.content = content;
        this.isShare = isShare;
    }
}
