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
        @NotNull
        private final Integer userId;
        @NotNull
        private final Integer cropCategoryId;
        @NotBlank
        private final String nickname;
        @NotNull
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
        private final User user;
        private final CropCategory cropCategory;
        private final String nickname;
        private final LocalDate growDate;
        private final String description;

        public static CropProfile of(Crop crop) {
            return CropProfile.builder()
                    .cropId(crop.getId())
                    .user(crop.getUser())
                    .cropCategory(crop.getCategory())
                    .nickname(crop.getNickname())
                    .growDate(crop.getGrowDate())
                    .description(crop.getDescription())
                    .build();
        }
    }
}
