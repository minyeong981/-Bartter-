package com.ssafy.bartter.global.interceptor;


import com.ssafy.bartter.domain.auth.utils.JwtUtil;
import com.ssafy.bartter.domain.chat.service.RedisChatService;
import com.ssafy.bartter.domain.trade.services.TradeService;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;


/**
 * 채팅 참여시 토큰 인증 및 참여 기록을 남기기 위한 ChatPreHandler
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ChatPreHandler implements ChannelInterceptor {

    private final JwtUtil jwtUtil;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (accessor == null) {
            throw new CustomException(ErrorCode.BAD_REQUEST, "StompHeader가 존재하지않습니다. 다시 요청해주세요");
        }

        if (accessor.getCommand() == StompCommand.CONNECT) {
            validToken(accessor);
        }

        return message;
    }

    private void validToken(StompHeaderAccessor accessor) {
        String token = accessor.getFirstNativeHeader("Authorization").trim().substring(7);
        jwtUtil.isExpired(token); // 만료된 경우 예외 던짐
    }

}
