package com.ssafy.bartter.global.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.prompt.SystemPromptTemplate;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * OpenAI 서비스를 제공하는 OpenAIService
 *
 * @Author 김가람
 * */
@Slf4j
@Service
public class OpenAIService {

    private final ChatClient chatClient;

    public OpenAIService (ChatClient.Builder chatClientBuilder) {
        this.chatClient = chatClientBuilder.build();
    }

    @Scheduled(fixedRate = 100000)
    public String generateAIReport() throws IOException {

        // userInput : 농사일지에서 불러오는 기능 추후 구현하기
        String userMessage = """
                - 농작물이름: 초록이
                - 농작물 종류: 케일
                - 심은 날짜: 2024-06-20
                - 농사일지
                    - 월: 오늘 가서 평소처럼 물을 주고 잡초를 뽑아주었다. 싱싱하게 잘 자라고 있다.
                    - 수: 아침에 가보니 벌레가 잎을 갉아먹었다. 배추벌레를 귀찮아서 안잡아줬더니 잎을 갉아먹었다. 아직 심각한 정도는 아니다.
                    - 토:  어제 비가 많이 왔는데 비를 맞아서 잎이 많이 썩었다. 곧 장마철이라는데 남은 것들이라도 잘 보존해야 할텐데 걱정된다.
                """;

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
        String testSystemMsg = "다음 농사일지를 친절하게 칭찬해봐";

        System.out.println("userMessage == null = " + userMessage == null);
        System.out.println("systemMessage == null = " + systemMessage == null);

        // OpenAI로 요청 보내기
        String response = chatClient.prompt()
                .system(systemMessage)  // systemMessage만 넣으면 에러나는 중, 다른 짧은 문장들은 잘됨
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
