package com.ssafy.bartter.domain.chat.repository;

import com.google.gson.Gson;
import com.ssafy.bartter.domain.chat.dto.ChatMessage;
import com.ssafy.bartter.domain.trade.repository.TradeRepository;
import com.ssafy.bartter.global.cache.CacheKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 레디스에 메시지를 저장하기위한 Repository
 */
@Slf4j
@Repository
@RequiredArgsConstructor
public class RedisChatRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    private final Gson mapper;

    public void save(ChatMessage chatMessage) {
        String key = CacheKey.messageKey(chatMessage.getTradeId());
        String message = mapper.toJson(chatMessage);

        redisTemplate.opsForList().rightPush(key, message);
    }

    public List<ChatMessage> getTradeChat(int tradeId, int page, int limit) {
        String key = CacheKey.messageKey(tradeId);
        ListOperations<String, Object> chatList = redisTemplate.opsForList(); // 레디스 명령어를 구현하기 위한 인터페이스

        // Redis 메시지 리스트의 총 메시지 개수를 가져온다.
        Long sizeOfList = chatList.size(key);
        long size = (sizeOfList != null) ? sizeOfList : 0;

        // 시작 인덱스 계산 : 페이지 번호와 페이지 크기를 사용하여 가져올 시작 인덱스를 계산한다.
        long start = Math.max(0, size - (page + 1) * limit);

        // 끝 인덱스 계산 : 페이지 번호와 크기를 사용하여 끝 인덱스를 계산한다.
        long end = size - (page * limit) - 1;

        // 시작인덱스가 끝보다 크면 메시지가 없으므로 빈 리스트
        if (start > end) return List.of();

        return chatList.range(key, start, end).stream()
                .map(msg -> mapper.fromJson((String) msg, ChatMessage.class)).toList();
    }

    public void addParticipant(int userId, int tradeId) {
        String key = CacheKey.currentTradeKey();
        redisTemplate.opsForHash().put(key, String.valueOf(userId), tradeId);
    }

    public int getParticipantTradeId(int userId) {
        String key = CacheKey.currentTradeKey();
        Integer tradeId = (Integer) redisTemplate.opsForHash().get(key, String.valueOf(userId));
        return tradeId != null ? tradeId : 0;
    }

    public void removeParticipant(int userId) {
        String key = CacheKey.currentTradeKey();
        redisTemplate.opsForHash().delete(key, String.valueOf(userId));
    }

    public void addSession(String sessionId, int userId) {
        String key = CacheKey.stompSessionKey();
        redisTemplate.opsForHash().put(key, sessionId, userId);
    }

    public void removeSession(String sessionId) {
        String key = CacheKey.stompSessionKey();
        redisTemplate.opsForHash().delete(key, sessionId);
    }

    public int getUserIdBySessionId(String sessionId) {
        String key = CacheKey.stompSessionKey();
        Integer id = (Integer) redisTemplate.opsForHash().get(key, sessionId);
        return id != null ? id : 0;
    }
}
