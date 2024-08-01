package com.ssafy.bartter.domain.trade.services;

import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.service.LocationService;
import com.ssafy.bartter.domain.trade.repository.TradePostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.ssafy.bartter.global.exception.ErrorCode.TRADE_POST_NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class TradePostService {

    private final LocationService locationService;
    private final TradePostRepository cropTradeRepository;
    private final TradePostRepository tradePostRepository;

    @Transactional(readOnly = true)
    public List<TradePost> getTradePostList(int offset, int limit, int givenCategory, List<Integer> desiredCategories, int locationId) {
        List<Location> nearbyLocationList = locationService.getNearbyLocationList(locationId);
        log.debug("{}", nearbyLocationList.size());
        PageRequest pageable = PageRequest.of(offset, limit, Sort.by("createdAt").descending());
        int desiredCategoriesSize = (desiredCategories == null) ? 0 : desiredCategories.size();

        List<Integer> tradePostIds = cropTradeRepository.findTradePostIdList(nearbyLocationList, givenCategory, desiredCategories, desiredCategoriesSize, pageable).getContent();
        log.debug("{}", tradePostIds);
        return cropTradeRepository.findTradePostListByIdList(tradePostIds);
    }

    public TradePost getTradePost(int tradePostId) {
        return cropTradeRepository.findTradePostById(tradePostId).
                orElseThrow(() -> new CustomException(TRADE_POST_NOT_FOUND));
    }

    public List<TradePost> getTradePostByKeyword(int offset, int limit, String keyword) {
        PageRequest pageable = PageRequest.of(offset, limit, Sort.by("createdAt").descending());
        List<Integer> tradePostIds = tradePostRepository.findTradePostListByKeyword(keyword,pageable).getContent();
        return cropTradeRepository.findTradePostListByIdList(tradePostIds);
    }

    public Location getLocation(double latitude, double longitude) {
        return locationService.getCurrentLocation(latitude, longitude);
    }
}
