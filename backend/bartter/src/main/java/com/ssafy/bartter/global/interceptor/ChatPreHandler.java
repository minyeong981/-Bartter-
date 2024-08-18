package com.ssafy.bartter.global.interceptor;


import com.ssafy.bartter.domain.auth.dto.AuthUserDetails;
import com.ssafy.bartter.domain.auth.utils.JwtUtil;
import com.ssafy.bartter.domain.chat.service.RedisChatService;
import com.ssafy.bartter.domain.trade.services.TradeService;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.sun.security.auth.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Principal;


/**
 * 채팅 참여시 토큰 인증 및 참여 기록을 남기기 위한 ChatPreHandler
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ChatPreHandler implements ChannelInterceptor {

    private final RedisChatService redisChatService;
    private final JwtUtil jwtUtil;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (accessor == null) {
            throw new CustomException(ErrorCode.BAD_REQUEST, "StompHeader가 존재하지않습니다. 다시 요청해주세요");
        }

        if (accessor.getCommand() == StompCommand.SUBSCRIBE) {
            int userId = getUserId(accessor);
            int tradeId = getTradeId(accessor);
            log.debug("userId = {}, tradeId = {}", userId, tradeId);
            redisChatService.join(userId, tradeId);
        }else if(accessor.getCommand() == StompCommand.DISCONNECT){
            int userId = getUserId(accessor);
            redisChatService.leave(userId);
        }

        return message;
    }

    private static int getUserId(StompHeaderAccessor accessor) {
        Principal principal = accessor.getUser();
        AuthUserDetails userDetails = (AuthUserDetails) ((Authentication) principal).getPrincipal();
        return userDetails.getUserId();
    }

//    private int getUserId(StompHeaderAccessor accessor) {
//        String token = accessor.getFirstNativeHeader("Authorization").trim().substring(7);
//        jwtUtil.isExpired(token); // 만료된 경우 예외 던짐
//        return jwtUtil.getUserId(token);
//    }

    private int getTradeId(StompHeaderAccessor accessor) {
        String destination = accessor.getDestination();
        return Integer.parseInt(destination.split("/")[4]);
    }

}
