package com.ssafy.bartter.domain.crop.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/crops/reports")
@Tag(name = "농사일지 AI 요약 리포트 조회 API", description = "농사일지 AI 요약 리포트 조회 API입니다.")
public class CropReportController {
}
