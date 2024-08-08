package com.ssafy.bartter.domain.chat.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.ssafy.bartter.domain.chat.dto.ChatMessage;
import com.ssafy.bartter.domain.chat.repository.RedisMessageRepository;
import com.ssafy.bartter.domain.trade.repository.TradeRepository;
import com.ssafy.bartter.global.cache.CacheKey;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisChatService {

    private final RedisMessageRepository redisMessageRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ChannelTopic topic;

    public void publish(ChatMessage chatMessage) {
        // Redis에 메시지 발행
        redisTemplate.convertAndSend(topic.getTopic(), chatMessage);

        // Redis에 메시지 저장
        saveMessage(chatMessage);
    }

    private void saveMessage(ChatMessage chatMessage) {
        redisMessageRepository.save(chatMessage);
    }

    public List<ChatMessage> getTradeChat(int userId, int tradeId, int page, int limit) {
        return redisMessageRepository.getTradeChat(userId, tradeId, page, limit);
    }
}
