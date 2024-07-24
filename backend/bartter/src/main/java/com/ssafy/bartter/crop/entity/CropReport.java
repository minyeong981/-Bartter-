package com.ssafy.bartter.crop.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import com.ssafy.bartter.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

/**
 * Crop Report Entity
 *
 * @author 김가람
 */
@Entity
@Table(name = "crop_report")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CropReport extends BaseEntity {

    /**
     * AI 리포트 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crop_report_id")
    private Integer id;

    /**
     * AI 리포트 작성자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * AI 리포트 작성 대상인 농작물
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    /**
     * AI 리포트 제목
     */
    @Column(name = "crop_report_title", nullable = false, length = 50)
    private String title;

    /**
     * AI 리포트 내용
     */
    @Column(name = "crop_report_content", nullable = false, length = 2000)
    private String content;
}
