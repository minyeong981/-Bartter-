package com.ssafy.bartter.crop.dto;

import com.ssafy.bartter.crop.entity.Crop;
import com.ssafy.bartter.crop.entity.CropCategory;
import com.ssafy.bartter.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;


/**
 * CropCategory Entity 관련 DTO
 *
 * @author 김가람
 */
public class CropCategoryDto {
    /**
     * 농작물 카테고리 Response
     */
    @Builder
    @Getter
    @AllArgsConstructor
    public static class CropCategoryDetail {
        private final Integer cropCategoryId;
        private final String name;
        private final String image;

        public static CropCategoryDetail of(CropCategory cropCategory) {
            return CropCategoryDetail.builder()
                    .cropCategoryId(cropCategory.getId())
                    .name(cropCategory.getName())
                    .image(cropCategory.getImage())
                    .build();
        }
    }
}
