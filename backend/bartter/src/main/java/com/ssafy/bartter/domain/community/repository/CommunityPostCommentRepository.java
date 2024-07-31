package com.ssafy.bartter.domain.community.repository;

import com.ssafy.bartter.domain.community.entity.CommunityPostComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityPostCommentRepository extends JpaRepository<CommunityPostComment, Integer> {
}
