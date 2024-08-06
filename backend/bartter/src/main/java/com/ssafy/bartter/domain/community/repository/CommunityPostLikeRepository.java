package com.ssafy.bartter.domain.community.repository;

import com.ssafy.bartter.domain.community.entity.CommunityPostLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * CommunityPostLikeRepository
 *
 * @Author 김가람
 * */
public interface CommunityPostLikeRepository extends JpaRepository<CommunityPostLike, Integer> {
    Optional<CommunityPostLike> findByCommunityPostIdAndUserId(int communityPostId, int userId);
}
