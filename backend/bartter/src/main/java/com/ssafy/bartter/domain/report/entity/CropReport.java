package com.ssafy.bartter.domain.report.entity;

import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.global.common.BaseEntity;
import com.ssafy.bartter.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Crop Report Entity
 *
 * @author 김가람
 */
@Entity
@Getter
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

    @Builder
    public CropReport(Crop crop, String title, String content) {
        this.crop = crop;
        this.title = title;
        this.content = content;
    }

    public void addUser(User user) {
        this.user = user;
        getUser().getCropReportList().add(this);
    }
}
