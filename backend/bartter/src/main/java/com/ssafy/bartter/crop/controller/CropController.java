package com.ssafy.bartter.crop.controller;


import com.ssafy.bartter.crop.service.CropService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/crop")
@Tag(name = "농작물 관련 API", description = "농작물 등록/조회/삭제 관련 API입니다.")
public class CropController {

    private final CropService cropService;

//    @Operation(
//            summary = "농작물 등록",
//            description = "요청 본문에 담긴 정보를 이용하여 농작물을 등록 후 해당 인스턴스를 리턴"
//    )
//    @PostMapping("/profile")
//    public SuccessResponse<CropDTO> createCrop(
//            @RequestBody @Valid CropDTO.Request request
//    ) {
//        CropService.createCrop(request);
//    }
}
