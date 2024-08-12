package com.ssafy.bartter.domain.auth.repository;

import com.ssafy.bartter.global.cache.CacheKey;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class RedisRefreshRepository {
    private final RedisTemplate<String, Object> redisTemplate;

    public void save(String username, String token, Long expiredTime) {
        redisTemplate.opsForValue().set(CacheKey.authenticationKey(username), token, expiredTime, TimeUnit.MILLISECONDS);
    }

    public String find(String username) {
        return (String) redisTemplate.opsForValue().get(CacheKey.authenticationKey(username));
    }

    public void delete(String username){
        redisTemplate.delete(CacheKey.authenticationKey(username));
    }
}
