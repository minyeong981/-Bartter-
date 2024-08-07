package com.ssafy.bartter.global.config;

import com.ssafy.bartter.global.interceptor.ChatPreHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final ChatPreHandler chatPreHandler;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 클라이언트에서 메시지를 받기 위해 구독할 경로의 Prefix
        registry.enableSimpleBroker("/sub");
        log.debug("/sub 등록");

        // 클라이언트에서 메시지를 서버로 발행할 때 사용할 경로의 Prefix
        registry.setApplicationDestinationPrefixes("/pub");
        log.debug("/pub 등록");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 클라이언트가 WebSocket 연결을 할 앤드포인트 설정
//        registry.addEndpoint("/ws").
//                setAllowedOrigins("*")
//                .withSockJS();
        registry.addEndpoint("/ws").
                setAllowedOrigins("*");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(chatPreHandler);
    }
}
