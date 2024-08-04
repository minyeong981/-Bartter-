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
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.List;

/**
 * OpenAI 서비스를 제공하는 OpenAIService
 *
 * @Author 김가람
 * */
@Slf4j
@Service
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
            createUserWeekelyCropReport(user.getId());
        }
    }

    public void createUserWeekelyCropReport(int userId) throws IOException {

        // 예시
        String userMessage = """
                - 농작물이름: 초록이
                - 농작물 종류: 케일
                - 심은 날짜: 2024-06-20
                - 농사일지
                    - 월: 오늘 가서 평소처럼 물을 주고 잡초를 뽑아주었다. 싱싱하게 잘 자라고 있다.
                    - 수: 아침에 가보니 벌레가 잎을 갉아먹었다. 배추벌레를 귀찮아서 안잡아줬더니 잎을 갉아먹었다. 아직 심각한 정도는 아니다.
                    - 토:  어제 비가 많이 왔는데 비를 맞아서 잎이 많이 썩었다. 곧 장마철이라는데 남은 것들이라도 잘 보존해야 할텐데 걱정된다.
                """;

        List<Crop> userCropList = cropService.getUserCropList(userId);

        // 유저의 농작물마다 요약 리포트를 생성한다
        for (Crop crop : userCropList) {

            // 농작물의 일주일 치 농사일지를 불러온다
            List<CropDiary> diaryList = cropDiaryService.getWeeklyCropDiaryList(crop.getId(), LocalDate.now());

            // 농사일지를 이어 붙여 OpenAI에 보낼 메시지를 생성한다
            StringBuilder promptBuilder = new StringBuilder();

            promptBuilder.append("- 농작물 이름: ").append(crop.getNickname()).append("\n");
            promptBuilder.append("- 농작물 종류: ").append(crop.getCategory().getName()).append("\n");
            promptBuilder.append("- 심은 날짜: ").append(crop.getGrowDate()).append("\n");
            promptBuilder.append("- 농사 일지").append("\n");

            for (CropDiary cropDiary : diaryList) {
                promptBuilder.append(cropDiary.getCreatedAt()).append(": ");
                promptBuilder.append(cropDiary.getContent()).append("\n");
                promptBuilder.append("\n");
            }

            // OpenAI로부터 응답을 받아온다
            String response = createAIResponse(promptBuilder.toString());

            // 받아온 응답을 이용하여 CropReport를 생성한다
            cropReportService.createCropReport(userId, crop, LocalDate.now(), response);

            // TODO : 하루농사 알리미 생성
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
                                .withTemperature(0.2F)
                                .build()
                )
                .call()
                .content();

        System.out.println(response);

        return response;
    }
}
