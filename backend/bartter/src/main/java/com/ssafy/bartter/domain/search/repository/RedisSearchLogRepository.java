package com.ssafy.bartter.domain.search.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.bartter.domain.search.dto.SearchDto;
import com.ssafy.bartter.global.cache.CacheKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.bartter.domain.search.dto.SearchDto.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisSearchLogRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    public void saveRecentSearchTerm(String searchTerm, String username) {
        String now = LocalDateTime.now().toString();
        String key = CacheKey.searchLogKey(username);
        SearchLog searchLog = SearchLog.of(searchTerm, now);

        Long size = redisTemplate.opsForList().size(key);
        if(size == (long) SEARCH_KEYWORD_SIZE){
            redisTemplate.opsForList().rightPop(key);
        }
        redisTemplate.opsForList().leftPush(key, searchLog);
    }

    public List<SearchLog> getRecentSearchTerm(String username) {
        String key = CacheKey.searchLogKey(username);
        List<Object> objects = redisTemplate.opsForList().range(key, 0, -1);
//
//        if (objects == null) {
//            return Collections.emptyList();
//        }

        // Object 리스트를 SearchLog 리스트로 변환
        return objects.stream()
                .map(o -> objectMapper.convertValue(o, SearchLog.class))
                .collect(Collectors.toList());
    }
}
