package com.ssafy.bartter.domain.crop.dto;

import com.ssafy.bartter.domain.crop.dto.CropDto.SimpleCropProfile;
import com.ssafy.bartter.domain.crop.entity.Crop;
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
public class CropTradeHistoryDto {
    private final List<SimpleCropProfile> give;
    private final List<SimpleCropProfile> receive;

    public static CropTradeHistoryDto of(List<Crop> give, List<Crop> receive) {
        return CropTradeHistoryDto.builder()
                .give(give.stream().map(SimpleCropProfile::of).collect(Collectors.toList()))
                .receive(receive.stream().map(SimpleCropProfile::of).collect(Collectors.toList()))
                .build();
    }
}
