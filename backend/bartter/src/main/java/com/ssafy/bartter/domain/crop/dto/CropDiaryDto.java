package com.ssafy.bartter.domain.crop.dto;

import com.ssafy.bartter.domain.crop.dto.CropDto.SimpleCropProfile;
import com.ssafy.bartter.domain.crop.entity.CropDiary;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 농사일지 DTO
 *
 * @author 김가람
 */
public class CropDiaryDto {

    /**
     * 농사일지 생성 Request
     */
    @Getter
    @AllArgsConstructor
    public static class Create {
        @NotNull(message = "농작물 프로필 정보를 입력하세요.")
        private final Integer cropId;

        @NotBlank(message = "농사일지의 제목을 입력하세요.")
        private final String title;

        @NotBlank(message = "농사일지의 내용을 입력하세요.")
        private final String content;

        private final LocalDate performDate;
    }

    /**
     * 농사일지 Response
     */
    @Builder
    @Getter
    @AllArgsConstructor
    public static class CropDiaryDetail {
        private final int cropDiaryId;
        private final SimpleCropProfile crop;
        private final String title;
        private final String content;
        private final String image;
        private final LocalDate performDate;
        private final LocalDateTime createdAt;

        public static CropDiaryDetail of(CropDiary diary) {
            return CropDiaryDetail.builder()
                    .cropDiaryId(diary.getId())
                    .crop(SimpleCropProfile.of(diary.getCrop()))
                    .title(diary.getTitle())
                    .content(diary.getContent())
                    .image(diary.getImage())
                    .performDate(diary.getPerformDate())
                    .createdAt(diary.getCreatedAt())
                    .build();
        }
    }
}
