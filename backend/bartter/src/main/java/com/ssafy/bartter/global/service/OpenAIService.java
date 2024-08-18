package com.ssafy.bartter.global.service;

import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.domain.crop.entity.CropDiary;
import com.ssafy.bartter.domain.report.entity.CropReport;
import com.ssafy.bartter.domain.crop.service.CropDiaryService;
import com.ssafy.bartter.domain.report.service.CropReportService;
import com.ssafy.bartter.domain.user.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * OpenAI 보고서 및 알림을 생성하는 OpenAIService
 *
 * @Author 김가람
 */
@Slf4j
@Service
@Transactional
public class OpenAIService {

    private final ChatClient chatClient;
    private final CropDiaryService cropDiaryService;
    private final CropReportService cropReportService;

    @Autowired
    public OpenAIService(ChatClient.Builder chatClientBuilder, CropDiaryService cropDiaryService, CropReportService cropReportService) {
        this.chatClient = chatClientBuilder.build();
        this.cropDiaryService = cropDiaryService;
        this.cropReportService = cropReportService;
    }

    /**
     * 유저 PK를 통해 농사일지 AI 요약 리포트를 만드는 메소드
     */
    public List<CropReport> createWeeklyCropReport(User user, List<Crop> userCropList) throws IOException {

        List<CropReport> createdReportList = new ArrayList<>();

        for (Crop crop : userCropList) {
            List<CropDiary> diaryList = cropDiaryService.getWeeklyCropDiaryList(crop.getId(), LocalDate.now());

            if (diaryList.isEmpty()) {
                log.warn("No diary written for {}", crop.getNickname());
                continue;
            }

            String userPrompt = getPrompt(crop, diaryList);
            String response = createAIResponse(userPrompt);

            CropReport cropReport = cropReportService.createCropReport(user, crop, LocalDate.now(), response);
            createdReportList.add(cropReport);
            log.info("Created crop report for {}", crop.getNickname());
        }

        return createdReportList;
    }

    /**
     * OpenAI에 농사일지를 보낸 후 생성된 리포트를 반환하는 메소드
     */
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
                                .withTemperature(0.2F)
                                .build()
                )
                .call()
                .content();

        return response;
    }

    /**
     * 농작물 프로필과 농사일지 리스트를 조합하여 프롬프트를 생성하는 메소드
     */
    private static String getPrompt(Crop crop, List<CropDiary> diaryList) {
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

        return promptBuilder.toString();
    }
}
