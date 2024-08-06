package com.ssafy.bartter.domain.search.dto;

import com.ssafy.bartter.domain.community.dto.CommunityPostDto;
import com.ssafy.bartter.domain.community.dto.CommunityPostDto.SimpleCommunityPostDetail;
import com.ssafy.bartter.domain.trade.dto.TradePostDto;
import com.ssafy.bartter.domain.trade.dto.TradePostDto.SimpleTradePostDetail;
import com.ssafy.bartter.domain.user.dto.UserDto;
import com.ssafy.bartter.domain.user.dto.UserDto.SimpleUserProfile;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;


public class SearchDto {

    public static int SEARCH_KEYWORD_SIZE = 10;

    @Data
    public static class Delete {
        @NotBlank(message = "삭제 할 키워드를 선택해주세요")
        private String keyword;
    }

    @Data
    public static class SimpleKeywordList{
        private List<SimpleUserProfile> userProfileList;
        private List<SimpleCommunityPostDetail> communityPostList;
        private List<SimpleTradePostDetail> tradePostList;

        public static SimpleKeywordList of(List<SimpleUserProfile> userProfileList,
                                        List<SimpleCommunityPostDetail> communityPostList,
                                        List<SimpleTradePostDetail> tradePostList){
            SimpleKeywordList simpleKeywordList = new SimpleKeywordList();
            simpleKeywordList.userProfileList = userProfileList;
            simpleKeywordList.communityPostList = communityPostList;
            simpleKeywordList.tradePostList = tradePostList;
            return simpleKeywordList;
        }
    }
}
