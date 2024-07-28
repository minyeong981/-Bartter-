package com.ssafy.bartter.auth.entity;

import com.ssafy.bartter.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 리프레시 토큰 값.
     */
    @Column(nullable = false)
    private String refresh;

    /**
     * 리프레시 토큰의 만료 날짜.
     * 이 필드는 타임스탬프 또는 저장 메커니즘에 적합한 다른 형식으로 저장될 수 있습니다.
     */
    @Column(nullable = false)
    private String expiration;

}
