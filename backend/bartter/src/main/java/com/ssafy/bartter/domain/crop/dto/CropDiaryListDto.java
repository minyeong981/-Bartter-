package com.ssafy.bartter.domain.crop.dto;

import com.ssafy.bartter.domain.crop.dto.CropDiaryDto.CropDiaryThumbnail;
import com.ssafy.bartter.domain.crop.dto.CropDto.CropForDiaryMetaData;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class CropDiaryListDto {
    private CropForDiaryMetaData cropInfo;
    private List<CropDiaryThumbnail> thumbnailList;
}
