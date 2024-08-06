package com.ssafy.bartter.global.repository;


import com.ssafy.bartter.global.common.Location;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * 위치 Entity를 다루는 LocationRepository
 *
 * @author 김용수
 */
public interface LocationRepository extends JpaRepository<Location, Integer> {

    @Query("SELECT l FROM Location l WHERE ST_CONTAINS(l.multiPolygon, :point) = true")
    Optional<Location> findLocationByPointContains(@Param("point") Point point);

    @Query(value = "SELECT * FROM location l WHERE ST_DISTANCE_SPHERE(l.location_point, :point) <= :radius", nativeQuery = true)
    List<Location> findLocationListWithinRadius(@Param("point") Point point, @Param("radius") double radius);

}
