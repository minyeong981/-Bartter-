package com.ssafy.bartter.global.common;

import com.amazonaws.metrics.MetricType;
import com.ssafy.bartter.community.entity.CommunityPost;
import com.ssafy.bartter.trade.entity.TradePost;
import com.ssafy.bartter.user.entity.User;
import jakarta.persistence.*;
import lombok.*;
import org.locationtech.jts.geom.MultiPolygon;
import org.locationtech.jts.geom.Point;

import java.util.ArrayList;
import java.util.List;

/**
 * 중심 좌표와 지역 폴리곤을 가지고 있는 위치 Entity
 *
 * @author 김용수
 */
@Entity
@Getter
@Table(name = "location")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Location extends BaseEntity {

    /**
     * 위치 Entity Pk
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Integer id;

    /**
     * 행정구역 이름
     */
    @Column(name = "location_name", nullable = false, length = 50)
    private String name;

    /**
     * 행정 구역 코드
     */
    @Column(name = "location_code", nullable = false, length = 10)
    private String code;

    /**
     * 지역 폴리곤
     */
    @Column(name = "location_polygon", nullable = false, columnDefinition = "geometry")
    private MultiPolygon multiPolygon;

    /**
     * 지역 중심좌표
     */
    @Column(name = "location_point", nullable = false, columnDefinition = "geometry")
    private Point point;

    /**
     * 해당 동네를 설정한 프로필(사용자)
     */
    @OneToMany(mappedBy = "location", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<User> userList = new ArrayList<>();

    /**
     * 해당 동네에 올라온 동네모임 글
     */
    @OneToMany(mappedBy = "location", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<CommunityPost> communityPostList = new ArrayList<>();

    /**
     * 해당 동네에 올라온 물물교환 게시글
     */
    @OneToMany(mappedBy = "location", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<TradePost> tradePostList = new ArrayList<>();


    // 회원가입 테스트
    @Builder
    public Location(String name, String code, MultiPolygon multiPolygon, Point point) {
        this.name = name;
        this.code = code;
        this.multiPolygon = multiPolygon;
        this.point = point;
    }

}


