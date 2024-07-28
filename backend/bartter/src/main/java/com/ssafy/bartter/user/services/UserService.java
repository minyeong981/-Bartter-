package com.ssafy.bartter.user.services;

import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.repository.LocationRepository;
import com.ssafy.bartter.global.service.LocationService;
import com.ssafy.bartter.user.dto.UserJoinDto;
import com.ssafy.bartter.user.entity.User;
import com.ssafy.bartter.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * User 관련 비즈니스 로직을 처리하는 서비스 클래스
 *
 * @author 김훈민
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final LocationService locationService;
    private final LocationRepository locationRepository;

    /**
     * 사용자의 가입 절차를 처리하는 메서드
     * 사용자 정보를 받아 데이터베이스에 저장
     *
     * @param userJoinDto 사용자의 가입 정보를 담은 DTO
     */
    public void joinProcess(UserJoinDto userJoinDto) {

        String username = userJoinDto.getUsername();

        Boolean isExist = userRepository.existsByUsername(username);

        if (isExist) return;

        // 위도와 경도를 사용하여 Location 엔티티 조회
//        Location location = locationService.getCurrentLocation(userJoinDto.getLatitude(), userJoinDto.getLongitude());
//        System.out.println("location : " + location);

        // 임의의 Location 엔티티 생성
        int locationId = 1;
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new RuntimeException("Location not found with id: " + locationId));



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

}
