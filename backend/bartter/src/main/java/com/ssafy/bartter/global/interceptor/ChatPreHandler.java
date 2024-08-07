package com.ssafy.bartter.global.interceptor;


import com.google.gson.Gson;
import com.ssafy.bartter.domain.auth.utils.JwtUtil;
import com.ssafy.bartter.domain.trade.repository.TradeRepository;
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


@Slf4j
@Component
@RequiredArgsConstructor
public class ChatPreHandler implements ChannelInterceptor {

    private final JwtUtil jwtUtil;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        isUserValid(message);
        return message;
    }

    private void isUserValid(Message<?> message) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (accessor.getCommand() == StompCommand.CONNECT) {
            // 토큰 있는지 확인 후 소켓 연결
            getUserId(accessor);
            log.debug("CONNECT 연결");
        }
    }

    private int getUserId(StompHeaderAccessor accessor) {
        String token = accessor.getFirstNativeHeader("Authorization").trim().substring(7);
        jwtUtil.isExpired(token); // 만료된 경우 예외 던짐
        int userId = jwtUtil.getUserId(token);
        return userId;
    }

}
