package com.ssafy.bartter.domain.user.repository;

import com.ssafy.bartter.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * User Entity 를 다루는 UserRepository
 *
 * @author 김훈민
 */
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    Boolean existsByUsername(String username);

}
