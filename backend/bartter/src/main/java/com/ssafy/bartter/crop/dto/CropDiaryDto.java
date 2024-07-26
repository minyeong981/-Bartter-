package com.ssafy.bartter.crop.dto;

import com.ssafy.bartter.crop.entity.Crop;
import com.ssafy.bartter.crop.entity.CropCategory;
import com.ssafy.bartter.crop.entity.CropDiary;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static com.ssafy.bartter.crop.dto.CropDto.*;

/**
 * CropDiary Entity 관련 DTO
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
        @NotNull(message = "유저 정보를 입력하세요.")
        private final Integer userId;

        @NotNull(message = "농작물 프로필 정보를 입력하세요.")
        private final Integer cropId;

        @NotBlank(message = "농사일지의 제목을 입력하세요.")
        private final String title;

        @NotBlank(message = "농사일지의 내용을 입력하세요.")
        private final LocalDate content;

        @NotNull(message = "이미지를 업로드하세요.")
        private final MultipartFile image;
    }

    /**
     * 농사일지 Response
     */
    @Builder
    @Getter
    @AllArgsConstructor
    public static class CropDiaryDetail {
        private final SimpleCropProfile crop;
        private final String title;
        private final String content;
        private final String image;
        private final LocalDateTime createdAt;

        public static CropDiaryDetail of(CropDiary diary) {
            return CropDiaryDetail.builder()
                    .crop(SimpleCropProfile.of(diary.getCrop()))
                    .title(diary.getTitle())
                    .content(diary.getContent())
                    .image(diary.getImage())
                    .createdAt(diary.getCreatedAt())
                    .build();
        }
    }
}
