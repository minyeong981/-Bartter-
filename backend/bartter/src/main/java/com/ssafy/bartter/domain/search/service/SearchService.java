package com.ssafy.bartter.domain.search.service;

import com.ssafy.bartter.domain.community.entity.CommunityPost;
import com.ssafy.bartter.domain.community.service.CommunityPostService;
import com.ssafy.bartter.domain.crop.repository.CropRepository;
import com.ssafy.bartter.domain.search.repository.RedisSearchLogRepository;
import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.domain.trade.repository.TradePostRepository;
import com.ssafy.bartter.domain.trade.services.TradePostService;
import com.ssafy.bartter.domain.user.repository.UserRepository;
import com.ssafy.bartter.domain.user.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchService {

    private final RedisSearchLogRepository redisSearchLogRepository;
    private final CommunityPostService communityPostService;
    private final TradePostService tradePostService;
    private final UserService userService;

    public void searchByTotalKeyword(String keyword){
        List<TradePost> tradePostList = tradePostService.getTradePostByKeyword(0, 2, keyword);
        List<CommunityPost> postList = communityPostService.getPostList(0, 2, keyword, false, 0);
    }

    public void saveRecentSearchKeyword(String keyword, String username){
        redisSearchLogRepository.saveRecentSearchKeyword(keyword, username);
    }

    public List<String> getRecentSearchKeyword(String username){
        return redisSearchLogRepository.getRecentSearchKeyword(username);
    }

    public void deleteRecentSearchKeyword(String keyword, String username) {
        redisSearchLogRepository.deleteRecentSearchKeyword(keyword, username);
    }

}
