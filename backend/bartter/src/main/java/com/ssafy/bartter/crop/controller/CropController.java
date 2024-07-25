package com.ssafy.bartter.crop.controller;


import com.ssafy.bartter.crop.entity.Crop;
import com.ssafy.bartter.crop.entity.CropCategory;
import com.ssafy.bartter.crop.service.CropService;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.bartter.crop.dto.CropCategoryDto.CropCategoryDetail;
import static com.ssafy.bartter.crop.dto.CropDto.Create;
import static com.ssafy.bartter.crop.dto.CropDto.CropProfile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/crops")
@Tag(name = "농작물 프로필 API", description = "농작물 프로필 등록/조회/삭제 관련 API입니다.")
public class CropController {

    private final CropService cropService;

    @Operation(summary = "농작물 등록", description = "농작물 프로필을 등록한 후 생성된 데이터를 반환한다.")
    @PostMapping("")
    public SuccessResponse<CropProfile> createCrop(@RequestBody @Valid Create request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new RuntimeException();
        }
        Crop crop = cropService.createCrop(request);
        CropProfile response = CropProfile.of(crop);
        return new SuccessResponse<>(response);
    }

    @Operation(summary = "농작물 카테고리 조회", description = "농작물 카테고리의 목록을 조회한다.")
    @GetMapping("")
    public SuccessResponse<List<CropCategoryDetail>> getCropCategoryList() {
        List<CropCategory> cropCategoryList = cropService.getCropCategoryList();

        List<CropCategoryDetail> response = cropCategoryList.stream()
                .map(CropCategoryDetail::of)
                .collect(Collectors.toList());
        return new SuccessResponse<>(response);
    }
}
