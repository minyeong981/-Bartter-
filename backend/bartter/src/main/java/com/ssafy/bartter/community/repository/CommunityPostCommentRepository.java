package com.ssafy.bartter.community.repository;

import com.ssafy.bartter.community.entity.CommunityPostComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityPostCommentRepository extends JpaRepository<CommunityPostComment, Integer> {
}
