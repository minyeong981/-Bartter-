package com.ssafy.bartter.crop.dto;

import com.ssafy.bartter.crop.dto.CropDto.CropProfile;
import com.ssafy.bartter.crop.entity.Crop;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 유저가 교환 & 나눔한 농작물, 교환 & 나눔받은 농작물 Response DTO
 *
 * @author 김가람
 */
@Builder
@Getter
@AllArgsConstructor
public class CropTradeHistoryDto {
    private final List<CropProfile> give;
    private final List<CropProfile> receive;

    public static CropTradeHistoryDto of(List<Crop> give, List<Crop> receive) {
        return CropTradeHistoryDto.builder()
                .give(give.stream().map(CropProfile::of).collect(Collectors.toList()))
                .receive(receive.stream().map(CropProfile::of).collect(Collectors.toList()))
                .build();
    }
}
