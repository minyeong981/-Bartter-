package com.ssafy.bartter.domain.chat.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.bartter.domain.chat.dto.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisChatService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ChannelTopic topic;
    private final ObjectMapper mapper;

    public void publish(ChatMessage chatMessage){
        try{
            String message = mapper.writeValueAsString(chatMessage);
            redisTemplate.convertAndSend(topic.getTopic(), message);
        }catch (JsonProcessingException e){
            log.debug("에러 ");
        }
    }
}
