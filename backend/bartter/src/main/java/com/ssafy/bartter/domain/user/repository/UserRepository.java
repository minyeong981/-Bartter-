package com.ssafy.bartter.domain.user.repository;

import com.ssafy.bartter.domain.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


/**
 * User Entity 를 다루는 UserRepository
 *
 * @author 김훈민
 */
public interface UserRepository extends JpaRepository<User, Integer> {

    @Query("SELECT u FROM User u " +
            "JOIN FETCH u.location " +
            "WHERE u.username = :username")
    User findByUsername(@Param("username") String username);

    @Query("SELECT u FROM User u " +
            "JOIN FETCH u.location " +
            "WHERE u.id = :userId")
    Optional<User> findByUserId(@Param("userId") int userId);

    boolean existsByUsername(String username);

    @Query("SELECT u FROM User u " +
            "WHERE u.nickname LIKE %:keyword% ")
    Page<User> findUserListByKeyword(
            @Param("keyword") String keyword,
            Pageable pageable
    );

    @Query("SELECT u.nickname FROM User u " +
            "WHERE u.id = :userId")
    String findNicknameByUserId(@Param("userId") int userId);

}
