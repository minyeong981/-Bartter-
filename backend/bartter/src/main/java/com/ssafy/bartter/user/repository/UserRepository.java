package com.ssafy.bartter.user.repository;

import com.ssafy.bartter.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
