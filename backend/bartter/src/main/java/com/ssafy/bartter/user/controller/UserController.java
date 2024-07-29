package com.ssafy.bartter.user.controller;

import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.response.ErrorResponse;
import com.ssafy.bartter.global.response.SuccessResponse;
import com.ssafy.bartter.user.dto.UserJoinDto;
import com.ssafy.bartter.user.services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * User 와 관련된 요청을 처리하는 컨트롤러 클래스
 *
 * @author 김훈민
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    /**
     * 새로운 사용자를 등록하는 메서드
     *
     * @param userJoinDto 사용자 가입 정보를 담고 있는 객체
     * @return 사용자 생성 성공 여부를 나타내는 ResponseEntity 객체
     */
    @PostMapping("/join")
    public ResponseEntity<?> joinProcess(@Valid @RequestBody UserJoinDto userJoinDto) {
        try {
            userService.joinProcess(userJoinDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new SuccessResponse<>("사용자가 성공적으로 생성되었습니다."));
        } catch (CustomException e) {
            return ResponseEntity.status(e.getErrorCode().getStatus())
                    .body(ErrorResponse.of(e));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ErrorResponse.of(e));
        }
    }

}
