package com.ssafy.bartter.crop.controller;

import com.ssafy.bartter.auth.annotation.CurrentUser;
import com.ssafy.bartter.auth.dto.UserAuthDto;
import com.ssafy.bartter.crop.entity.CropDiary;
import com.ssafy.bartter.crop.service.CropDiaryService;
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

import static com.ssafy.bartter.crop.dto.CropDiaryDto.Create;
import static com.ssafy.bartter.crop.dto.CropDiaryDto.CropDiaryDetail;

@RestController
@RequiredArgsConstructor
@RequestMapping("/crops/diaries")
@Tag(name = "농사일지 API", description = "농사일지 등록/조회/삭제 관련 API입니다.")
public class CropDiaryController {

    private final CropDiaryService cropDiaryService;

    @Operation(summary = "농사일지 작성", description = "농사일지를 작성한다.")
    @PostMapping("")
    public SuccessResponse<CropDiaryDetail> createCropDiary(
            @CurrentUser UserAuthDto userAuthDto,
            @ModelAttribute @Valid Create request,
            BindingResult bindingResult,
            MultipartFile image
    ) {
        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, bindingResult);
        }

        CropDiary diary = cropDiaryService.createCropDiary(request, image, userAuthDto.getId());
        CropDiaryDetail response = CropDiaryDetail.of(diary);
        return SuccessResponse.of(response);
    }

    @Operation(summary = "농사일지 상세 조회", description = "농사일지 PK로 농사일지를 조회한다.")
    @GetMapping("/{cropDiaryId}")
    public SuccessResponse<CropDiaryDetail> getCropDiary(@PathVariable("cropDiaryId") Integer cropDiaryId) {
        CropDiary diary = cropDiaryService.getCropDiary(cropDiaryId);
        CropDiaryDetail response = CropDiaryDetail.of(diary);
        return SuccessResponse.of(response);
    }

    @Operation(summary = "농사일지 삭제", description = "해당 농사일지 PK를 가진 농사일지를 찾아 삭제한다.")
    @DeleteMapping("/{cropDiaryId}")
    public SuccessResponse<Void> deleteCropDiary(
            @PathVariable("cropDiaryId") Integer cropDiaryId,
            @CurrentUser UserAuthDto userAuthDto
    ) {
        cropDiaryService.deleteCropDiary(cropDiaryId, userAuthDto.getId());
        return SuccessResponse.empty();
    }
}
