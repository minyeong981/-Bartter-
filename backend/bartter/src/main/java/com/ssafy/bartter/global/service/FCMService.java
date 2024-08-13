package com.ssafy.bartter.global.service;

import com.google.firebase.messaging.*;
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
    private String imagePrefix;

    @Value("${app.domain.url}")
    private String domainUrl;

    private final String loginTitle = "밭터 - 로그인 알림";
    private final String messageTitle = "밭터 - 메세지 알림";
    private final FirebaseMessaging firebaseMessaging;

    public void sendLoginAlarm(String token, String body) {
        if (Objects.nonNull(token))
            sendNotification(token, loginTitle, body + "님 로그인을 환영합니다!", imagePrefix + "/logo", domainUrl);
    }

    public void sendChattingAlarm(String token, String nickname, String image, String url) {
        if (Objects.nonNull(token))
            sendNotification(token, messageTitle, nickname + "님이 메세지를 보냈습니다.", image, domainUrl + "/trade/" + url);
    }

    private void sendNotification(String targetToken, String title, String body, String image, String url) {
        WebpushNotification notification = WebpushNotification.builder()
                .setTitle(title)
                .setBody(body)
                .setImage(image)
                .build();

        WebpushConfig webpushConfig = WebpushConfig.builder()
                .setNotification(notification)
                .putData("title", title)
                .putData("body", body)
                .putData("image", image)
                .putData("click_action", url)
                .build();

        Message message = Message.builder()
                .setToken(targetToken)
                .setWebpushConfig(webpushConfig)
                .build();
        try {
            log.debug("FCM 알림 전송 {}", message);
            firebaseMessaging.sendAsync(message);
        } catch (Exception e) {
            log.error("FCM 전송 오류 ", e);
        }
    }
}
