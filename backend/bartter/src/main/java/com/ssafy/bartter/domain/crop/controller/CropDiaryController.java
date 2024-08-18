package com.ssafy.bartter.domain.crop.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.crop.dto.CropDiaryDto.CropDiaryThumbnail;
import com.ssafy.bartter.domain.crop.dto.CropDiaryListDto;
import com.ssafy.bartter.domain.crop.dto.CropDto;
import com.ssafy.bartter.domain.crop.dto.CropDto.CropForDiaryMetaData;
import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.domain.crop.entity.CropDiary;
import com.ssafy.bartter.domain.crop.service.CropDiaryService;
import com.ssafy.bartter.domain.crop.service.CropService;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.bartter.domain.crop.dto.CropDiaryDto.Create;
import static com.ssafy.bartter.domain.crop.dto.CropDiaryDto.CropDiaryDetail;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/crops/diaries")
@Tag(name = "농사일지 API", description = "농사일지 등록/조회/삭제 관련 API입니다.")
public class CropDiaryController {

    private final CropDiaryService cropDiaryService;
    private final CropService cropService;

    @Operation(summary = "농사일지 작성", description = "농사일지를 작성한다.")
    @PostMapping("")
    public SuccessResponse<CropDiaryDetail> createCropDiary(
            @Valid Create request,
            BindingResult bindingResult,
            @RequestPart(value = "image") MultipartFile image,
            @CurrentUser UserAuthDto currentUser
    ) {
        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, bindingResult);
        }

        CropDiary diary = cropDiaryService.createCropDiary(request, image, currentUser.getId());
        CropDiaryDetail response = CropDiaryDetail.of(diary);
        return SuccessResponse.of(response);
    }

    @Operation(summary = "농사일지 상세 조회", description = "농사일지 PK로 농사일지를 조회한다.")
    @GetMapping("/{cropDiaryId}")
    public SuccessResponse<CropDiaryDetail> getCropDiary(@PathVariable("cropDiaryId") int cropDiaryId) {
        CropDiary diary = cropDiaryService.getCropDiary(cropDiaryId);
        CropDiaryDetail response = CropDiaryDetail.of(diary);
        return SuccessResponse.of(response);
    }

    @Operation(summary = "농작물 ID로 농사일지 전체 조회", description = "해당 농작물의 농사일지 리스트를 조회한다.")
    @GetMapping("/{cropId}/diaries")
    public SuccessResponse<CropDiaryListDto> getCropDiaryList(@PathVariable("cropId") int cropId) {
        Crop crop = cropService.getCrop(cropId);
        int tradeCount = cropService.getTradeCount(cropId);

        List<CropDiary> diaryList = cropDiaryService.getCropDiaryList(cropId);
        List<CropDiaryThumbnail> thumbnailList = diaryList.stream().map(CropDiaryThumbnail::of).toList();
        CropForDiaryMetaData metaData = CropForDiaryMetaData.of(crop, tradeCount);

        CropDiaryListDto response = CropDiaryListDto.of(metaData, thumbnailList);
        return SuccessResponse.of(response);
    }

    @Operation(summary = "농사일지 삭제", description = "해당 농사일지 PK를 가진 농사일지를 찾아 삭제한다.")
    @DeleteMapping("/{cropDiaryId}")
    public SuccessResponse<Void> deleteCropDiary(
            @PathVariable("cropDiaryId") int cropDiaryId,
            @CurrentUser UserAuthDto currentUser
    ) {
        cropDiaryService.deleteCropDiary(cropDiaryId, currentUser.getId());
        return SuccessResponse.empty();
    }
}
