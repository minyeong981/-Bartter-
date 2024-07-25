package com.ssafy.bartter.crop.dto;

import com.ssafy.bartter.crop.entity.Crop;
import com.ssafy.bartter.crop.entity.CropCategory;
import com.ssafy.bartter.user.entity.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

import static com.ssafy.bartter.crop.dto.CropCategoryDto.*;


/**
 * Crop Entity 관련 DTO
 *
 * @author 김가람
 */
public class CropDto {

    /**
     * 농작물 프로필 생성 Request
     */
    @Getter
    @AllArgsConstructor
    public static class Create {
        @NotNull(message = "유저 정보를 입력하세요.")
        private final Integer userId;

        @NotNull(message = "농작물 카테고리 정보를 입력하세요.")
        private final Integer cropCategoryId;

        @NotBlank(message = "닉네임을 입력하세요.")
        private final String nickname;

        @NotNull(message = "파종 날짜를 입력하세요.")
        private final LocalDate growDate;

        private final MultipartFile image;

        private String description;
    }

    /**
     * 농작물 프로필 Response
     */
    @Builder
    @Getter
    @AllArgsConstructor
    public static class CropProfile {
        private final Integer cropId;
        private final Integer userId;
        private final CropCategoryDetail cropCategory;
        private final String nickname;
        private final LocalDate growDate;
        private final String description;

        public static CropProfile of(Crop crop) {
            return CropProfile.builder()
                    .cropId(crop.getId())
                    .userId(crop.getUser().getId())
                    .cropCategory(CropCategoryDetail.of(crop.getCategory()))
                    .nickname(crop.getNickname())
                    .growDate(crop.getGrowDate())
                    .description(crop.getDescription())
                    .build();
        }
    }
}
