package com.ssafy.bartter.domain.user.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.user.dto.UserDto;
import com.ssafy.bartter.domain.user.dto.UserDto.FcmToken;
import com.ssafy.bartter.domain.user.services.UserService;
import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.common.SimpleLocation;
import com.ssafy.bartter.global.common.SimpleLocation.LocationRequestDto;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.SuccessResponse;
import com.ssafy.bartter.global.service.FCMService;
import com.ssafy.bartter.global.service.LocationService;
import com.ssafy.bartter.domain.user.dto.UserJoinDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


/**
 * User 와 관련된 요청을 처리하는 컨트롤러 클래스
 *
 * @author 김훈민
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Tag(name = "사용자 API", description = "사용자 등록/조회/삭제 관련 API입니다.")
public class UserController {

    private final UserService userService;
    private final LocationService locationService;
    private final FCMService fcmService;

    /**
     * 새로운 사용자를 등록하는 메서드
     *
     * @param userJoinDto 사용자 가입 정보를 담고 있는 객체
     * @return 사용자 생성 성공 여부를 나타내는 SuccessResponse 객체
     */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/join")
    @Operation(summary = "사용자 가입", description = "새로운 사용자를 등록합니다.")
    public SuccessResponse<Void> joinProcess(
            @RequestBody @Valid UserJoinDto userJoinDto,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, bindingResult);
        }
        userService.joinProcess(userJoinDto);
        return SuccessResponse.empty();
    }


    /**
     * 사용자가 전달한 위도와 경도로 현재 위치 정보를 조회하는 메서드
     *
     * @param userLocationDto 위도와 경도 정보를 담은 DTO
     * @return 현재 위치 정보를 나타내는 SuccessResponse 객체
     */
    @PostMapping("/location")
    @Operation(summary = "현재 위치 조회", description = "사용자가 전달한 위도와 경도로 현재 위치 정보를 조회합니다.")
    public SuccessResponse<SimpleLocation> findLocation(
            @RequestBody @Valid LocationRequestDto userLocationDto,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, bindingResult);
        }
        // 위치 정보 조회
        Location location = locationService.getCurrentLocation(userLocationDto.getLatitude(), userLocationDto.getLongitude());
        return SuccessResponse.of(SimpleLocation.of(location));
    }

    /**
     * 사용자 위치 변경 요청을 처리하는 메서드
     *
     * @param userLocationDto 위도와 경도 정보를 담은 DTO
     * @return 성공 여부를 나타내는 응답 객체
     */
    @PatchMapping("/location")
    @Operation(summary = "위치 정보 변경", description = "사용자의 위치 정보를 변경합니다.")
    public SuccessResponse<SimpleLocation> updateLocation(
            @CurrentUser UserAuthDto userAuthDto,
            @RequestBody @Valid LocationRequestDto userLocationDto,
            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, bindingResult);
        }
        log.debug("CHANGE LOCATION for User ID: {} to Latitude: {}", userAuthDto.getId(), userLocationDto.getLatitude());
        Location location = userService.updateUserLocation(userAuthDto.getId(), userLocationDto);

        return SuccessResponse.of(SimpleLocation.of(location));
    }

    /**
     * 특정 유저의 위치 정보를 조회하는 메서드
     *
     * @param userId 조회할 사용자의 ID
     * @return 위치 정보를 담은 응답 객체
     */
    @GetMapping("/{userId}/location")
    @Operation(summary = "특정 사용자 위치 조회", description = "특정 사용자의 위치 정보를 조회합니다.")
    public SuccessResponse<SimpleLocation> getUserLocation(@PathVariable("userId") int userId) {
        log.debug("GET USER LOCATION for User ID: {}", userId);
        SimpleLocation userLocation = userService.getUserLocation(userId);
        return SuccessResponse.of(userLocation);
    }

    /**
     * 사용자의 프로필을 조회하는 메서드
     *
     * @param userId 사용자의 ID
     * @return 조회 결과를 나타내는 SuccessResponse 객체
     */
    @GetMapping("/{userId}/profile")
    @Operation(summary = "사용자 프로필 조회", description = "사용자의 프로필을 조회합니다.")
    public SuccessResponse<UserDto.UserProfile> getUserProfile(
            @PathVariable("userId") int userId,
            @CurrentUser UserAuthDto currentUser) {
        log.debug("Get User Profile : {} ", userId);
        UserDto.UserProfile userProfile = userService.getUserProfile(userId, currentUser.getId());
        return SuccessResponse.of(userProfile);
    }


    /**
     * 사용자 탈퇴 요청을 처리하는 메서드
     *
     * @param userId 탈퇴할 사용자의 ID
     * @return 탈퇴 처리 결과를 나타내는 SuccessResponse 객체
     */
    @DeleteMapping("/{userId}")
    @Operation(summary = "사용자 탈퇴", description = "사용자가 탈퇴 요청을 처리합니다.")
    public SuccessResponse<Void> deleteUser(@PathVariable("userId") int userId) {
        log.debug("DELETE USER : {} ", userId);
        userService.deleteUser(userId);
        return SuccessResponse.empty();
    }

    @PostMapping("/fcm")
    @Operation(summary = "사용자 FCM 토큰 저장", description = "사용자의 FCM 토큰을 저장합니다.")
    public SuccessResponse<Void> saveFCMToken(
            @RequestBody FcmToken token,
            @CurrentUser UserAuthDto user
    ) {
        log.debug("{}", token);
        userService.saveFcmToken(user.getId(), token.getToken());
        userService.sendLoginAlarm(user.getId());
        return SuccessResponse.empty();
    }

    @DeleteMapping("/fcm")
    @Operation(summary = "사용자 FCM 토큰 제거", description = "사용자의 FCM 토큰을 제거합니다.")
    public SuccessResponse<Void> removeFCMToken(
            @CurrentUser UserAuthDto user
    ) {
        userService.deleteUser(user.getId());
        return SuccessResponse.empty();
    }
}
