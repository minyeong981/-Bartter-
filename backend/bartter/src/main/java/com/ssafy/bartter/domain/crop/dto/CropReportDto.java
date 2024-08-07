package com.ssafy.bartter.domain.crop.dto;

import com.ssafy.bartter.domain.report.entity.CropReport;
import lombok.Builder;
import lombok.Getter;

import java.time.DayOfWeek;
import java.time.temporal.WeekFields;

public class CropReportDto {

    @Getter
    @Builder
    public static class CropReportDetail {
        private final int reportId;
        private final String cropNickname;
        private final String cropProfileImage;
        private final String reportTitle;
        private final String reportContent;
        private final int month;
        private final int weekOfMonth;

        public static CropReportDetail of(CropReport cropReport) {
            int weekOfMonth = CropReportDto.getWeekOfMonth(cropReport);

            return CropReportDetail.builder()
                    .reportId(cropReport.getId())
                    .cropNickname(cropReport.getCrop().getNickname())
                    .cropProfileImage(cropReport.getCrop().getImage())
                    .reportTitle(cropReport.getTitle())
                    .reportContent(cropReport.getContent())
                    .month(cropReport.getCreatedAt().getMonthValue())
                    .weekOfMonth(weekOfMonth)
                    .build();
        }
    }

    @Getter
    @Builder
    public static class SimpleCropReportDetail {
        private final int reportId;
        private final String cropProfileImage;
        private final String reportTitle;
        private final int month;
        private final int weekOfMonth;

        public static SimpleCropReportDetail of(CropReport cropReport) {
            int weekOfMonth = CropReportDto.getWeekOfMonth(cropReport);

            return SimpleCropReportDetail.builder()
                    .reportId(cropReport.getId())
                    .cropProfileImage(cropReport.getCrop().getImage())
                    .reportTitle(cropReport.getTitle())
                    .month(cropReport.getCreatedAt().getMonthValue())
                    .weekOfMonth(weekOfMonth)
                    .build();
        }
    }

    private static int getWeekOfMonth(CropReport cropReport) {
        WeekFields weekFields = WeekFields.of(DayOfWeek.MONDAY, 1);
        int weekOfMonth = cropReport.getCreatedAt().get(weekFields.weekOfMonth());
        return weekOfMonth;
    }
}
