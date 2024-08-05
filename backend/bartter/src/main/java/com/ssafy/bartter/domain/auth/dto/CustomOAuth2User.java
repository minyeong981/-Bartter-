package com.ssafy.bartter.domain.auth.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Getter
@RequiredArgsConstructor
public class CustomOAuth2User implements OAuth2User {

    private final transient UserAuthDto userAuthDto;
    private final boolean isTemporaryUser;

    @Override
    public Map<String, Object> getAttributes() {
        return null;
    }

    /**
     * 사용자의 권한 정보를 반환하는 메서드
     *
     * @return 사용자의 권한 컬렉션
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + userAuthDto.getRole()));

        return authorities;
    }

    @Override
    public String getName() {
        return userAuthDto.getNickname();
    }

    public String getUsername() {
        return userAuthDto.getUsername();
    }

    public int getUserId(){
        return userAuthDto.getId();
    }

    public boolean isAccountNonExpired() {
        return !userAuthDto.isAccountExpired();
    }

    public String getProfileImage(){
        return userAuthDto.getProfileImage();
    }

}
