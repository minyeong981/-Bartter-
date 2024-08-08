package com.ssafy.bartter.domain.chat.repository;

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
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 레디스에 메시지를 저장하기위한 Repository
 */
@Slf4j
@Repository
@RequiredArgsConstructor
public class RedisMessageRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    private final TradeRepository tradeRepository;
    private final Gson mapper;

    public void save(ChatMessage chatMessage) {
        String key = CacheKey.messageKey(chatMessage.getTradeId());
        String message = mapper.toJson(chatMessage);

        redisTemplate.opsForList().rightPush(key, message);
    }

    public List<ChatMessage> getTradeChat(int userId, int tradeId, int page, int limit) {
        if (!tradeRepository.existsByTradeIdAndUserId(userId, tradeId)) {
            throw new CustomException(ErrorCode.UNAUTHENTICATED, "현재 참여하고 있지않은 채팅방입니다.");
        }

        String key = CacheKey.messageKey(tradeId);
        ListOperations<String, Object> chatList = redisTemplate.opsForList(); // 레디스 명령어를 구현하기 위한 인터페이스

        // Redis 메시지 리스트의 총 메시지 개수를 가져온다.
        long sizeOfList = chatList.size(key);

        // 시작 인덱스 계산 : 페이지 번호와 페이지 크기를 사용하여 가져올 시작 인덱스를 계산한다.
        long start = Math.max(0, sizeOfList - (page + 1) * limit);

        // 끝 인덱스 계산 : 페이지 번호와 크기를 사용하여 끝 인덱스를 계산한다.
        long end = sizeOfList - (page * limit) - 1;

        // 시작인덱스가 끝보다 크면 메시지가 없으므로 빈 리스트
        if (start > end) return List.of();

        return chatList.range(key, start, end).stream()
                .map(msg -> mapper.fromJson((String) msg, ChatMessage.class)).toList();
    }
}
