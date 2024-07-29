package com.ssafy.bartter.user.controller;

import com.ssafy.bartter.auth.annotation.CurrentUser;
import com.ssafy.bartter.auth.dto.UserAuthDto;
import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.common.SimpleLocation;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.response.ErrorResponse;
import com.ssafy.bartter.global.response.SuccessResponse;
import com.ssafy.bartter.global.service.LocationService;
import com.ssafy.bartter.user.dto.UserJoinDto;
import com.ssafy.bartter.user.dto.UserLocationDto;
import com.ssafy.bartter.user.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @PostMapping("/join")
    public ResponseEntity<?> joinProcess(@Valid @RequestBody UserJoinDto userJoinDto) {
        try {
            userService.joinProcess(userJoinDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new SuccessResponse<>("사용자가 성공적으로 생성되었습니다."));
        } catch (CustomException e) {
            return ResponseEntity.status(e.getErrorCode().getStatus())
                    .body(ErrorResponse.of(e));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ErrorResponse.of(e));
        }
    }

    /**
     * 사용자가 전달한 위도와 경도로 현재 위치 정보를 조회하는 메서드
     *
     * @param userLocationDto 위도와 경도 정보를 담은 DTO
     * @return 현재 위치 정보를 나타내는 ResponseEntity 객체
     */
    @PostMapping("/location")
    public ResponseEntity<?> findLocation(@Valid @RequestBody UserLocationDto userLocationDto){
        try {
            double latitude = userLocationDto.getLatitude();
            double longitude = userLocationDto.getLongitude();

            // 위치 정보 조회
            Location location = locationService.getCurrentLocation(latitude, longitude);
            SimpleLocation simpleLocation = SimpleLocation.of(location);
            log.debug("simpleLocation name : {}", simpleLocation.getName());
            return ResponseEntity.ok(new SuccessResponse<>(simpleLocation));
        } catch (CustomException e) {
            return ResponseEntity.status(e.getErrorCode().getStatus())
                    .body(ErrorResponse.of(e));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ErrorResponse.of(e));
        }
    }

    // annotation 사용 예시
    @GetMapping("/ex")
    public ResponseEntity<UserAuthDto> getCurrentUser(@CurrentUser UserAuthDto userAuthDto) {
        if (userAuthDto == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 인증되지 않은 경우 처리
        }
        log.debug("username: {}", userAuthDto.getUsername());
        log.debug("Location id: {}", userAuthDto.getLocationId());
        log.debug("Location name: {}", userAuthDto.getLocationName());
        return ResponseEntity.ok(userAuthDto);
    }

}
