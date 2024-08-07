package com.ssafy.bartter.domain.report.entity;

import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.global.common.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 하루 농사 알리미 Entity
 *
 * @author 김가람
 */
@Entity
@Getter
@Table(name = "daily_tip")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DailyTip extends BaseEntity {

    /**
     * 알리미 PK
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "daily_tip_id")
    private Integer id;

    /**
     * 알리미의 주인
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * 알림을 받을 요일 (1~7)
     * */
    @Column(name = "daily_tip_weekday", nullable = false)
    @Min(1)
    @Max(7)
    private Integer weekday;

    /**
     * 알림 메시지의 내용
     * */
    @Column(name = "daily_tip_content", nullable = false, length = 300)
    private String content;

    /**
     * 알림 활성화 여부
     * */
    @Column(name = "daily_tip_is_enabled", nullable = false)
    private boolean isEnabled = true;

    @Builder
    public DailyTip(Integer weekday, String content) {
        this.weekday = weekday;
        this.content = content;
    }

    public void addUser(User user) {
        this.user = user;
        getUser().getDailyTipList().add(this);
    }
}
