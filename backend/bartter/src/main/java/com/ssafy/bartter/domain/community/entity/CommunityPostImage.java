package com.ssafy.bartter.domain.community.entity;

import com.ssafy.bartter.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Community Post Image Entity
 *
 * @author 김용수
 */
@Entity
@Getter
@Table(name = "community_post_image")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommunityPostImage extends BaseEntity {

    /**
     * 동네모임 게시글 이미지 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "community_post_image_id")
    private Integer id;

    /**
     * 이미지를 가진 동네모임 게시글
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_post_id", nullable = false)
    private CommunityPost communityPost;

    /**
     * AWS S3에 업로드 된 이미지 주소
     */
    @Column(name = "community_post_image_url", nullable = false, length = 300)
    private String imageUrl;

    /**
     * 이미지 순서
     */
    @Column(name = "community_post_image_order",nullable = false)
    private Integer order;

    @Builder
    public CommunityPostImage(CommunityPost communityPost, String imageUrl, Integer order) {
        this.imageUrl = imageUrl;
        this.order = order;
    }

    public void addCommunityPost(CommunityPost communityPost) {
        this.communityPost = communityPost;
        getCommunityPost().getImageList().add(this);
    }
}
