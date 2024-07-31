package com.ssafy.bartter.domain.crop.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Crop Entity
 *
 * @author 김용수
 */
@Entity
@Getter
@Table(name = "crop")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Crop extends BaseEntity {

    /**
     * 농작물 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crop_id")
    private Integer id;

    /**
     * 작물을 키우는 사용자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 작물 카테고리
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_category_id", nullable = false)
    private CropCategory category;

    /**
     * 농작물 닉네임
     */
    @Column(name = "crop_nickname", nullable = false, length = 30)
    private String nickname;

    /**
     * 농작물 이미지
     */
    @Column(name = "crop_image", nullable = true, length = 300)
    private String image;

    /**
     * 농작물 설명
     */
    @Column(name = "crop_description", nullable = true, length = 100)
    private String description;

    /**
     * 재배 시작 날짜
     */
    @Column(name = "crop_grow_date", nullable = false)
    private LocalDate growDate;

    /**
     * 해당 농작물의 농사일지
     */
    @OneToMany(mappedBy = "crop", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CropDiary> diaryList = new ArrayList<>();

    /**
     * 해당 농작물이 등록된 물물교환 게시글
     */
    @OneToMany(mappedBy = "crop", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TradePost> tradePostList = new ArrayList<>();

    @Builder
    public Crop(User user, CropCategory category, String nickname, String image, String description, LocalDate growDate) {
        this.user = user;
        this.category = category;
        this.nickname = nickname;
        this.image = image;
        this.description = description;
        this.growDate = growDate;
    }
}
