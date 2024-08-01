package com.ssafy.bartter.domain.auth.service;

import com.ssafy.bartter.domain.auth.dto.AuthUserDetails;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.function.Function;

/**
 * 사용자 인증을 위한 사용자 정보를 제공하는 서비스 클래스
 * 데이터베이스에서 사용자를 조회하여 해당 사용자의 정보를 `UserDetails` 형태로 반환
 *
 * @author 김훈민
 */
@Service
@RequiredArgsConstructor
public class AuthUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * 주어진 사용자 이름으로 사용자를 조회하고 인증 정보를 반환하는 메서드.
     *
     * @param username 조회할 사용자의 이름
     * @return `UserDetails` 사용자 인증 정보
     * @throws UsernameNotFoundException 사용자가 존재하지 않는 경우 예외 발생
     */
    @Override
    @Transactional(readOnly = true)
    public AuthUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if(user == null)
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        if(user.getLocation() == null)
            throw new CustomException(ErrorCode.USER_LOCATION_NOT_FOUND);
        if(user.getDeletedAt() != null)
            throw new CustomException(ErrorCode.USER_ACCOUNT_DEACTIVATED);

        UserAuthDto userAuthDto = UserAuthDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .role(user.getRole().name())
                .locationId(user.getLocation().getId())
                .locationName(user.getLocation().getName())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .profileMessage(user.getProfileMessage())
                .isAccountExpired(user.isAccountExpired())
                .build();
        return new AuthUserDetails(userAuthDto);
    }

    /**
     * 주어진 UserDetails 객체를 사용하여 UserAuthDto 객체를 가져오는 함수형 인터페이스를 빈으로 등록하는 메서드
     *
     * @return 주어진 UserDetails 객체에서 UserAuthDto 객체를 가져오는 함수형 인터페이스
     */
    @Bean
    public Function<UserDetails, UserAuthDto> fetchUser() {
        return authUserDetails -> {
            if(Objects.isNull(authUserDetails)) throw new CustomException(ErrorCode.UNAUTHORIZED);
            return this.loadUserByUsername(authUserDetails.getUsername()).getUserAuthDto();
        };
    }
}
