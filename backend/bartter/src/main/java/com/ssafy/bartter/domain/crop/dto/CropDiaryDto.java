package com.ssafy.bartter.domain.crop.dto;

import com.ssafy.bartter.domain.crop.dto.CropDto.SimpleCropProfile;
import com.ssafy.bartter.domain.crop.entity.CropDiary;
import com.ssafy.bartter.domain.user.dto.UserDto;
import com.ssafy.bartter.domain.user.dto.UserDto.SimpleUserProfile;
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

    /**
     * 농사일지 작성자의 정보가 추가된 농사일지 Response
     * - 메인 화면에서 사용
     */
    @Builder
    @Getter
    public static class CropDiaryDetailWithUser {
        private final SimpleUserProfile author;
        private final String image;
        private final String title;
        private final String content;
        private final LocalDateTime createdAt;

        public static CropDiaryDetailWithUser of(CropDiary diary) {
            return CropDiaryDetailWithUser.builder()
                    .author(SimpleUserProfile.of(diary.getCrop().getUser()))
                    .image(diary.getImage())
                    .title(diary.getTitle())
                    .content(diary.getContent())
                    .createdAt(diary.getCreatedAt())
                    .build();
        }
    }

    /**
     * 오직 농사일지 ID와 농사일지 이미지만 들어있는 Response
     */
    @Builder
    @Getter
    public static class CropDiaryThumbnail {
        private final int cropDiaryId;
        private final String image;
        private final LocalDate performDate;

        public static CropDiaryThumbnail of(CropDiary diary) {
            return CropDiaryThumbnail.builder()
                    .cropDiaryId(diary.getId())
                    .image(diary.getImage())
                    .performDate(diary.getPerformDate())
                    .build();
        }
    }
}
