package com.ssafy.bartter.domain.community.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.domain.user.entity.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * Community Entity
 *
 * @author 김용수
 */
@Entity
@Getter
@Table(name = "community_post")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommunityPost extends BaseEntity {

    /**
     * 동네모임 커뮤니티 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "community_post_id")
    private Integer id;

    /**
     * 게시글 작성자
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 작성 위치
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;

    /**
     * 게시글 제목
     */
    @Column(name = "community_post_title", nullable = false, length = 50)
    private String title;

    /**
     * 게시글 내용
     */
    @Column(name = "community_post_content", nullable = false, length = 2000)
    private String content;

    /**
     * 게시글 좋아요
     */
    @OneToMany(mappedBy = "communityPost", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommunityPostLike> likeList = new ArrayList<>();

    /**
     * 게시글 댓글
     */
    @OneToMany(mappedBy = "communityPost", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommunityPostComment> commentList = new ArrayList<>();

    /**
     * 게시글 이미지
     */
    @OneToMany(mappedBy = "communityPost", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommunityPostImage> imageList = new ArrayList<>();

    @Builder
    public CommunityPost(User user, Location location, String title, String content) {
        this.user = user;
        this.location = location;
        this.title = title;
        this.content = content;
    }
}
