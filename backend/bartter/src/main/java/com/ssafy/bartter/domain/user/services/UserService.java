package com.ssafy.bartter.domain.user.services;

import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.common.SimpleLocation;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.service.LocationService;
import com.ssafy.bartter.domain.user.dto.UserJoinDto;
import com.ssafy.bartter.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * User 관련 비즈니스 로직을 처리하는 서비스 클래스
 *
 * @author 김훈민
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final LocationService locationService;

    /**
     * 사용자의 가입 절차를 처리하는 메서드
     * 사용자 정보를 받아 데이터베이스에 저장
     *
     * @param userJoinDto 사용자의 가입 정보를 담은 DTO
     */
    public void joinProcess(UserJoinDto userJoinDto) {

        String username = userJoinDto.getUsername();
        boolean isExist = userRepository.existsByUsername(username);

        if (isExist) {
            log.warn("User with username {} already exists", username);
            throw new CustomException(ErrorCode.USER_ALREADY_EXISTS, "User with username " + username + " already exists.");
        }

        Location location = locationService.getCurrentLocation(userJoinDto.getLatitude(), userJoinDto.getLongitude());

        // User 객체 생성
        User user = User.builder()
                .username(username)
                .password(bCryptPasswordEncoder.encode(userJoinDto.getPassword()))
                .nickname(userJoinDto.getNickname())
                .birth(userJoinDto.getBirth())
                .gender(userJoinDto.getGender())
                .location(location)
                .phone(userJoinDto.getPhone())
                .email(userJoinDto.getEmail())
                .build();
        userRepository.save(user);
    }

    /**
     * 사용자를 삭제하는 메서드
     * 실제로 삭제하는 것은 아니고 메모리에 탈퇴 일자를 남김
     *
     * @param userId 삭제할 사용자의 ID
     */
    public void deleteUser(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        user.deactivate();
        userRepository.save(user);
    }

    /**
     * 사용자의 위치 정보를 변경하는 메서드
     *
     * @param userLocationDto 사용자가 전달한 위도와 경도 정보를 담은 DTO
     * @return 변경된 Location 객체
     */
    public Location updateUserLocation(Integer userId, SimpleLocation.LocationRequestDto userLocationDto) {
        Location location = locationService.getCurrentLocation(userLocationDto.getLatitude(), userLocationDto.getLongitude());
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        user.updateLocation(location);
        userRepository.save(user);
        return location;
    }
}
