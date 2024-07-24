package com.ssafy.bartter.global.service;

import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.repository.LocationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 위치와 관련된 서비스를 제공하는 LocationService
 *
 * @author 김용수
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class LocationService {

    /**
     * 위치 Repository
     */
    private final LocationRepository locationRepository;

    /**
     * 반경 5KM
     */
    private final double RADIUS = 5000;

    /**
     * 위도 경도를 통해서 현재 동네를 가져오는 메서드
     *
     * @param latitude  위도
     * @param longitude 경도
     * @return 현재 동네 정보
     */
    public Location getCurrentLocation(double latitude, double longitude) {
        return locationRepository.findLocationByPointContains(createPoint(latitude, longitude));
    }

    /**
     * 위치 ID를 통해 현재 동네 반경 5KM에 있는 Location을 가져오는 메서드
     * @param locationId 위치 Id
     * @return 반경 5KM에 있는 Location List
     */
    public List<Location> getNearbyLocationList(int locationId) {
        Location location = locationRepository.findById(locationId).orElseThrow(() -> new IllegalArgumentException("유효하지 않은 위치 ID"));
        return locationRepository.findLocationListWithinRadius(location.getPoint(), RADIUS);
    }

    /**
     * JTS(Java Topology Suite) 사용하여 위도와 경도를 기반으로 Point 객체 생성
     *
     * @param latitude  위도
     * @param longitude 경도
     * @return
     */
    private Point createPoint(double latitude, double longitude) {
        // 좌표를 4326 좌표계로 변환하여 생성 JTS에서는 좌표 순서 (경도, 위도) 이다.
        return new GeometryFactory(new PrecisionModel(), 4326). // 기본 정밀도 모델, 좌표계 4326
                createPoint(new Coordinate(longitude, latitude)); // 경도와 위도로 Coordinate 객체 생성
    }
}
