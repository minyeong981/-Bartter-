package com.ssafy.bartter.community.repository;

import com.ssafy.bartter.community.entity.CommunityPost;
import com.ssafy.bartter.global.common.Location;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommunityPostRepository extends JpaRepository<CommunityPost, Integer>, CommunityPostRepositoryCustom {
    List<CommunityPost> findAllByUserId(Integer userId, PageRequest pageable);
}
