package com.ssafy.bartter.domain.user.dto;

import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.global.common.SimpleLocation;
import lombok.Builder;
import lombok.Getter;

/**
 * User 엔티티 Dto
 *
 * @author 김훈민
 */
@Builder
public class UserDto {

    /**
     * 간단한 유저 프로필 조회 Response
     * */
    @Getter
    @Builder
    public static class SimpleUserProfile {
        private final Integer userId;
        private final String username;
        private final String profileImage;

        public static SimpleUserProfile of(User user) {
            return SimpleUserProfile.builder()
                    .userId(user.getId())
                    .username(user.getUsername())
                    .profileImage(user.getProfileImage())
                    .build();
        }
    }

    /**
     * 사용자의 프로필을 조회할때 사용되는 response
     */
    @Getter
    @Builder
    public static class UserProfile {
        private final Integer userId;
        private final String profileImage;
        private final String nickname;
        private final String profileMessage;
        private final SimpleLocation simpleLocation;
        private final int followerCount;
        private final int followeeCount;

        public static UserProfile of(User user) {
            return UserProfile.builder()
                    .userId(user.getId())
                    .nickname(user.getNickname())
                    .profileImage(user.getProfileImage())
                    .followeeCount(user.getFolloweeCount())
                    .followerCount(user.getFollowerCount())
                    .profileMessage(user.getProfileMessage())
                    .simpleLocation(SimpleLocation.of(user.getLocation()))
                    .build();
        }
    }
}
