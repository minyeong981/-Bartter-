package com.ssafy.bartter.global.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class FCMService {

    @Value("${cloud.aws.url}")
    private String url;
    private final String loginTitle = "밭터 - 로그인 알림";
    private final String messageTitle = "밭터 - 메세지 알림";
    private final FirebaseMessaging firebaseMessaging;

    public void sendLoginAlarm(String token, String body) {
        if(Objects.nonNull(token)) sendNotification(token, loginTitle, body +"님 로그인을 환영합니다!", url + "/logo");
    }

    public void sendChattingAlarm(String token, String nickname, String image) {
        if(Objects.nonNull(token)) sendNotification(token, messageTitle, nickname + "님이 메세지를 보냈습니다.", image);
    }

    private void sendNotification(String targetToken, String title, String body, String image) {
        WebpushConfig webpushConfig = WebpushConfig.builder()
                .putData("title", title)
                .putData("body", body)
                .putData("image", image)
                .build();

        Message message = Message.builder()
                .setToken(targetToken)
                .setWebpushConfig(webpushConfig)
//                .putData("title", title)
//                .putData("body", body)
//                .putData("image", "https://img.freepik.com/premium-vector/cute-strong-apple-character-illustration_723554-257.jpg")
                .build();
        try {
            firebaseMessaging.sendAsync(message);
        } catch (Exception e) {
            log.error("FCM 전송 오류 ", e);
        }
    }
}
