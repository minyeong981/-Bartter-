package com.ssafy.bartter.community.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import com.ssafy.bartter.user.entity.User;
import jakarta.persistence.*;

/**
 * Community Like Entity
 *
 * @author 김용수
 */
@Entity
@Table(name = "community_post_like")
public class CommunityPostLike extends BaseEntity {

    /**
     * 동네모임 좋아요 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "community_post_like_id")
    private Integer id;

    /**
     * 좋아요한 사용자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 좋아요한 게시글
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_post_id", nullable = false)
    private CommunityPost communityPost;
}
