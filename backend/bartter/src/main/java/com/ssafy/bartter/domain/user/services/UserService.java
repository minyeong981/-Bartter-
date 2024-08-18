package com.ssafy.bartter.domain.user.services;

import com.ssafy.bartter.domain.auth.dto.OAuthTempUserInfoDto;
import com.ssafy.bartter.domain.user.dto.UserDto;
import com.ssafy.bartter.domain.user.dto.UserJoinDto;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.domain.user.repository.FollowRepository;
import com.ssafy.bartter.domain.user.repository.RedisFcmRepository;
import com.ssafy.bartter.domain.user.repository.UserRepository;
import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.common.SimpleLocation;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.service.FCMService;
import com.ssafy.bartter.global.service.LocationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * User 관련 비즈니스 로직을 처리하는 서비스 클래스
 *
 * @author 김훈민
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final RedisFcmRepository redisFcmRepository;
    private final FollowRepository followRepository;
    private final LocationService locationService;
    private final UserRepository userRepository;
    private final FCMService fcmService;

    @Value("${cloud.aws.url}")
    private String url;


    /**
     * 사용자의 가입 절차를 처리하는 메서드
     * 사용자 정보를 받아 데이터베이스에 저장
     *
     * @param userJoinDto 사용자의 가입 정보를 담은 DTO
     */
    @Transactional
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
                .profileImage(url + "/defaultProfile")
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
     * 키워드를 포함하는 닉네임을 가진 사용자를 불러오는 메서드
     */
    public List<User> getUsers(int offset, int limit, String keyword) {
        PageRequest pageable = PageRequest.of(offset, limit);
        return userRepository.findUserListByKeyword(keyword, pageable).getContent();
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

    /**
     * 특정 사용자의 위치 정보를 조회하는 메서드
     *
     * @param userId 조회할 사용자의 ID
     * @return 위치 정보를 담은 객체
     */
    @Transactional(readOnly = true)
    public SimpleLocation getUserLocation(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        if (user.getLocation() == null) {
            throw new CustomException(ErrorCode.USER_LOCATION_NOT_FOUND);
        }
        return SimpleLocation.of(user.getLocation());
    }

    /**
     * 주어진 사용자 ID에 해당하는 사용자 프로필을 반환하는 메서드
     *
     * @param userId 사용자의 ID
     * @return 사용자의 프로필 정보
     */
    public UserDto.UserProfile getUserProfile(int userId, int currentUserId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        boolean isFollowed = followRepository.existsByFollowerIdAndFolloweeId(currentUserId, userId);
        return UserDto.UserProfile.of(user, isFollowed);
    }


    /**
     * 카카오 유저 회원가입 메서드
     */
    public User registerKakaoUser(SimpleLocation.LocationRequestDto locationRequestDto, OAuthTempUserInfoDto userInfo) {
        log.debug("SimpleLocation.LocationRequestDto locationRequestDto : {}", locationRequestDto);
        Location location = locationService.getCurrentLocation(locationRequestDto.getLatitude(), locationRequestDto.getLongitude());

        User user = User.builder()
                .username(userInfo.getUsername())
                .nickname(userInfo.getNickname())
                .location(location)
                .email(userInfo.getEmail())
                .profileImage(userInfo.getProfileImage())
                .build();

        return userRepository.save(user);
    }

    /**
     * 등록된 모든 사용자를 조회하는 메서드
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * 레디스에 사용자 FCM 토큰을 저장
     *
     * @param token FCM 토큰
     * @param userId 사용자 Id
     */
    public void saveFcmToken(int userId, String token) {
        redisFcmRepository.save(userId, token);
    }

    /**
     * 레디스에서 사용자 FCM 토큰을 가져온다.
     */
    public String getFcmToken(int userId) {
        return redisFcmRepository.getToken(userId);
    }

    /**
     * 레디스에서 사용자 FCM 토큰을 제거한다.
     * @param userId 토큰을 지우려는 사용자의 ID
     */
    public void removeToken(int userId) {
        redisFcmRepository.remove(userId);
    }

    public void sendLoginAlarm(int userId, String nickname) {
        String token = getFcmToken(userId);
        fcmService.sendLoginAlarm(token, nickname);
    }

    public void sendChattingAlarm(int receiverId, int senderId,String url) {
        String token = getFcmToken(receiverId);
        userRepository.findByUserId(senderId).ifPresent(
                o -> fcmService.sendChattingAlarm(token, o.getNickname(), o.getProfileImage(), url)
        );
    }

    public String getNicknameByUserId(int userId) {
        return userRepository.findNicknameByUserId(userId);
    }

    public boolean isExistByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}
