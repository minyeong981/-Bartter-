package com.ssafy.bartter.global.common;

import lombok.Data;

/**
 * 위치 ID와 이름만 담겨있는 DTO
 *
 * @author 김용수
 */
@Data
public class SimpleLocation {
    private Integer locationId;
    private String name;

    public static SimpleLocation of(Location location) {
        SimpleLocation simpleLocation = new SimpleLocation();
        simpleLocation.locationId = location.getId();
        simpleLocation.name = location.getName();
        return simpleLocation;
    }
}
