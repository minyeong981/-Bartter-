package com.ssafy.bartter.community.repository;

import com.ssafy.bartter.community.entity.CommunityPostLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityPostLikeRepository extends JpaRepository<CommunityPostLike, Integer> {
    CommunityPostLike findByCommunityPostIdAndUserId(Integer communityPostId, Integer userId);
}
