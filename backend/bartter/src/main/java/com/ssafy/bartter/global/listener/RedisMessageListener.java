package com.ssafy.bartter.global.listener;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.ssafy.bartter.domain.chat.dto.ChatMessage;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisMessageListener implements MessageListener {

    private final Gson mapper;
    private final SimpMessageSendingOperations messagingTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        // Redis 메시지를 문자열로 변환
        String msg = new String(message.getBody());

        // 문자열을 ChatMessage 객체로 변환
        ChatMessage chatMessage = mapper.fromJson(msg, ChatMessage.class);
        // 해당 채팅방 상대에게 메시지 전송
        messagingTemplate.convertAndSend("/sub/trade/chat/" + chatMessage.getTradeId(), chatMessage);
    }
}
