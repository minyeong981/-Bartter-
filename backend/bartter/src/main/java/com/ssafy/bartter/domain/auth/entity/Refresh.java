package com.ssafy.bartter.domain.auth.entity;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


/**
 * JWT 리프레시 토큰을 나타내는 엔티티 클래스
 * 향후 Redis 로 수정 예정
 *
 * @author 김훈민
 */
@Entity
@Getter
@Table(name = "refresh")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Refresh {

    /**
     * 각 리프레시 토큰 항목에 대한 고유 식별자
     * 이 값은 자동으로 생성
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 유저의 아이디
     */
    @Column(nullable = false)
    private String username;

    /**
     * 리프레시 토큰 값
     */
    @Column(nullable = false)
    private String refresh;

    /**
     * 리프레시 토큰의 만료 날짜
     */
    @Column(nullable = false)
    private String expiration;

    /**
     * Refresh 엔티티의 빌더
     * @param username 유저의 아이디
     * @param refresh 리프레시 토큰 값
     * @param expiration 리프레시 토큰의 만료 날짜
     */
    @Builder
    public Refresh(String username, String refresh, String expiration) {
        this.username = username;
        this.refresh = refresh;
        this.expiration = expiration;
    }
}
