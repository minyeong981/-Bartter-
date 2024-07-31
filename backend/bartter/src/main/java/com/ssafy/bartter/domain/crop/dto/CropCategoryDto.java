package com.ssafy.bartter.domain.crop.dto;

import com.ssafy.bartter.domain.crop.entity.CropCategory;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


/**
 * 농작물 카테고리 DTO
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
