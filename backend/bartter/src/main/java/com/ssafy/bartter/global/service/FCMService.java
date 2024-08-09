package com.ssafy.bartter.global.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class FCMService {

    private final FirebaseMessaging firebaseMessaging;

    public void sendNotification(String targetToken, String title, String body) {
        Message message = Message.builder()
                .setToken(targetToken)
                .putData("titleasd", title)
                .putData("bodyasd", body)
                .putData("image", "https://img.freepik.com/premium-vector/cute-strong-apple-character-illustration_723554-257.jpg")
                .build();

        try {
            String response = firebaseMessaging.send(message);
            log.debug("Sent message: " + response);
        } catch (Exception e) {
            log.error("FCM 전송 오류 ", e);
            throw new CustomException(ErrorCode.BAD_REQUEST, "잘못된 알람 요청값입니다.");
        }
    }
}
