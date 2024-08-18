package com.ssafy.bartter.domain.user.entity;

import com.ssafy.bartter.domain.community.entity.CommunityPost;
import com.ssafy.bartter.domain.community.entity.CommunityPostComment;
import com.ssafy.bartter.domain.community.entity.CommunityPostLike;
import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.domain.report.entity.CropReport;
import com.ssafy.bartter.domain.report.entity.DailyTip;
import com.ssafy.bartter.global.common.BaseEntity;
import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.domain.trade.entity.Trade;
import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.domain.trade.entity.TradePostLike;
import jakarta.persistence.*;
import lombok.*;
import org.checkerframework.common.aliasing.qual.Unique;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * User Entity
 *
 * @author 김용수
 */
@Entity
@Getter
@Table(name = "user")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {

    /**
     * 사용자 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer id;

    /**
     * 사용자 위치
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    private Location location;


    /**
     * 사용자 아이디
     */
    @Unique
    @Column(name = "user_username", nullable = false, length = 50)
    private String username;

    /**
     * 사용자 비밀번호
     */
    @Column(name = "user_password", length = 255)
    private String password;

    /**
     * 사용자 권한
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "user_role", nullable = false)
    private Role role = Role.USER;

    /**
     * 사용자 닉네임
     */
    @Column(name = "user_nickname", nullable = false)
    private String nickname;

    /**
     * 사용자 핸드폰
     */
    @Column(name = "user_phone", length = 11)
    private String phone;

    /**
     * 사용자 성별
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "user_gender", length = 1)
    private Gender gender;

    /**
     * 사용자 이메일
     */
    @Column(name = "user_email", length = 50)
    private String email;

    /**
     * 사용자 생년월일
     */
    @Column(name = "user_birth_date")
    private LocalDate birth;

    /**
     * 사용자 프로필 이미지
     */
    @Column(name = "user_profile_image", nullable = false)
    private String profileImage;

    /**
     * 사용자 프로필 메시지
     */
    @Column(name = "user_profile_message")
    private String profileMessage;

    /**
     * 인증자
     *
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "user_provider", nullable = false, length = 10)
    private Provider provider = Provider.LOCAL;

    /**
     * 인증자 아이디
     */
    @Column(name = "user_provider_id", length = 100)
    private String providerId;

    /**
     * 회원 탈퇴 여부
     * 스프링 시큐리티로 오버라이딩 예정
     */
    @Column(name = "delete_status", nullable = false)
    private boolean isAccountExpired;

    /**
     * 회원 탈퇴 일자
     */
    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    /**
     * 사용자가 작성한 게시글 목록
     */
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<CommunityPost> communityPostList = new ArrayList<>();

    /**
     * 사용자가 좋아요한 게시글 목록
     */
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommunityPostLike> communityPostLikeList = new ArrayList<>();

    /**
     * 사용자가 작성한 댓글 목록
     */
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommunityPostComment> communityPostCommentList = new ArrayList<>();

    /**
     * 해당 사용자가 키우는 작물 목록
     */
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Crop> cropList = new ArrayList<>();

    /**
     * 해당 사용자가 작성한 물물교환 게시글
     */
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TradePost> tradePostList = new ArrayList<>();

    /**
     * 해당 사용자가 찜한 물물교환 게시글 목록
     */
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TradePostLike> tradePostLikeList = new ArrayList<>();

    /**
     * 해당 사용자가 팔로우 하는 사용자 목록
     */
    @OneToMany(mappedBy = "followee", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Follow> followerList = new ArrayList<>();

    /**
     * 해당 사용자를 팔로우하는 사용자 목록
     */
    @OneToMany(mappedBy = "follower", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Follow> followeeList = new ArrayList<>();

    /**
     * 현재 사용자가 신청한 물물교환 목록
     */
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Trade> tradeList = new ArrayList<>();

    /**
     * 해당 사용자의 AI 요약 리포트 목록
     * @Author 김가람
     */
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<CropReport> cropReportList = new ArrayList<>();

    /**
     * 해당 사용자의 하루 농사 알리미 목록
     * @Author 김가람
     */
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<DailyTip> dailyTipList = new ArrayList<>();

    /**
     * User 엔티티의 빌더
     * TODO: profileImage, profileMessage 를 default 값으로 변경 필요
     */
    @Builder
    public User(String username, String password, String nickname, LocalDate birth, Gender gender,
                Location location, String phone, String email, String profileImage, String profileMessage, Role role) {
        this.username = username;
        this.password = password;
        this.nickname = nickname;
        this.birth = birth;
        this.gender = gender;
        this.location = location;
        this.phone = phone;
        this.email = email;
        this.role = role == null ? Role.USER : role;
        this.profileImage = profileImage == null ? "assets/image/default.png" : profileImage;
        this.profileMessage = profileMessage == null ? "Hi" : profileMessage;
        this.isAccountExpired = false;
    }

    /**
     * 사용자를 탈퇴 상태로 업데이트하는 메서드
     */
    public void deactivate() {
        this.isAccountExpired = true;
        this.deletedAt = LocalDateTime.now();
    }

    /**
     * 사용자의 위치를 업데이트하는 메서드
     */
    public void updateLocation(Location location) {
        this.location = location;
    }

    /**
     * 내가 팔로우 하는 유저 수
     * @return 팔로우 하는 유저 수
     */
    public int getFolloweeCount() {
        return followeeList.size();
    }

    /**
     * 나를 팔로우 하는 유저 수
     * @return 팔로우하는 유저 수
     */
    public int getFollowerCount() {
        return followerList.size();
    }

    /**
     * OAuth 로그인 시, 사용자의 nickname, email, profile image 를 업데이트 하는 메서드
     */
    public void updateProfile(String nickname, String email, String profileImage) {
        this.nickname = nickname;
        this.email = email;
        this.profileImage = profileImage;
    }
}
