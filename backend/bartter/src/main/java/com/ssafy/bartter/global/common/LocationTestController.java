package com.ssafy.bartter.global.common;

import com.ssafy.bartter.global.service.LocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class LocationTestController {

    private final LocationService locationService;

    @GetMapping("/test")
    public SimpleLocation getLocation() {
        Location location = locationService.getCurrentLocation(35.199483926800674, 126.80797470131532);
        return SimpleLocation.of(location);
    }

    @GetMapping("/test1")
    public List<SimpleLocation> getNearByLocation() {
        return locationService.getNearbyLocationList(992)
                .stream().map(o -> SimpleLocation.of(o))
                .collect(Collectors.toList());
    }
}

// 직접 보려면 코드 넣어서 돌려봐도 좋을듯!