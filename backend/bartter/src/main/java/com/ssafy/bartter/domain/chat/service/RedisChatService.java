package com.ssafy.bartter.domain.chat.service;

import com.ssafy.bartter.domain.chat.dto.ChatMessage;
import com.ssafy.bartter.domain.chat.repository.RedisChatRepository;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisChatService {

    private final RedisChatRepository redisChatRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ChannelTopic topic;

    public void publish(ChatMessage message) {
        validateChatParticipant(message.getSenderId(), message.getTradeId());

        // Redis에 메시지 발행
        redisTemplate.convertAndSend(topic.getTopic(), message);

        // Redis에 메시지 저장
        saveMessage(message);
    }

    private void saveMessage(ChatMessage chatMessage) {
        redisChatRepository.save(chatMessage);
    }

    public List<ChatMessage> getTradeChat(int userId, int tradeId, int page, int limit) {
        validateChatParticipant(userId, tradeId);
        return redisChatRepository.getTradeChat(tradeId, page, limit);
    }

    public void addParticipant(int userId, int tradeId) {
        redisChatRepository.addParticipant(userId, tradeId);
    }

    public int getParticipantTradeId(int userId) {
        return redisChatRepository.getParticipantTradeId(userId);
    }

    public void removeParticipant(int userId) {
        redisChatRepository.removeParticipant(userId);
    }

    public void addSession(String sessionId, int userId) {
        redisChatRepository.addSession(sessionId, userId);
    }

    public void removeSession(String sessionId) {
        int userId = redisChatRepository.getUserIdBySessionId(sessionId);
        redisChatRepository.removeSession(sessionId);
        removeParticipant(userId);
    }

    public int getUserIdBySessionId(String sessionId) {
        return redisChatRepository.getUserIdBySessionId(sessionId);
    }

    private void validateChatParticipant(int userId, int tradeId) {
        if (redisChatRepository.getParticipantTradeId(userId) != tradeId) {
            throw new CustomException(ErrorCode.UNAUTHENTICATED, "현재 참여하고 있지않은 채팅방입니다.");
        }
    }

}
