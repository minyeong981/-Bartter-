package com.ssafy.bartter.domain.search.service;

import com.ssafy.bartter.domain.search.repository.RedisSearchLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchService {

    private final RedisSearchLogRepository redisSearchLogRepository;

    public void searchByKeyword(String keyword){

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
