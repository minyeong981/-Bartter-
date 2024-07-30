package com.ssafy.bartter.crop.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
@Tag(name = "유저의 농작물/농사일지 조회 API", description = "특정 유저의 농작물과 농사일지를 조회하는 API 입니다.")
public class UserCropController {
}
