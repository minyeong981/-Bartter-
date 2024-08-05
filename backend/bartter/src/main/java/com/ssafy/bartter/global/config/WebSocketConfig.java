package com.ssafy.bartter.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry){
        // 클라이언트에서 메시지를 받기 위해 구독할 경로의 Prefix
        registry.enableSimpleBroker("/sub");

        // 클라이언트에서 메시지를 서버로 발행할 때 사용할 경로의 Prefix
        registry.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 클라이언트가 WebSocket 연결을 할 앤드포인트 설정
        registry.addEndpoint("/ws").
                setAllowedOrigins("*").
                withSockJS();
    }
}
