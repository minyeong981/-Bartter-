package com.ssafy.bartter.trade.services;

import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.service.LocationService;
import com.ssafy.bartter.trade.entity.TradePost;
import com.ssafy.bartter.trade.repository.TradePostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

import static com.ssafy.bartter.global.exception.ErrorCode.TRADE_POST_NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class TradePostService {

    private final LocationService locationService;
    private final TradePostRepository cropTradeRepository;

    @Transactional(readOnly = true)
    public List<TradePost> getTradePostList(int offset, int limit, int givenCategory, List<Integer> desiredCategories, int locationId) {
        List<Location> nearbyLocationList = locationService.getNearbyLocationList(locationId);
        log.debug("{}", nearbyLocationList.size());
        PageRequest pageable = PageRequest.of(offset, limit, Sort.by("createdAt").descending());
        int desiredCategoriesSize = (desiredCategories == null) ? 0 : desiredCategories.size();

        log.debug("이전 오류 발생 안남 = 1");
        List<Integer> tradePostIds = cropTradeRepository.findTradePostIdList(nearbyLocationList, givenCategory, desiredCategories, desiredCategoriesSize, pageable).getContent();
        log.debug("이전 오류 발생 안남 = 2");
        log.debug("{}", tradePostIds);
        return cropTradeRepository.findTradePostListByIdList(tradePostIds);
    }

    public TradePost getTradePost(int tradePostId) {
        return cropTradeRepository.findTradePostById(tradePostId).
                orElseThrow(() -> new CustomException(TRADE_POST_NOT_FOUND));
    }

    public Location getLocation(double latitude, double longitude) {
        return locationService.getCurrentLocation(latitude,longitude);
    }
}
