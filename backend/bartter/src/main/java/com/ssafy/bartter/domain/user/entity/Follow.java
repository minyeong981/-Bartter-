package com.ssafy.bartter.domain.user.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 회원 팔로우 Entity
 *
 * @author 김용수
 */
@Entity
@Getter
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

    /**
     * 팔로우 메서드
     *
     * @param follower 팔로우를 누른 사람
     * @param followee 팔로우를 당한 사람
     */
    @Builder
    public Follow(User follower, User followee) {
        this.follower = follower;
        this.followee = followee;
    }
}
