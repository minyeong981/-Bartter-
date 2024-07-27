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

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final LocationService locationService;
    private final LocationRepository locationRepository;

    public void joinProcess(UserJoinDto userJoinDto) {

        String username = userJoinDto.getUsername();

        Boolean isExist = userRepository.existsByUsername(username);

        if (isExist) return;
        System.out.println("userService, user : " + userJoinDto);

        // 위도와 경도를 사용하여 Location 엔티티 조회
//        Location location = locationService.getCurrentLocation(userJoinDto.getLatitude(), userJoinDto.getLongitude());
//        System.out.println("location : " + location);

        // 임의의 Location 엔티티 생성
        int locationId = 1; // 예시로 1번 ID를 사용합니다. 실제로는 적절한 ID를 사용해야 합니다.
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() -> new RuntimeException("Location not found with id: " + locationId));

        System.out.println("location : " + location);


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
        System.out.println("user " + user);
        userRepository.save(user);
    }

}
