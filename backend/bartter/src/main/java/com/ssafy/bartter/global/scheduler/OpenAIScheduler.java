package com.ssafy.bartter.global.scheduler;

import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.domain.crop.entity.CropReport;
import com.ssafy.bartter.domain.crop.service.CropService;
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
import java.util.List;

/**
 * OpenAI 메서드를 특정 시간에 실행하는 OpenAIScheduler
 *
 * @Author 김가람
 * */
@Slf4j
@Component
@Transactional
@RequiredArgsConstructor
public class OpenAIScheduler {

    private final UserService userService;
    private final CropService cropService;
    private final OpenAIService openAiService;

    /**
     * 일요일마다 하루 농사 알리미를 생성하는 메소드
     * 일요일 아침 6시 생성 예정
     * */
//    @Scheduled(fixedRate = 100000000)
    public void createDailyFarmingAlarm() throws IOException {

        // 현재 등록된 전체 유저 목록을 조회한다
        List<User> allUserList = userService.getAllUsers();

        // 각 유저마다 농작물들의 요약 리포트를 생성한다
        for (User user : allUserList) {

            log.info("Start creating user weekly crop report for {}", user.getUsername());
            List<Crop> userCropList = cropService.getUserCropList(user.getId());

            // 기본 알람
            List<String> alarmList = new ArrayList<>(List.of(
                    "작물별로 농사 일지를 작성해 보세요",
                    "무엇을 키울지 모르겠다면 작물 추천 서비스를 이용해 보세요",
                    "동네모임에서 동네 이웃들과 소통해보세요",
                    "이웃이 나누는 농작물을 받아보세요",
                    "넘치는 농작물을 이웃과 나눠보세요",
                    "내가 키우는 농작물을 등록하고 관리해보세요",
                    "농사일지를 구체적으로 쓸수록 요약 리포트와 알람의 내용이 풍부해져요"
            ));


            if (!userCropList.isEmpty()) {
                // AI 요약 리포트 생성
                List<CropReport> weeklyCropReportList = openAiService.createWeeklyCropReport(user, userCropList);

                if (!weeklyCropReportList.isEmpty()) {
                    // 기본 알람 비우기
                    alarmList.clear();

                    // AI 요약 리포트마다 다음주 작업 발췌한 후 파싱하여 알람으로 넣어주기
                    for (CropReport cropReport : weeklyCropReportList) {
                        String[] sentences = cropReport.getContent().split("\n");

                        for (int i = sentences.length - 1; i >= 0 ; i--) {
                            String sentence = sentences[i];
                            if (sentence.equals("### 다음 주의 작업")) break;
                            if (!sentence.equals("\n")) {
                                alarmList.add(sentence.substring(2, sentence.length() - 1));
                            }
                        }
                    }
                } else {
                    log.warn("No crop report generated for {}", user.getUsername());
                }
            }




        }
    }
}
