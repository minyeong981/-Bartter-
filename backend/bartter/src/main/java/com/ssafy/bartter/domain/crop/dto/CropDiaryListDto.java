package com.ssafy.bartter.domain.crop.dto;

import com.ssafy.bartter.domain.crop.dto.CropDiaryDto.CropDiaryThumbnail;
import com.ssafy.bartter.domain.crop.dto.CropDto.CropForDiaryMetaData;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CropDiaryListDto {
    public CropForDiaryMetaData cropInfo;
    public List<CropDiaryThumbnail> thumbnailList;
}
