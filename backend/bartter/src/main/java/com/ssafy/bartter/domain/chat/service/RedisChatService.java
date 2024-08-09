package com.ssafy.bartter.domain.chat.service;

import com.ssafy.bartter.domain.chat.dto.ChatMessage;
import com.ssafy.bartter.domain.chat.repository.RedisChatRepository;
import com.ssafy.bartter.domain.trade.services.TradeService;
import com.ssafy.bartter.global.cache.CacheKey;
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

    private final TradeService tradeService;
    private final RedisChatRepository redisChatRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ChannelTopic topic;

    public void publish(ChatMessage message) {
        validateChatParticipant(message.getSenderId(), message.getTradeId());

        // Redis에 메시지 발행
        redisTemplate.convertAndSend(topic.getTopic(), message);

        sendAlarm(message);

        // Redis에 메시지 저장
        saveMessage(message);
    }

    private void saveMessage(ChatMessage chatMessage) {
        redisChatRepository.save(chatMessage);
    }

    public void join(ChatMessage chatMessage) {
        int tradeId = chatMessage.getTradeId();
        int userId = chatMessage.getSenderId();

        log.debug("{} 유저 {}번 방 참여", userId, tradeId);
        addTradeRoomInfo(tradeId);
        tradeService.isParticipant(userId, tradeId);
        redisChatRepository.addParticipant(userId, tradeId);
    }

    public void leave(ChatMessage chatMessage) {
        log.debug("{}번 유저 방 떠나기", chatMessage.getSenderId());
        redisChatRepository.removeTradeRoomInfo(chatMessage.getTradeId());
        redisChatRepository.removeParticipant(chatMessage.getSenderId());
    }

    public List<ChatMessage> getTradeChat(int userId, int tradeId, int page, int limit) {
        validateChatParticipant(userId, tradeId);
        return redisChatRepository.getTradeChat(tradeId, page, limit);
    }

    public int getParticipantTradeId(int userId) {
        return redisChatRepository.getParticipantTradeId(userId);
    }

    private void validateChatParticipant(int userId, int tradeId) {
        if (redisChatRepository.getParticipantTradeId(userId) != tradeId) {
            throw new CustomException(ErrorCode.UNAUTHENTICATED, "현재 참여하고 있지않은 채팅방입니다.");
        }
    }

    private void addTradeRoomInfo(int tradeId) {
        if (redisChatRepository.existByTradeId(tradeId)) {
            return;
        }
        List<Integer> participantIdList = tradeService.getParticipantList(tradeId);
        log.debug("{}번 방 인원 : {}",tradeId,participantIdList);
        redisChatRepository.addTradeRoomInfo(tradeId, participantIdList);
    }

    private void sendAlarm(ChatMessage message) {
        int senderId = message.getSenderId();
        int tradeId = message.getTradeId();
        List<Integer> tradeInfo = redisChatRepository.getTradeInfo(tradeId);

        tradeInfo.stream()
                .filter(userId -> userId !=  senderId)
                .filter(userId -> getParticipantTradeId(userId) != tradeId)
                .forEach(this::sendNotification);
    }
    private void sendNotification(int id){
        log.debug("{}번 유저한테 알람 보내기",id);
    }

}
