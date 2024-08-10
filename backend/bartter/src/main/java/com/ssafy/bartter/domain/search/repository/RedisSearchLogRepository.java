package com.ssafy.bartter.domain.search.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.bartter.global.cache.CacheKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static com.ssafy.bartter.domain.search.dto.SearchDto.SEARCH_KEYWORD_SIZE;

@Slf4j
@Repository
@RequiredArgsConstructor
public class RedisSearchLogRepository {

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    public void saveRecentSearchKeyword(String keyword, String username) {
        String key = CacheKey.searchLogKey(username);
        double score = (double) Instant.now().toEpochMilli();

        redisTemplate.opsForZSet().add(key, keyword, score);

        long size = redisTemplate.opsForZSet().zCard(key);
        if (size > SEARCH_KEYWORD_SIZE) {
            redisTemplate.opsForZSet().removeRange(key, 0, size - SEARCH_KEYWORD_SIZE - 1);
        }
    }

    public List<String> getRecentSearchKeyword(String username) {
        String key = CacheKey.searchLogKey(username);
        Set<String> sortedKeyword = redisTemplate.opsForZSet().reverseRange(key, 0, SEARCH_KEYWORD_SIZE - 1);
        if(sortedKeyword != null){
            return new ArrayList<>(sortedKeyword);
        }
        return new ArrayList<>();
    }

    public void deleteRecentSearchKeyword(String keyword, String username) {
        String key = CacheKey.searchLogKey(username);
        redisTemplate.opsForZSet().remove(key, keyword);
    }
}
