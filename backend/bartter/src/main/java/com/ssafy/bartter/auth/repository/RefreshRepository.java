package com.ssafy.bartter.auth.repository;

import com.ssafy.bartter.auth.entity.Refresh;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * jwt refresh token 을 저장하기 위한 class
 * TODO: 추후 Redis 에 맞게 수정 예정
 *
 * @author 김훈민
 */
public interface RefreshRepository extends JpaRepository<Refresh, Long> {

    Boolean existsByRefresh(String refresh);

    @Transactional
    void deleteByRefresh(String refresh);
}
