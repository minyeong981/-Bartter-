package com.ssafy.bartter.domain.crop.service;

import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.domain.crop.entity.CropReport;
import com.ssafy.bartter.domain.crop.repository.CropReportRepository;
import com.ssafy.bartter.domain.crop.repository.CropRepository;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.domain.user.repository.UserRepository;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.WeekFields;
import java.util.List;

/**
 * 농사일지 AI 요약 리포트 Service
 *
 * @author 김가람
 */
@Service
@Transactional
@RequiredArgsConstructor
public class CropReportService {

    private final CropReportRepository cropReportRepository;
    private final UserRepository userRepository;

    public CropReport createCropReport(User user, Crop crop, LocalDate todayDate, String content) {

        WeekFields weekFields = WeekFields.of(DayOfWeek.MONDAY, 1);
        int weekOfMonth = todayDate.get(weekFields.weekOfMonth());

        StringBuilder titleBuilder = new StringBuilder();
        titleBuilder.append(crop.getNickname()).append("의 ");
        titleBuilder.append(todayDate.getMonthValue()).append("월 ");
        titleBuilder.append(weekOfMonth).append("주차 재배 요약 보고서");
        String title = titleBuilder.toString();

        CropReport cropReport = new CropReport(crop, title, content);
        cropReport.addUser(user);

        return cropReportRepository.save(cropReport);
    }

    @Transactional(readOnly = true)
    public List<CropReport> getCropReportList(int userId, LocalDate startDate, LocalDate endDate, boolean desc) {
        Sort.Direction sortDirection = (desc) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sort = Sort.by(sortDirection, "createdAt");
        return cropReportRepository.findAllByDates(userId, startDate, endDate, sort);
    }

    @Transactional(readOnly = true)
    public CropReport getCropReport(int userId, int cropReportId) {
        CropReport cropReport = cropReportRepository.findById(cropReportId).orElseThrow(() -> new CustomException(ErrorCode.CROP_REPORT_NOT_FOUND));

        if (cropReport.getUser().getId() != userId) {
            throw new CustomException(ErrorCode.UNAUTHENTICATED);
        }

        return cropReport;
    }
}

