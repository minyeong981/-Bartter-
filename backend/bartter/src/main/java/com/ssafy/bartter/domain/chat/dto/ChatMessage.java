package com.ssafy.bartter.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {

    public enum MessageType{
        CHAT, // 일반 채팅
        JOIN, // 입장
        LEAVE // 퇴장 
    }

    private MessageType type; // 메시지 타입
    private String content; // 메시지 내용
    private int senderId; // 발신자 ID
    private int tradeId; // 거래 ID
}
