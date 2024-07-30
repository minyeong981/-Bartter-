package com.ssafy.bartter.community.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import com.ssafy.bartter.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Community Like Entity
 *
 * @author 김용수
 */
@Entity
@Getter
@Table(name = "community_post_like")
@NoArgsConstructor(access = AccessLevel.PUBLIC)     // Entity 생성 시에도 사용 예정이므로 PUBLIC으로 변경
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

    public void addUser(User user) {
        this.user = user;
        getUser().getCommunityPostLikeList().add(this);
    }

    public void addCommunityPost(CommunityPost post) {
        this.communityPost = post;
        getCommunityPost().getLikeList().add(this);
    }
}
