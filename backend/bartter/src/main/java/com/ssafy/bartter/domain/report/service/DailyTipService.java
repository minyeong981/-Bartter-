package com.ssafy.bartter.domain.report.service;

import com.ssafy.bartter.domain.report.entity.DailyTip;
import com.ssafy.bartter.domain.report.repository.DailyTipRepository;
import com.ssafy.bartter.domain.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
