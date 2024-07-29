package com.ssafy.bartter.auth.service;

import com.ssafy.bartter.auth.dto.AuthUserDetails;
import com.ssafy.bartter.auth.dto.UserAuthDto;
import com.ssafy.bartter.user.entity.User;
import com.ssafy.bartter.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        UserAuthDto userAuthDto = UserAuthDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .role(user.getRole().name())
                .isAccountExpired(user.isAccountExpired())
                .build();


        return new AuthUserDetails(userAuthDto);
    }
}
