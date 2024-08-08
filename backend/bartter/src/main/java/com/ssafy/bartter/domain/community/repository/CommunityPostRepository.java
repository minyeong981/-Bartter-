package com.ssafy.bartter.domain.community.repository;

import com.ssafy.bartter.domain.community.entity.CommunityPost;
import com.ssafy.bartter.global.common.Location;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
                    + " WHERE (p.title LIKE :keyword OR p.content LIKE :keyword)"
                    + " AND (:isCommunity = false OR l in :nearbyLocationList)"
    )
    List<CommunityPost> findNearbyCommunityPostListByKeyword(
            @Param("keyword") String keyword,
            @Param("isCommunity") boolean isCommunity,
            @Param("nearbyLocationList") List<Location> nearbyLocationList,
            PageRequest pageable
    );

    @Query(
            "SELECT p FROM CommunityPost p"
                    + " JOIN FETCH p.user u"
                    + " JOIN FETCH p.location"
                    + " JOIN FETCH p.imageList"
                    + " WHERE u.id = :userId"
    )
    List<CommunityPost> findAllByUserId(
            @Param("userId") int userId,
            PageRequest pageable
    );
}
