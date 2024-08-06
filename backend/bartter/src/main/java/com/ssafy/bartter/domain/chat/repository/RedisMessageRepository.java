package com.ssafy.bartter.domain.chat.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.bartter.domain.chat.dto.ChatMessage;
import com.ssafy.bartter.global.cache.CacheKey;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Repository
@RequiredArgsConstructor
public class RedisMessageRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    public void saveMessage(ChatMessage chatMessage) {
        try {
            String key = CacheKey.messageKey(chatMessage.getTradeId());
            redisTemplate.opsForList().rightPush(key, objectMapper.writeValueAsString(chatMessage));
        } catch (Exception e) {
            throw new CustomException(ErrorCode.TRADE_POST_INVALID_REQUEST, "채팅 저장이 안됐습니다. 잘못된 요청");
        }
    }

    public List<ChatMessage> getMessageList(int tradeId, int offset, int limit) {
        String key = CacheKey.messageKey(tradeId);
        int start = offset;
        int end = start + limit - 1;
        List<Object> messageList = redisTemplate.opsForList().range(key, start, end);

        return messageList.stream().
                map(json -> {
                    try {
                        return objectMapper.readValue(json.toString(), ChatMessage.class);
                    } catch (JsonProcessingException e) {
                        throw new CustomException(ErrorCode.TRADE_POST_INVALID_REQUEST, "채팅 불러오기 오류.");
                    }
                })
                .collect(Collectors.toList());
    }
}
