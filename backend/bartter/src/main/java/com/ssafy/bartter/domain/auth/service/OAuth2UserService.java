package com.ssafy.bartter.domain.auth.service;

import com.ssafy.bartter.domain.auth.dto.CustomOAuth2User;
import com.ssafy.bartter.domain.auth.dto.OAuth2ResponseDto;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.domain.user.repository.UserRepository;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.function.Function;


/**
 * OAuth2 사용자 서비스 클래스
 * OAuth2 인증을 통해 사용자 정보를 로드하고 처리하는 역할
 * 카카오 OAuth2를 통해 인증된 사용자 정보를 처리
 *
 * @author 김훈민
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    /**
     * OAuth2 사용자 정보를 로드하는 메서드.
     * 카카오 OAuth2 서버에서 사용자 정보를 로드하고, 사용자 정보를 검증 및 처리
     *
     * @param userRequest OAuth2UserRequest 객체
     * @return OAuth2User 객체
     * @throws OAuth2AuthenticationException OAuth2 인증 예외
     */
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // super 를 통해서 생성자를 불러서 값을 획득한다
        OAuth2User oAuth2User = super.loadUser(userRequest);
        log.debug("oAuth2User : {}", oAuth2User);

        // kakao 로부터 들어온 정보 검증
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        if (!registrationId.equals("kakao")) {
            throw new CustomException(ErrorCode.INVALID_REGISTRATION_ID);
        }
        OAuth2ResponseDto oAuth2Response = new OAuth2ResponseDto(oAuth2User.getAttributes());
        if(oAuth2Response.getNickname() == null)
            throw new CustomException(ErrorCode.KAKAO_NICKNAME_NOT_FOUND);
        if(oAuth2Response.getEmail() == null)
            throw new CustomException(ErrorCode.KAKAO_EMAIL_NOT_FOUND);
        if(oAuth2Response.getProfileImg() == null)
            throw new CustomException(ErrorCode.KAKAO_PROFILE_IMG_NOT_FOUND);
        // error 처리 end

        // Unique 한 username 생성
        String username = oAuth2Response.getProvider() + "_" + oAuth2Response.getProviderId();
        User user = userRepository.findByUsername(username);
        // 한번도 로그인 하지 않은 경우
        if(user == null){
            UserAuthDto userAuthDto = UserAuthDto.builder()
                    .username(username)
                    .nickname(oAuth2Response.getNickname())
                    .email(oAuth2Response.getEmail())
                    .profileImage(oAuth2Response.getProfileImg())
                    .build();
            return new CustomOAuth2User(userAuthDto, true);
        }


        user.updateProfile(oAuth2Response.getNickname(), oAuth2Response.getEmail(), oAuth2Response.getProfileImg());
        userRepository.save(user);
        // UserAuthDto 생성
        UserAuthDto userAuthDto = UserAuthDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .password(user.getPassword())
                .locationId(user.getLocation().getId())
                .locationName(user.getLocation().getName())
                .role(user.getRole().toString())
                .isAccountExpired(user.isAccountExpired())
                .nickname(user.getNickname())
                .profileImage(user.getProfileImage())
                .profileMessage(user.getProfileMessage())
                .build();
        return new CustomOAuth2User(userAuthDto, false);
    }

    /**
     * OAuth 사용자 정보를 가져오는 함수를 반환하는 메서드.
     *
     * @return UserDetails 객체를 UserAuthDto 객체로 변환하는 함수
     */
    @Bean
    public Function<UserDetails, UserAuthDto> fetchOAuthUser() {
        return authUserDetails -> {
            if(Objects.isNull(authUserDetails)) throw new CustomException(ErrorCode.UNAUTHORIZED);
            return ((CustomOAuth2User) authUserDetails).getUserAuthDto();
        };
    }

}
