package com.ssafy.bartter.domain.crop.dto;

import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.domain.user.dto.UserDto.SimpleUserProfile;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;


/**
 * 농작물 프로필 DTO
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
        @NotNull(message = "농작물 카테고리 정보를 입력하세요.")
        private final Integer cropCategoryId;

        @NotBlank(message = "닉네임을 입력하세요.")
        private final String nickname;

        @NotNull(message = "파종 날짜를 입력하세요.")
        private final LocalDate growDate;

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
        private final SimpleUserProfile farmer;
        private final CropCategoryDto.CropCategoryDetail cropCategory;
        private final String nickname;
        private final String image;
        private final LocalDate growDate;
        private final String description;

        public static CropProfile of(Crop crop) {
            return CropProfile.builder()
                    .cropId(crop.getId())
                    .farmer(SimpleUserProfile.of(crop.getUser()))
                    .cropCategory(CropCategoryDto.CropCategoryDetail.of(crop.getCategory()))
                    .nickname(crop.getNickname())
                    .growDate(crop.getGrowDate())
                    .description(crop.getDescription())
                    .image(crop.getImage())
                    .build();
        }
    }

    /**
     * 간단한 농작물 프로필 Response
     */
    @Builder
    @Getter
    @AllArgsConstructor
    public static class SimpleCropProfile {
        private final Integer userId;
        private final Integer cropId;
        private final String nickname;
        private final String image;

        public static SimpleCropProfile of(Crop crop) {
            return SimpleCropProfile.builder()
                    .userId(crop.getUser().getId())
                    .cropId(crop.getId())
                    .nickname(crop.getNickname())
                    .image(crop.getImage())
                    .build();
        }
    }
}
