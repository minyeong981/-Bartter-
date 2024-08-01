package com.ssafy.bartter.domain.user.repository;

import com.ssafy.bartter.domain.user.entity.Follow;
import com.ssafy.bartter.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Follow 엔티티를 다루는 JPA 리포지토리 인터페이스
 *
 * @author 김훈민
 */
public interface FollowRepository extends JpaRepository<Follow, Integer> {
    /**
     * 팔로워와 팔로이를 기반으로 Follow 엔티티를 조회하는 메서드
     *
     * @param follower 팔로우를 하는 사용자
     * @param followee 팔로우를 당하는 사용자
     * @return 팔로우 관계를 나타내는 Optional 객체
     */
    Optional<Follow> findByFollowerAndFollowee(User follower, User followee);

    /**
     * 팔로워와 팔로이를 기반으로 Follow 엔티티를 삭제하는 메서드
     *
     * @param follower 팔로우를 취소하는 사용자
     * @param followee 팔로우 취소 대상 사용자
     */
    void deleteByFollowerAndFollowee(User follower, User followee);
}
