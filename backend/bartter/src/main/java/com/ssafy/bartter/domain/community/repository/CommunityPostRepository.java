package com.ssafy.bartter.domain.community.repository;

import com.ssafy.bartter.domain.community.entity.CommunityPost;
import com.ssafy.bartter.global.common.Location;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * CommunityPostRepository
 *
 * @Author 김가람
 * */
public interface CommunityPostRepository extends JpaRepository<CommunityPost, Integer> {
    @Query(
            "SELECT p FROM CommunityPost p"
                    + " JOIN FETCH p.location l"
                    + " JOIN FETCH p.likeList"
                    + " WHERE p.title LIKE :keyword OR p.content LIKE :keyword"
                    + " AND l in :nearbyLocationList"
    )
    List<CommunityPost> findNearbyCommunityPostListByKeyword(
            @Param("keyword") String keyword,
            @Param("nearbyLocationList") List<Location> nearbyLocationList,
            PageRequest pageable
    );

    List<CommunityPost> findAllByUserId(int userId, PageRequest pageable);
}
