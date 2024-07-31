package com.ssafy.bartter.domain.search.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.search.repository.RedisSearchLogRepository;
import com.ssafy.bartter.global.response.SuccessResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
public class SearchController {

    private final RedisSearchLogRepository redisSearchLogRepository;

    @PostMapping("")
    public SuccessResponse<List<String>> getSearchList(
            @RequestParam(value = "keyword", required = false) String keyword,
            @CurrentUser UserAuthDto user) {
        redisSearchLogRepository.saveRecentSearchTerm(keyword, user.getUsername());
        return SuccessResponse.of(null);
    }

    @GetMapping("")
    public SuccessResponse<List<String>> getRecentSearchTerm(
            @CurrentUser UserAuthDto user
    ){
        List<String> list = redisSearchLogRepository.getRecentSearchTerm(user.getUsername()).stream().map(o -> o.getKeyword()).collect(Collectors.toList());
        return SuccessResponse.of(list);
    }
}
