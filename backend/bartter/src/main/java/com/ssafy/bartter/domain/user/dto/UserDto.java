package com.ssafy.bartter.domain.user.dto;

import com.ssafy.bartter.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * User 엔티티 Dto
 * */
public class UserDto {

    /**
     * 간단한 유저 프로필 조회 Response
     * */
    @Getter
    @Builder
    @AllArgsConstructor
    public static class SimpleUserProfile {
        private final Integer userId;
        private final String username;
        private final String profileImage;

        public static final SimpleUserProfile of(User user) {
            return SimpleUserProfile.builder()
                    .userId(user.getId())
                    .username(user.getUsername())
                    .profileImage(user.getProfileImage())
                    .build();
        }
    }
}
