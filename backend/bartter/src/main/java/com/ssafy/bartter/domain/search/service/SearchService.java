package com.ssafy.bartter.domain.search.service;

import com.ssafy.bartter.domain.community.dto.CommunityPostDto;
import com.ssafy.bartter.domain.community.dto.CommunityPostDto.SimpleCommunityPostDetail;
import com.ssafy.bartter.domain.community.entity.CommunityPost;
import com.ssafy.bartter.domain.community.service.CommunityPostService;
import com.ssafy.bartter.domain.crop.repository.CropRepository;
import com.ssafy.bartter.domain.search.dto.SearchDto;
import com.ssafy.bartter.domain.search.dto.SearchDto.SimpleKeywordList;
import com.ssafy.bartter.domain.search.repository.RedisSearchLogRepository;
import com.ssafy.bartter.domain.trade.dto.TradePostDto;
import com.ssafy.bartter.domain.trade.dto.TradePostDto.SimpleTradePostDetail;
import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.domain.trade.repository.TradePostRepository;
import com.ssafy.bartter.domain.trade.services.TradePostService;
import com.ssafy.bartter.domain.user.dto.UserDto;
import com.ssafy.bartter.domain.user.dto.UserDto.SearchUserProfile;
import com.ssafy.bartter.domain.user.dto.UserDto.SimpleUserProfile;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.domain.user.repository.UserRepository;
import com.ssafy.bartter.domain.user.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchService {

    private final RedisSearchLogRepository redisSearchLogRepository;
    private final CommunityPostService communityPostService;
    private final TradePostService tradePostService;
    private final UserService userService;

    public SimpleKeywordList searchByTotalKeyword(String keyword, int userId) {
        List<User> userList = searchUserByKeyword(0, 5, keyword);
        List<SearchUserProfile> simpleUserList = userList.stream()
                .map(o -> SearchUserProfile.of(o, userId)).toList();

        List<CommunityPost> communityPostList = searchCommunityByKeyword(0, 2, keyword, userId);
        List<SimpleCommunityPostDetail> simpleCommunityPostList = communityPostList.stream()
                .map(o -> SimpleCommunityPostDetail.of(o, userId)).toList();

        List<TradePost> tradePostList = searchTradePostByKeyword(0, 2, keyword);
        List<SimpleTradePostDetail> simpleTradePostList =
                tradePostList.stream().map(o -> SimpleTradePostDetail.of(o, userId)).toList();

        return SimpleKeywordList.of(simpleUserList, simpleCommunityPostList, simpleTradePostList);
    }

    public List<TradePost> searchTradePostByKeyword(int offset, int limit, String keyword) {
        return tradePostService.getTradePostByKeyword(offset, limit, keyword);
    }

    public List<CommunityPost> searchCommunityByKeyword(int offset, int limit, String keyword, int userId) {
        return communityPostService.getPostList(offset, limit, keyword, false, userId);
    }

    public List<User> searchUserByKeyword(int offset, int limit, String keyword) {
        return userService.getUsers(offset, limit, keyword);
    }

    public void saveRecentSearchKeyword(String keyword, String username) {
        redisSearchLogRepository.saveRecentSearchKeyword(keyword, username);
    }

    public List<String> getRecentSearchKeyword(String username) {
        return redisSearchLogRepository.getRecentSearchKeyword(username);
    }

    public void deleteRecentSearchKeyword(String keyword, String username) {
        redisSearchLogRepository.deleteRecentSearchKeyword(keyword, username);
    }

}
