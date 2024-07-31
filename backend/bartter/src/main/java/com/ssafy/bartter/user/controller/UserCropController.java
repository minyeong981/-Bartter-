package com.ssafy.bartter.user.controller;

import com.ssafy.bartter.crop.dto.CropDto.CropProfile;
import com.ssafy.bartter.crop.dto.CropTradeHistoryDto;
import com.ssafy.bartter.crop.entity.Crop;
import com.ssafy.bartter.crop.entity.CropDiary;
import com.ssafy.bartter.crop.service.CropDiaryService;
import com.ssafy.bartter.crop.service.CropService;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.bartter.crop.dto.CropDiaryDto.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Tag(name = "유저의 농작물/농사일지 조회 API", description = "특정 유저의 농작물과 농사일지를 조회하는 API 입니다.")
public class UserCropController {

    private final CropService cropService;
    private final CropDiaryService cropDiaryService;

    @Operation(summary = "유저가 기르는 농작물 전체 조회", description = "유저의 PK를 통해 유저가 등록한 농작물 프로필 전체를 조회한다.")
    @GetMapping("/{userId}/crops")
    public SuccessResponse<List<CropProfile>> getUserCropList(@PathVariable("userId") Integer userId) {
        List<Crop> cropList = cropService.getUserCropList(userId);
        List<CropProfile> response = cropList.stream().map(CropProfile::of).collect(Collectors.toList());
        return SuccessResponse.of(response);
    }

    @Operation(summary = "유저가 작성한 농사일지 전체 조회", description = "유저의 PK를 통해 유저가 작성한 농사일지 전체를 조회한다.")
    @GetMapping("/{userId}/crops/diaries")
    public SuccessResponse<List<CropDiaryDetail>> getUserDiaryList(
            @PathVariable("userId") Integer userId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "6") int limit,
            @RequestParam(value = "year", required = false) Integer year,
            @RequestParam(value = "month", required = false) Integer month,
            @RequestParam(value = "cropId", required = false) Integer cropId
    ) {
        List<CropDiary> diaryList = cropDiaryService.getUserDiaryList(page, limit, year, month, cropId, userId);
        List<CropDiaryDetail> response = diaryList.stream().map(CropDiaryDetail::of).collect(Collectors.toList());
        return SuccessResponse.of(response);
    }

    @Operation(summary = "유저가 교환 & 나눔한 농작물 컬렉션 조회", description = "유저의 PK를 통해 유저가 교환 & 나눔한 농작물과 교환 & 나눔받은 농작물을 조회한다.")
    @GetMapping("/{userId}/crops/trades")
    public SuccessResponse<CropTradeHistoryDto> getUserTradeCropList(@PathVariable("userId") Integer userId) {
        List<Crop> giveList = cropService.getUserGiveCropList(userId);
        List<Crop> receiveList = cropService.getUserReceiveCropList(userId);
        CropTradeHistoryDto response = CropTradeHistoryDto.of(giveList, receiveList);
        return SuccessResponse.of(response);
    }
}
