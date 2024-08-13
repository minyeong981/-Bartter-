package com.ssafy.bartter.global.common;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
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

    @Data
    public static class LocationRequestDto{
        @DecimalMin(value = "-90.0", message = "위도는 -90.0 이상이어야 합니다.")
        @DecimalMax(value = "90.0", message = "위도는 90.0 이하여야 합니다.")
        private double latitude;

        @DecimalMin(value = "-180.0", message = "경도는 -180.0 이상이어야 합니다.")
        @DecimalMax(value = "180.0", message = "경도는 180.0 이하여야 합니다.")
        private double longitude;
    }
}
