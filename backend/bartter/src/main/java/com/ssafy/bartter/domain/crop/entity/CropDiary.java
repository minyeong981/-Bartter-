package com.ssafy.bartter.domain.crop.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

/**
 * Crop Diary Entity
 *
 * @author 김용수
 */
@Entity
@Getter
@Table(name = "crop_diary")
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CropDiary extends BaseEntity {

    /**
     * 농사일지 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crop_diary_id")
    private Integer id;

    /**
     * 농사일지를 작성하는 농작물
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    /**
     * 농사일지 제목
     */
    @Column(name = "crop_diary_title", nullable = false, length = 50)
    private String title;

    /**
     * 농사일지 내용
     */
    @Column(name = "crop_diary_content", nullable = false, length = 2000)
    private String content;

    /**
     * 농사일지 사진
     */
    @Column(name = "crop_diary_image", nullable = false, length = 300)
    private String image;

    /**
     * 실제 농작업을 수행한 날짜
     */
    @Column(name = "crop_diary_perform_date", nullable = false)
    private LocalDate performDate;

    @Builder
    public CropDiary(Crop crop, String title, String content, String image, LocalDate performDate) {
        this.crop = crop;
        this.title = title;
        this.content = content;
        this.image = image;
        this.performDate = performDate;
    }
}
