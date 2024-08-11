package com.ssafy.bartter.domain.chat.service;

import com.ssafy.bartter.domain.chat.dto.ChatMessage;
import com.ssafy.bartter.domain.chat.repository.RedisChatRepository;
import com.ssafy.bartter.domain.trade.services.TradeService;
import com.ssafy.bartter.domain.user.services.UserService;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.service.FCMService;
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

    private final RedisTemplate<String, Object> redisTemplate;
    private final RedisChatRepository redisChatRepository;
    private final TradeService tradeService;
    private final UserService userService;
    private final ChannelTopic topic;

    public void publish(ChatMessage message) {
        addTradeRoomInfo(message.getTradeId());
        validateChatParticipant(message.getSenderId(), message.getTradeId());

        // Redis에 메시지 발행
        redisTemplate.convertAndSend(topic.getTopic(), message);

        sendAlarm(message);

        // Redis에 메시지 저장
        saveMessage(message);
    }

    private void saveMessage(ChatMessage chatMessage) {
        log.debug("메시지 저장 : {}", chatMessage);
        redisChatRepository.save(chatMessage);
    }

    public void join(ChatMessage chatMessage) {
        int tradeId = chatMessage.getTradeId();
        int userId = chatMessage.getSenderId();
        tradeService.isParticipant(userId, tradeId); // 유효한 참여인지 확인
        redisChatRepository.addParticipant(userId, tradeId);
        addTradeRoomInfo(tradeId);
    }

    public void leave(ChatMessage chatMessage) {
        log.debug("{}번 유저 방 떠나기", chatMessage.getSenderId());
        redisChatRepository.removeTradeRoomInfo(chatMessage.getTradeId());
        redisChatRepository.removeParticipant(chatMessage.getSenderId());
    }

    /**
     * 해당 채팅을 가져온다.
     *
     * @param userId 회원 아이디
     * @param tradeId 거래 아이디
     * @param page 페이지 오프셋
     * @param limit 제한
     * @return 메시지가 담겨있는 리스트
     */
    public List<ChatMessage> getTradeChat(int userId, int tradeId, int page, int limit) {
        validateChatParticipant(userId, tradeId);
        return redisChatRepository.getTradeChat(tradeId, page, limit);
    }

    /**
     * 해당 방에 참여하고 있는지 확인한다.
     * @param userId 유저 ID
     * @param tradeId 거래 ID
     */
    private void validateChatParticipant(int userId, int tradeId) {
        if (redisChatRepository.getParticipantTradeId(userId) != tradeId) {
            throw new CustomException(ErrorCode.UNAUTHENTICATED, "현재 참여하고 있지않은 채팅방입니다.");
        }else{
            log.debug("현재 참여하고 있는 유저와 방의 번호 :{}, {}", userId, tradeId);
        }
    }

    /**
     * 현재 사용자가 참여한 방의 번호를 반환
     * @param userId 사용자 ID
     * @return 현재 사용자가 참여한 방의 번호
     */
    public int getParticipantTradeId(int userId) {
        return redisChatRepository.getParticipantTradeId(userId);
    }

    /**
     * 방 정보가 있으면 return
     * 없으면 해당 방에 참여한 사람들의 정보를 넣는다.
     * @param tradeId 거래 채팅 정보
     */
    private void addTradeRoomInfo(int tradeId) {
        if (redisChatRepository.existByTradeId(tradeId)) {
            log.debug("해당방이 이미 존재함 : {}",tradeId);
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

    private void sendNotification(int userId){
        log.debug("{}번 유저한테 알람 보내기",userId);
        String fcmToken = userService.getFcmToken(userId);
        if(fcmToken != null){
            userService.sendChattingAlarm(userId);
        }
    }

}
