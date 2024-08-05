package com.ssafy.bartter.global.service;

import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.domain.crop.entity.CropDiary;
import com.ssafy.bartter.domain.crop.service.CropDiaryService;
import com.ssafy.bartter.domain.crop.service.CropReportService;
import com.ssafy.bartter.domain.crop.service.CropService;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.domain.user.services.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.List;

/**
 * OpenAI 보고서 및 알림을 생성하는 OpenAIService
 *
 * @Author 김가람
 * */
@Slf4j
@Service
@Transactional
public class OpenAIService {

    private final ChatClient chatClient;
    private final UserService userService;
    private final CropService cropService;
    private final CropDiaryService cropDiaryService;
    private final CropReportService cropReportService;

    @Autowired
    public OpenAIService (ChatClient.Builder chatClientBuilder, UserService userService, CropService cropService, CropDiaryService cropDiaryService, CropReportService cropReportService) {
        this.chatClient = chatClientBuilder.build();
        this.userService = userService;
        this.cropService = cropService;
        this.cropDiaryService = cropDiaryService;
        this.cropReportService = cropReportService;
    }

//    @Scheduled(fixedRate = 100000000)
    public void generateAIReport() throws IOException {

        // 현재 등록된 전체 유저 목록을 조회한다
        List<User> allUserList = userService.getAllUsers();

        // 각 유저마다 농작물들의 요약 리포트를 생성한다
        for (User user : allUserList) {
            createUserWeeklyCropReport(user.getId());
        }
    }

    public void createUserWeeklyCropReport(int userId) throws IOException {
        log.info("Creating user weekly crop report for {}", userId);

        List<Crop> userCropList = cropService.getUserCropList(userId);

        if (userCropList.isEmpty()) {
            log.warn("no user crops for {}", userId);
//            TODO : 하루농사 알리미 생성 (기본 내용으로)
//                - 작물별로 농사 일지를 작성해 보세요
//                - 무엇을 키울지 모르겠다면 작물 추천 서비스를 이용해 보세요
//                - 동네모임에서 동네 이웃들과 소통해보세요
//                - 이웃이 나누는 농작물을 받아보세요
//                - 넘치는 농작물을 이웃과 나눠보세요
//                - 내가 키우는 농작물을 등록하고 관리해보세요
//                - 농사일지를 구체적으로 쓸수록 리포트와 알람의 내용이 풍부해져요
            return;
        }

        // TODO : 생성된 요약 리포트 세주는 변수 생성 후 for문 종료후에도 생성 0 이면 기본알람 생성

        boolean didCreateReport = false;

        // 유저의 농작물마다 요약 리포트를 생성한다
        for (Crop crop : userCropList) {

            // 농작물의 일주일 치 농사일지를 불러온다
            List<CropDiary> diaryList = cropDiaryService.getWeeklyCropDiaryList(crop.getId(), LocalDate.now());

            // 해당 주에 작성한 농사 일지가 없다면
            if (diaryList.isEmpty()) {
                log.warn("no weekly crop diaries for {}", crop.getNickname());
                continue;
            }

            // 농사일지를 이어 붙여 OpenAI에 보낼 메시지를 생성한다
            StringBuilder promptBuilder = new StringBuilder();

            promptBuilder.append("- 농작물 이름: ").append(crop.getNickname()).append("\n");
            promptBuilder.append("- 농작물 종류: ").append(crop.getCategory().getName()).append("\n");
            promptBuilder.append("- 심은 날짜: ").append(crop.getGrowDate()).append("\n");
            promptBuilder.append("- 농사 일지: ").append("\n");

            for (CropDiary cropDiary : diaryList) {
                promptBuilder.append(cropDiary.getCreatedAt().toLocalDate()).append("\n");
                promptBuilder.append(cropDiary.getContent()).append("\n");
                promptBuilder.append("\n");
            }

            System.out.println(promptBuilder.toString());


            // OpenAI로부터 응답을 받아온다
            String response = createAIResponse(promptBuilder.toString());
            if (response.equals("분석불가")) {
                log.warn("no result for {}", crop.getNickname());
                continue;
            }

            // 받아온 응답을 이용하여 CropReport를 생성한다
            cropReportService.createCropReport(userId, crop, LocalDate.now(), response);
            didCreateReport = true;

            // TODO : 생성된 리포트를 이용하여 하루농사 알리미 생성, 실패 시 Exception
        }

        if (!didCreateReport) {
//            TODO : 하루농사 알리미 생성 (기본 내용으로)
//                - 작물별로 농사 일지를 작성해 보세요
//                - 무엇을 키울지 모르겠다면 작물 추천 서비스를 이용해 보세요
//                - 동네모임에서 동네 이웃들과 소통해보세요
//                - 이웃이 나누는 농작물을 받아보세요
//                - 넘치는 농작물을 이웃과 나눠보세요
//                - 내가 키우는 농작물을 등록하고 관리해보세요
//                - 농사일지를 구체적으로 쓸수록 리포트와 알람의 내용이 풍부해져요
            return;
        }
    }

    private String createAIResponse(String userMessage) throws IOException {

        // System Message 불러오기
        ClassPathResource resource = new ClassPathResource("ai/system.txt");
        BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()));
        StringBuilder systemMessageBuilder = new StringBuilder();

        String line = br.readLine();
        while (line != null) {
            systemMessageBuilder.append(line).append("\n");
           line = br.readLine();
        }

        String systemMessage = systemMessageBuilder.toString();

        // OpenAI로 요청 보내기
        String response = chatClient.prompt()
                .system(systemMessage)
                .user(userMessage)
                .options(
                        OpenAiChatOptions.builder()
                                .withModel("gpt-3.5-turbo")
                                .withTemperature(0.3F)
                                .build()
                )
                .call()
                .content();

        System.out.println(response);

        return response;
    }
}
