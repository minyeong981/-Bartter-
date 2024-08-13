package com.ssafy.bartter.domain.report.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.report.entity.DailyTip;
import com.ssafy.bartter.domain.report.service.DailyTipService;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/crops/tips")
@Tag(name = "하루농사 알리미 조회 API", description = "농사일지 AI 요약 리포트 조회 API입니다.")
public class DailyTipController {

    private final DailyTipService dailyTipService;

    @Operation(summary = "하루농사 알리미 조회", description = "오늘의 하루농사 알리미를 조회합니다.")
    @GetMapping("")
    public SuccessResponse<String> getDailyTip(
            @CurrentUser UserAuthDto currentUser
    ) {
        Optional<DailyTip> tip = dailyTipService.getDailyTip(currentUser.getId());
        String response = tip.isPresent() ? tip.get().getContent() : "";
        return SuccessResponse.of(response);
    }

    @Operation(summary = "하루농사 알리미 삭제", description = "오늘의 하루농사 알리미의 속성 isEnabled를 False로 변경합니다.")
    @PatchMapping("")
    public SuccessResponse<Void> disableDailyTip(
            @CurrentUser UserAuthDto currentUser
    ) {
        dailyTipService.disableDailyTip(currentUser.getId());
        return SuccessResponse.empty();
    }
}
