package com.ssafy.bartter.domain.user.repository;

import com.ssafy.bartter.global.cache.CacheKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
@RequiredArgsConstructor
public class RedisFcmRepository {
    private final RedisTemplate<String, Object> redisTemplate;

    public void save(int userId, String token){
        String key = CacheKey.fcmTokenKey(userId);
        redisTemplate.opsForHash().put(key, String.valueOf(userId), token);
    }

    public String getToken(int userId){
        String key = CacheKey.fcmTokenKey(userId);
        return (String) redisTemplate.opsForHash().get(key, String.valueOf(userId));
    }

    public void remove(int userId){
        String key = CacheKey.fcmTokenKey(userId);
        redisTemplate.opsForHash().delete(key, String.valueOf(userId));
    }
}
