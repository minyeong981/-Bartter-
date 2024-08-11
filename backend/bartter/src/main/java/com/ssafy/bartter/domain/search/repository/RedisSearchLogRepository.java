package com.ssafy.bartter.domain.search.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.bartter.global.cache.CacheKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Range;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
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

    // 키워드 추가 메서드
    public void addKeyword(String keyword) {
        ZSetOperations<String, String> keywordSet = redisTemplate.opsForZSet();
        String key = CacheKey.keywordKey();

        // 접두사를 저장
        for(int i = 1; i < keyword.length(); i++) {
            String prefix = keyword.substring(0, i);
            log.debug("{} 추가", prefix);
            keywordSet.add(key, prefix, 0.0); // 점수를 0.0으로 고정함
        }
        // 전체 키워드 저장 *을 붙혀 완성된 단어를 나타냄
        keywordSet.add(key, keyword + "*", 0.0);
    }

    // prefix를 통해 단어를 찾는 메서드
    public List<String> autocomplete(String prefix, int count) {
        ZSetOperations<String, String> keywordSet = redisTemplate.opsForZSet();
        String key = CacheKey.keywordKey();

        // Redis ZSET에서 주어진 prefix로 시작하는 항목들을 검색.
        // ZRANGEBYLEX를 이용하여 사전순으로 정렬된 ZSET에서 prefix로 시작하는 값들을 가져온다.
        Range<String> range = Range.of(Range.Bound.inclusive(prefix), Range.Bound.inclusive(prefix + "\uffff"));
        Set<String> keywordList = keywordSet.rangeByLex(key, range);

        log.debug("{}", keywordList);
        if(keywordList == null) {
            return List.of();
        }

        return keywordList.stream()
                .filter(entry -> entry.endsWith("*")) // *로 끝나는 항목만 필터링
                .map(entry -> entry.substring(0, entry.length() - 1)) // *을 제거한 단어로 변경
                .sorted(Comparator.comparingInt(String::length))
                .limit(count) // 개수 제한
                .toList();
    }
}
