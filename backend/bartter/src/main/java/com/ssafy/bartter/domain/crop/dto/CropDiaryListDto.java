package com.ssafy.bartter.domain.crop.dto;

import com.ssafy.bartter.domain.crop.dto.CropDiaryDto.CropDiaryThumbnail;
import com.ssafy.bartter.domain.crop.dto.CropDto.CropForDiaryMetaData;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
//@Builder
public class CropDiaryListDto {
    public CropForDiaryMetaData cropInfo;
    public List<CropDiaryThumbnail> thumbnailList;

    public static CropDiaryListDto of(CropForDiaryMetaData cropInfo, List<CropDiaryThumbnail> thumbnailList) {
        CropDiaryListDto dto = new CropDiaryListDto();
        dto.cropInfo = cropInfo;
        dto.thumbnailList = thumbnailList;
        return dto;
    }
}
