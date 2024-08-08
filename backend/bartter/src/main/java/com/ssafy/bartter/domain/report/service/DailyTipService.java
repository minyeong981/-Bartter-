package com.ssafy.bartter.domain.report.service;

import com.ssafy.bartter.domain.report.entity.CropReport;
import com.ssafy.bartter.domain.report.entity.DailyTip;
import com.ssafy.bartter.domain.report.repository.DailyTipRepository;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

/**
 * 하루 농사 알리미 Service
 *
 * @author 김가람
 */
@Service
@Transactional
@RequiredArgsConstructor
public class DailyTipService {

    private final DailyTipRepository dailyTipRepository;

    public DailyTip createDailyTip(String alarmMessage, User user, int weekday) {
        DailyTip dailyTip = DailyTip.builder()
                .weekday(weekday)
                .content(alarmMessage)
                .build();

        dailyTip.addUser(user);
        return dailyTipRepository.save(dailyTip);
    }

    public void disableAll() {
        dailyTipRepository.updateAllEnableFalse();
    }

    @Transactional(readOnly = true)
    public Optional<DailyTip> getDailyTip(int userId) {
        int today = LocalDate.now().getDayOfWeek().getValue();
        Optional<DailyTip> tip = dailyTipRepository.getDailyTip(userId, today);
        return tip;
    }

    public void disableDailyTip(int userId) {
        int today = LocalDate.now().getDayOfWeek().getValue();
        DailyTip tip = dailyTipRepository.getDailyTip(userId, today).orElseThrow(() ->  new CustomException(ErrorCode.DAILY_TIP_ALREADY_DISABLED));
        dailyTipRepository.updateEnableFalse(userId, today);
    }
}
