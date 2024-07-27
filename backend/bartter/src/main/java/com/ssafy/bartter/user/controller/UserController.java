package com.ssafy.bartter.user.controller;

import com.ssafy.bartter.user.dto.UserJoinDto;
import com.ssafy.bartter.user.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * User 와 관련된 요청을 주고받는 클래스
 *
 * @author 김훈민
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;


    @PostMapping("/join")
    public ResponseEntity<String> joinProcess(@RequestBody UserJoinDto userJoinDto) {
        try {
            userService.joinProcess(userJoinDto);
            return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

}
