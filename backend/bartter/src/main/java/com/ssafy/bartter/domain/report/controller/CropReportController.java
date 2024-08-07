package com.ssafy.bartter.domain.report.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.report.dto.CropReportDto.SimpleCropReportDetail;
import com.ssafy.bartter.domain.report.entity.CropReport;
import com.ssafy.bartter.domain.report.service.CropReportService;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.bartter.domain.report.dto.CropReportDto.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/crops/reports")
@Tag(name = "농사일지 AI 요약 리포트 조회 API", description = "농사일지 AI 요약 리포트 조회 API입니다.")
public class CropReportController {

    private final CropReportService cropReportService;

    @Operation(summary = "AI 요약 리포트 전체 조회", description = "현재 로그인한 유저의 특정 기간 사이에 생성된 AI 요약 리포트를 조회한다.")
    @GetMapping("")
    public SuccessResponse<List<SimpleCropReportDetail>> getCropReportList(
            @RequestParam(value = "startDate") LocalDate startDate,
            @RequestParam(value = "endDate") LocalDate endDate,
            @RequestParam(value = "desc", defaultValue = "false") boolean desc,
            @CurrentUser UserAuthDto currentUser
    ) {
        List<CropReport> cropReportList = cropReportService.getCropReportList(currentUser.getId(), startDate, endDate, desc);
        List<SimpleCropReportDetail> response = cropReportList.stream().map(SimpleCropReportDetail::of).collect(Collectors.toList());
        return SuccessResponse.of(response);
    }

    @Operation(summary = "AI 요약 리포트 상세 조회", description = "AI 요약 리포트의 PK를 통해 상세조회한다.")
    @GetMapping("/{cropReportId}")
    public SuccessResponse<CropReportDetail> getCropReport(
            @PathVariable("cropReportId") int cropReportId,
            @CurrentUser UserAuthDto currentUser
    ) {
        CropReport cropReport = cropReportService.getCropReport(currentUser.getId(), cropReportId);
        CropReportDetail response = CropReportDetail.of(cropReport);
        return SuccessResponse.of(response);
    }
}
