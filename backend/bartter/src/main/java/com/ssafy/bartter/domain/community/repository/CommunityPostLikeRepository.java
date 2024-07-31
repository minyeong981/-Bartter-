package com.ssafy.bartter.domain.community.repository;

import com.ssafy.bartter.domain.community.entity.CommunityPostLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityPostLikeRepository extends JpaRepository<CommunityPostLike, Integer> {
    CommunityPostLike findByCommunityPostIdAndUserId(Integer communityPostId, Integer userId);
}
