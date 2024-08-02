package com.ssafy.bartter.domain.user.services;

import com.ssafy.bartter.domain.user.entity.Follow;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.domain.user.repository.FollowRepository;
import com.ssafy.bartter.domain.user.repository.UserRepository;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Follow 서비스 클래스
 * 사용자 간의 팔로우 및 언팔로우 기능을 제공하는 서비스 레이어
 *
 * @author 김훈민
 */
@Service
@RequiredArgsConstructor
public class FollowService {
    private final FollowRepository followRepository;
    private final UserRepository userRepository;

    /**
     * 사용자가 다른 사용자를 팔로우하는 메서드
     *
     * @param followerId 팔로우를 하는 사용자의 ID
     * @param followeeId 팔로우를 당하는 사용자의 ID
     * @throws CustomException 팔로우하려는 사용자가 없거나 이미 팔로우 중인 경우 발생
     */
    public void followUser(int followerId, int followeeId) {
        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        User followee = userRepository.findById(followeeId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if (followRepository.findByFollowerAndFollowee(follower, followee).isPresent()) {
            throw new CustomException(ErrorCode.FOLLOW_ALREADY_EXISTS);
        }

        Follow follow = Follow.builder()
                .follower(follower)
                .followee(followee)
                .build();

        followRepository.save(follow);
    }

    /**
     * 사용자가 다른 사용자의 팔로우를 취소하는 메서드
     *
     * @param followerId 팔로우를 취소하는 사용자의 ID
     * @param followeeId 팔로우를 당한 사용자의 ID
     * @throws CustomException 팔로우 관계가 존재하지 않거나 사용자가 없는 경우 발생
     */
    @Transactional
    public void unfollowUser(int followerId, int followeeId) {
        User follower = userRepository.findById(followerId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        User followee = userRepository.findById(followeeId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        followRepository.findByFollowerAndFollowee(follower, followee)
                .orElseThrow(() -> new CustomException(ErrorCode.FOLLOW_NOT_EXIST));

        followRepository.deleteByFollowerAndFollowee(follower, followee);
    }
}
