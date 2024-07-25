package com.ssafy.bartter.crop.controller;


import com.ssafy.bartter.crop.dto.CropDTO;
import com.ssafy.bartter.crop.entity.Crop;
import com.ssafy.bartter.crop.service.CropService;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/crops")
@Tag(name = "농작물 관련 API", description = "농작물 등록/조회/삭제 관련 API입니다.")
public class CropController {

    private final CropService cropService;

    @Operation(
            summary = "농작물 등록",
            description = "요청 본문에 담긴 정보를 이용하여 농작물을 등록한 후 해당 인스턴스를 리턴"
    )
    @PostMapping("/profiles")
    public SuccessResponse<CropDTO.Response> createCrop(
            @RequestBody @Valid CropDTO.CreateRequest request
    ) {
        Crop crop = cropService.createCrop(request);
        CropDTO.Response response = CropDTO.toResponse(crop);
        return new SuccessResponse<>(response);
    }
}
