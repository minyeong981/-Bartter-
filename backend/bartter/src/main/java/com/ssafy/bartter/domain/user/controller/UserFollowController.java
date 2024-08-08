package com.ssafy.bartter.domain.user.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.user.services.FollowService;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

/**
 * 사용자의 팔로우/언팔로우 기능을 처리하는 컨트롤러 클래스
 *
 * @author 김훈민
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/follow")
@Tag(name = "팔로우 API", description = "사용자의 팔로우/언팔로우 기능을 처리하는 API입니다.")
public class UserFollowController {
    private final FollowService followService;

    /**
     * 사용자가 다른 사용자를 팔로우하는 메서드
     *
     * @param currentUser 현재 로그인한 사용자 정보
     * @param userId 팔로우할 대상 사용자의 ID
     * @return 팔로우 성공 여부를 나타내는 SuccessResponse 객체
     * @throws CustomException 자신을 팔로우하려는 경우 예외 발생
     */
    @PostMapping("/{userId}")
    @Operation(summary = "사용자 팔로우", description = "현재 사용자가 다른 사용자를 팔로우합니다.")
    public SuccessResponse<Void> followUser(@CurrentUser UserAuthDto currentUser, @PathVariable("userId") int userId) {
        if(currentUser.getId() == userId)
            throw new CustomException(ErrorCode.FOLLOW_SELF_NOT_ALLOWED);
        followService.followUser(currentUser.getId(), userId);
        return SuccessResponse.empty();
    }

    /**
     * 사용자가 다른 사용자를 언팔로우하는 메서드
     *
     * @param currentUser 현재 로그인한 사용자 정보
     * @param userId 언팔로우할 대상 사용자의 ID
     * @return 언팔로우 성공 여부를 나타내는 SuccessResponse 객체
     * @throws CustomException 자신을 언팔로우하려는 경우 예외 발생
     */
    @DeleteMapping("/{userId}")
    @Operation(summary = "사용자 언팔로우", description = "현재 사용자가 다른 사용자를 언팔로우합니다.")
    public SuccessResponse<Void> unfollowUser(@CurrentUser UserAuthDto currentUser, @PathVariable("userId") int userId) {
        if(currentUser.getId() == userId)
            throw new CustomException(ErrorCode.UNFOLLOW_SELF_NOT_ALLOWED);
        followService.unfollowUser(currentUser.getId(), userId);
        return SuccessResponse.empty();
    }
}
