package com.ssafy.bartter.domain.chat.controller;

import com.ssafy.bartter.domain.chat.dto.ChatMessage;
import com.ssafy.bartter.domain.chat.service.RedisChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final RedisChatService redisChatService;

    @MessageMapping("/trade/chat")
    public void sendMessage(ChatMessage chatMessage){
        log.debug("전송 : {}", chatMessage);
        redisChatService.publish(chatMessage);
    }
}
