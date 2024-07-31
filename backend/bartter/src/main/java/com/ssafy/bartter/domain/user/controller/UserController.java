package com.ssafy.bartter.domain.user.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.AuthUserDetails;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.user.services.UserService;
import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.common.SimpleLocation;
import com.ssafy.bartter.global.common.SimpleLocation.LocationRequestDto;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.SuccessResponse;
import com.ssafy.bartter.global.service.LocationService;
import com.ssafy.bartter.domain.user.dto.UserJoinDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
public class UserController {

    private final UserService userService;
    private final LocationService locationService;

    /**
     * 새로운 사용자를 등록하는 메서드
     *
     * @param userJoinDto 사용자 가입 정보를 담고 있는 객체
     * @return 사용자 생성 성공 여부를 나타내는 ResponseEntity 객체
     */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/join")
    public SuccessResponse<Void> joinProcess(
            @RequestBody @Valid UserJoinDto userJoinDto,
            BindingResult bindingResult
    ) {
        if(bindingResult.hasErrors()){
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, bindingResult);
        }
        userService.joinProcess(userJoinDto);
        return SuccessResponse.empty();
    }


    /**
     * 사용자가 전달한 위도와 경도로 현재 위치 정보를 조회하는 메서드
     *
     * @param userLocationDto 위도와 경도 정보를 담은 DTO
     * @return 현재 위치 정보를 나타내는 ResponseEntity 객체
     */
    @PostMapping("/location")
    public SuccessResponse<SimpleLocation> findLocation(
            @RequestBody @Valid LocationRequestDto userLocationDto,
            BindingResult bindingResult
    ){
        if(bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, bindingResult);
        }

        // 위치 정보 조회
        Location location = locationService.getCurrentLocation(userLocationDto.getLatitude(), userLocationDto.getLongitude());
        return SuccessResponse.of(SimpleLocation.of(location));
    }

    /**
     * 사용자 탈퇴 요청을 처리하는 메서드
     *
     * @param userId 탈퇴할 사용자의 ID
     * @return 탈퇴 처리 결과를 나타내는 ResponseEntity 객체
     */
    @DeleteMapping("/{userId}")
    public SuccessResponse<Void> deleteUser(@PathVariable int userId) {
        log.debug("DELETE USER : {} ", userId);
        userService.deleteUser(userId);
        return SuccessResponse.empty();
    }

    @GetMapping("/ex")
    public ResponseEntity<UserAuthDto> getCurrentUser(@CurrentUser UserAuthDto userAuthDto) {
        // SecurityContextHolder 에서 Authentication 객체 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        // Authentication 객체에서 AuthUserDetails 가져오기
        AuthUserDetails authUserDetails = (AuthUserDetails) authentication.getPrincipal();
        System.out.println("username: " + userAuthDto.getUsername());
        System.out.println("userLocation ID : " + userAuthDto.getLocationId());
        return ResponseEntity.ok(userAuthDto);
    }
}
