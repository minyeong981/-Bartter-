package com.ssafy.bartter.community.repository;

import com.ssafy.bartter.community.entity.CommunityPost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityPostRepository extends JpaRepository<CommunityPost, Integer> {
}
