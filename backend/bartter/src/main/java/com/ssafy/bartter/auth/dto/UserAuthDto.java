package com.ssafy.bartter.auth.dto;



import com.ssafy.bartter.global.common.Location;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * User 인증을 위한 Dto
 *
 * @author 김훈민
 */
@Getter
@NoArgsConstructor
public class UserAuthDto {
    /**
     * 사용자 id (PK)
     */
    private Integer id;

    /**
     * 사용자 아이디
     */
    private String username;

    /**
     * 사용자 비밀번호
     */
    private String password;

    /**
     * 사용자 위치 id (PK)
     */
    private int locationId;

    /**
     * 사용자 위치 이름
     */
    private String locationName;

    /**
     * 사용자 권한
     */
    private String role;

    /**
     * 사용자 탈퇴정보
     */
    private boolean isAccountExpired;

    @Builder
    public UserAuthDto(int id, String username, String password, int locationId, String locationName, String role, boolean isAccountExpired) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.locationId = locationId;
        this.locationName = locationName;
        this.role = role;
        this.isAccountExpired = isAccountExpired;
    }

}
