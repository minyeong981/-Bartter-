package com.ssafy.bartter.global.scheduler;

import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.domain.report.entity.CropReport;
import com.ssafy.bartter.domain.crop.service.CropService;
import com.ssafy.bartter.domain.report.service.DailyTipService;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.domain.user.services.UserService;
import com.ssafy.bartter.global.service.OpenAIService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * OpenAI 메서드를 특정 시간에 실행하는 OpenAIScheduler
 *
 * @Author 김가람
 */
@Slf4j
@Component
@Transactional
@RequiredArgsConstructor
public class OpenAIScheduler {

    private final UserService userService;
    private final CropService cropService;
    private final OpenAIService openAiService;
    private final DailyTipService dailyTipService;

    /**
     * 일요일 아침 6시마다 등록된 모든 유저의 요약 리포트와 알람을 생성하여 저장
     */
    @Scheduled(cron = "0 0 6 * * 0")
    public void saveDailyTipMessage() throws IOException {
        List<User> allUserList = userService.getAllUsers();

        dailyTipService.disableAll();

        for (User user : allUserList) {
            List<String> alarmMessageList = createReportAndDailyTipList(user);

            Collections.shuffle(alarmMessageList);

            for (int i = 0; i < 7; i++) {
                String message = alarmMessageList.get(i);
                dailyTipService.createDailyTip(message, user, i + 1);
            }
        }
    }

    /**
     * 유저의 농사일지로 AI 요약 리포트를 작성한 후, 리포트 내에서 내용을 발췌하여 하루 알리미 메시지 리스트로 반환
     */
    private List<String> createReportAndDailyTipList(User user) throws IOException {

        log.info("Start creating user weekly crop report for {}", user.getUsername());
        List<Crop> userCropList = cropService.getUserCropList(user.getId());
        List<String> alarmMessageList = getBasicAlarmList();

        if (!userCropList.isEmpty()) {
            List<CropReport> weeklyCropReportList = openAiService.createWeeklyCropReport(user, userCropList);

            if (!weeklyCropReportList.isEmpty()) {
                List<String> newAlarmMessageList = extractMessagesFromReportList(weeklyCropReportList);

                if (newAlarmMessageList.size() >= 7) {
                    alarmMessageList = newAlarmMessageList;
                } else {
                    alarmMessageList.addAll(newAlarmMessageList);
                }
            } else {
                log.warn("No crop report generated for {}", user.getUsername());
            }
        }

        return alarmMessageList;
    }

    private static List<String> extractMessagesFromReportList(List<CropReport> weeklyCropReportList) {
        List<String> messagesFromReportList = new ArrayList<>();

        // AI 요약 리포트마다 다음주 작업 발췌한 후 파싱하여 알람으로 넣어주기
        for (CropReport cropReport : weeklyCropReportList) {
            String[] sentences = cropReport.getContent().split("\n");

            for (int i = sentences.length - 1; i >= 0; i--) {
                String sentence = sentences[i];
                if (sentence.equals("### 다음 주의 작업")) break;

                if (!sentence.equals("\n")) {
                    messagesFromReportList.add(sentence.substring(2, sentence.length() - 1));
                }
            }
        }

        return messagesFromReportList;
    }

    /**
     * 농작물을 등록하지 않았거나 농사일지가 없을 때 반환해 줄 기본 알림 메시지 리스트
     */
    private static ArrayList<String> getBasicAlarmList() {
        return new ArrayList<>(List.of(
                "작물별로 농사 일지를 작성해 보세요",
                "무엇을 키울지 모르겠다면 작물 추천 서비스를 이용해 보세요",
                "동네모임에서 동네 이웃들과 소통해보세요",
                "이웃이 나누는 농작물을 받아보세요",
                "넘치는 농작물을 이웃과 나눠보세요",
                "내가 키우는 농작물을 등록하고 관리해보세요",
                "농사일지를 구체적으로 쓸수록 요약 리포트와 알람의 내용이 풍부해져요"
        ));
    }
}
