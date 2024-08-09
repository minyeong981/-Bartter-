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
        private int userId;
        private String nickname;
        private String profileImage;

        public static SimpleUserProfile of(User user) {
            return SimpleUserProfile.builder()
                    .userId(user.getId())
                    .nickname(user.getNickname())
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
        private int userId;
        private String profileImage;
        private String nickname;
        private String profileMessage;
        private SimpleLocation location;
        private int followerCount;
        private int followeeCount;
        private Boolean isFollowed;

        public static UserProfile of(User user, Boolean isFollowed) {
            return UserProfile.builder()
                    .userId(user.getId())
                    .nickname(user.getNickname())
                    .profileImage(user.getProfileImage())
                    .followeeCount(user.getFolloweeCount())
                    .followerCount(user.getFollowerCount())
                    .profileMessage(user.getProfileMessage())
                    .location(SimpleLocation.of(user.getLocation()))
                    .isFollowed(isFollowed)
                    .build();
        }
    }

    @Getter
    @Builder
    public static class SearchUserProfile {
        private int userId;
        private String nickname;
        private String profileImage;
        private Boolean isFollow;

        public static SearchUserProfile of(User user, int currentUserId) {
            return SearchUserProfile.builder()
                    .userId(user.getId())
                    .nickname(user.getNickname())
                    .profileImage(user.getProfileImage())
                    .isFollow(user.getFollowerList().stream()
                            .map(o -> o.getFollower().getId())
                            .anyMatch(o -> o == currentUserId))
                    .build();
        }
    }
}
