package com.ssafy.bartter.domain.user.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.crop.dto.CropDiaryDto.CropDiaryDetailWithUser;
import com.ssafy.bartter.domain.crop.dto.CropTradeHistoryDto;
import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.domain.crop.entity.CropDiary;
import com.ssafy.bartter.domain.crop.service.CropDiaryService;
import com.ssafy.bartter.domain.crop.service.CropService;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.bartter.domain.crop.dto.CropDiaryDto.CropDiaryDetail;
import static com.ssafy.bartter.domain.crop.dto.CropDiaryDto.CropDiaryThumbnail;
import static com.ssafy.bartter.domain.crop.dto.CropDto.SimpleCropProfile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@Tag(name = "유저의 농작물/농사일지 조회 API", description = "특정 유저의 농작물과 농사일지를 조회하는 API 입니다.")
public class UserCropController {

    private final CropService cropService;
    private final CropDiaryService cropDiaryService;

    @Operation(summary = "유저가 기르는 농작물 전체 조회", description = "유저의 PK를 통해 유저가 등록한 농작물 프로필 전체를 조회한다.")
    @GetMapping("/{userId}/crops")
    public SuccessResponse<List<SimpleCropProfile>> getUserCropList(@PathVariable("userId") int userId) {
        List<Crop> cropList = cropService.getUserCropList(userId);
        List<SimpleCropProfile> response = cropList.stream().map(SimpleCropProfile::of).collect(Collectors.toList());
        return SuccessResponse.of(response);
    }

    @Operation(summary = "유저가 교환 & 나눔한 농작물 컬렉션 조회", description = "유저의 PK를 통해 유저가 교환 & 나눔한 농작물과 교환 & 나눔받은 농작물을 조회한다.")
    @GetMapping("/{userId}/crops/trades")
    public SuccessResponse<CropTradeHistoryDto> getUserTradeCropList(@PathVariable("userId") int userId) {
        List<Crop> giveList = cropService.getUserGiveCropList(userId);
        List<Crop> receiveList = cropService.getUserReceiveCropList(userId);

        log.debug("준 : {}",giveList);
        log.debug("받은 : {}",receiveList);
        CropTradeHistoryDto response = CropTradeHistoryDto.of(giveList, receiveList);
        return SuccessResponse.of(response);
    }

    @Operation(summary = "유저가 작성한 농사일지 전체 조회", description = "유저의 PK를 통해 유저가 작성한 농사일지 전체를 조회한다.")
    @GetMapping("/{userId}/crops/diaries")
    public SuccessResponse<List<CropDiaryThumbnail>> getUserDiaryList(
            @PathVariable("userId") int userId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "6") int limit,
            @RequestParam(value = "year", defaultValue = "0") int year,
            @RequestParam(value = "month", defaultValue = "0") int month
    ) {
        List<CropDiary> diaryList = cropDiaryService.getUserDiaryList(userId, page, limit, year, month);
        List<CropDiaryThumbnail> response = diaryList.stream().map(CropDiaryThumbnail::of).collect(Collectors.toList());
        return SuccessResponse.of(response);
    }

    @Operation(summary = "특정 날짜에 유저가 작성한 농사일지 전체 조회", description = "특정 날짜에 유저가 작성한 농사일지를 전체 조회한다.")
    @GetMapping("/{userId}/crops/diaries/daily")
    public SuccessResponse<List<CropDiaryDetail>> getUserDiaryListByDate(
            @PathVariable("userId") int userId,
            @RequestParam(value = "date") LocalDate date
    ) {
        List<CropDiary> diaryList = cropDiaryService.getUserDiaryListByDate(userId, date);
        List<CropDiaryDetail> response = diaryList.stream().map(CropDiaryDetail::of).toList();
        return SuccessResponse.of(response);
    }

    @Operation(summary = "현재 로그인한 유저가 특정달에 농사일지를 작성한 일자들을 조회", description = "특정 달에 유저가 농사일지를 작성한 일자들을 조회하여 리스트로 반환한다.")
    @GetMapping("/crops/diaries/dates")
    public SuccessResponse<List<LocalDate>> getUserDiaryWrittenDateList(
            @CurrentUser UserAuthDto currentUser,
            @RequestParam(value = "year") int year,
            @RequestParam(value = "month") int month
    ) {
        List<LocalDate> response = cropDiaryService.getUserDiaryWrittenDateList(currentUser.getId(), year, month);
        return SuccessResponse.of(response);
    }

    @Operation(summary = "로그인한 유저가 팔로우하는 이웃들의 농사일지 조회", description = "현재 로그인한 유저가 팔로우 한 사람들의 농사일지를 조회한다.")
    @GetMapping("/follows/diaries")
    public SuccessResponse<List<CropDiaryDetailWithUser>> getUserDiaryList(
            @CurrentUser UserAuthDto currentUser,
            @RequestParam(value = "count", defaultValue = "5") int count
    ) {
        List<CropDiary> diaryList = cropDiaryService.getFolloweeDiaryList(currentUser.getId(), count);
        List<CropDiaryDetailWithUser> response = diaryList.stream().map(CropDiaryDetailWithUser::of).collect(Collectors.toList());
        return SuccessResponse.of(response);
    }
}
