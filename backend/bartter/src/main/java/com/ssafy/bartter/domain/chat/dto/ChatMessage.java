package com.ssafy.bartter.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {

    public enum MessageType{
        CHAT, // 일반 채팅
        CHANGE
    }

    private MessageType type; // 메시지 타입
    private String content; // 메시지 내용
    private String senderNickname; // 발신자 닉네임
    private int senderId; // 발신자 ID
    private int tradePostId; // 게시글 ID
    private int tradeId; // 거래 ID
}
