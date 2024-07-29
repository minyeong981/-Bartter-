package com.ssafy.bartter.auth.dto;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

/**
 * 사용자 인증 정보를 담는 클래스.
 *
 * @author 김훈민
 */
@RequiredArgsConstructor
public class AuthUserDetails implements UserDetails {

    private final UserAuthDto userAuthDto;

    public int getUserId() {
        return userAuthDto.getId();
    }

    // TODO : Location id 가 있어야하고
    // 위치가 변경되면 여기 Location id 가 새로 등록되어야함

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


    /**
     * 사용자의 비밀번호를 반환하는 메서드
     *
     * @return 사용자의 암호화된 비밀번호
     */
    @Override
    public String getPassword() {
        return userAuthDto.getPassword();
    }

    /**
     * 사용자의 이름을 반환하는 메서드.
     *
     * @return 사용자의 아이디
     */
    @Override
    public String getUsername() {
        return userAuthDto.getUsername();
    }

    /**
     * 계정의 만료 여부를 확인하는 메서드
     *
     * @return 계정이 만료되지 않았다면 `true`, 그렇지 않으면 `false` 를 반환
     */
    @Override
    public boolean isAccountNonExpired() {
        return !userAuthDto.isAccountExpired();
    }

    /**
     * 계정의 잠김 여부를 확인하는 메서드.
     *
     * @return 계정이 잠기지 않았으면 `true`, 그렇지 않으면 `false` 를 반환
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * 자격 증명의 만료 여부를 확인하는 메서드.
     *
     * @return 자격 증명이 만료되지 않았으면 `true`, 그렇지 않으면 `false` 를 반환
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 계정의 활성화 여부를 확인하는 메서드.
     *
     * @return 계정이 활성화되어 있으면 `true`, 그렇지 않으면 `false` 를 반환
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
