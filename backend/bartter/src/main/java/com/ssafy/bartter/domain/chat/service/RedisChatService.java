package com.ssafy.bartter.domain.chat.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.ssafy.bartter.domain.chat.dto.ChatMessage;
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

    private final TradeRepository tradeRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ChannelTopic topic;
    private final Gson mapper;

    public void publish(ChatMessage chatMessage) {
        // Redis에 메시지 발행
        redisTemplate.convertAndSend(topic.getTopic(), chatMessage);

        // Redis에 메시지 저장
        saveMessage(chatMessage);
    }

    private void saveMessage(ChatMessage chatMessage) {
        String key = CacheKey.messageKey(chatMessage.getTradeId());
        String message = mapper.toJson(chatMessage);

        log.debug("저장");
        redisTemplate.opsForList().rightPush(key, message);
    }

    public List<ChatMessage> getTradeChat(int userId, int tradeId, int page, int limit) {
        log.debug("{}, {}", userId, tradeId);
        
        if (!tradeRepository.existsByTradeIdAndUserId(userId, tradeId)){
            throw new CustomException(ErrorCode.UNAUTHENTICATED);
        }

        try {
            String key = CacheKey.messageKey(tradeId);
            ListOperations<String, Object> listOps = redisTemplate.opsForList();

            // Redis 메시지 리스트의 총 메시지 개수를 가져온다.
            long sizeOfList = listOps.size(key);

            // 시작 인덱스 계산 : 페이지 번호와 페이지 크기를 사용하여 가져올 시작 인덱스를 계산한다.
            long start = Math.max(0, sizeOfList - (page + 1) * limit);

            // 끝 인덱스 계산 : 페이지 번호와 크기를 사용하여 끝 인덱스를 계산한다.
            long end = sizeOfList - (page * limit) - 1;

            // 시작인덱스가 끝보다 크면 메시지가 없으므로 빈 리스트
            if (start > end) return List.of();

            return listOps.range(key, start, end).stream()
                    .map(msg -> mapper.fromJson((String) msg, ChatMessage.class))
                    .toList();
        } catch (Exception e) {
            log.debug("불러오기 오류 ");
            return List.of();
        }
    }
}
