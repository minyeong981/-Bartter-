package com.ssafy.bartter.domain.community.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import com.ssafy.bartter.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Community Comment Entity
 *
 * @author 김용수
 */
@Entity
@Getter
@Table(name = "community_post_comment")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommunityPostComment extends BaseEntity {

    /**
     * 동네모임 게시글 댓글 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "community_post_comment_id")
    private Integer id;

    /**
     * 동네모임 댓글 작성자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 댓글이 달린 동네모임 게시글
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_post_id", nullable = false)
    private CommunityPost communityPost;

    /**
     * 댓글 내용
     */
    @Column(name = "community_post_comment_content", nullable = false, length = 500)
    private String content;

    public CommunityPostComment(String content) {
        this.content = content;
    }

    public void addUser(User user) {
        this.user = user;
        getUser().getCommunityPostCommentList().add(this);
    }

    public void addCommunityPost(CommunityPost communityPost) {
        this.communityPost = communityPost;
        getCommunityPost().getCommentList().add(this);
    }
}
