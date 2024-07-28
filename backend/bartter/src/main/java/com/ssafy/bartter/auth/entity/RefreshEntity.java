package com.ssafy.bartter.auth.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;


/**
 * JWT 리프레시 토큰을 나타내는 엔티티 클래스
 * 향후 Redis 로 수정 예정
 *
 * @author 김훈민
 */
@Entity
@Getter
@Setter
public class RefreshEntity {

    /**
     * 각 리프레시 토큰 항목에 대한 고유 식별자
     * 이 값은 자동으로 생성
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 리프레시 토큰과 연관된 사용자 이름.
     */
    private String username;

    /**
     * 리프레시 토큰 값.
     */
    private String refresh;

    /**
     * 리프레시 토큰의 만료 날짜.
     * 이 필드는 타임스탬프 또는 저장 메커니즘에 적합한 다른 형식으로 저장될 수 있습니다.
     */
    private String expiration;

}
