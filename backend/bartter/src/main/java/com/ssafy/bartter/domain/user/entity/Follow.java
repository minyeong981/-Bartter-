package com.ssafy.bartter.domain.user.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

/**
 * 회원 팔로우 Entity
 *
 * @author 김용수
 */
@Entity
@Table(name = "follow")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Follow extends BaseEntity {

    /**
     * 팔로우 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private Integer id;

    /**
     * follower -> 현재 팔로우 하는 사람
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "follower_id", nullable = false)
    private User follower;

    /**
     * followee -> 현재 팔로우 당하는 사람
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "followee_id", nullable = false)
    private User followee;
}
