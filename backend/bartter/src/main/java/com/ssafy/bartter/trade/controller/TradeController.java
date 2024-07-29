package com.ssafy.bartter.trade.controller;

import com.ssafy.bartter.crop.dto.CropCategoryDto;
import com.ssafy.bartter.crop.dto.CropCategoryDto.CropCategoryDetail;
import com.ssafy.bartter.global.response.SuccessResponse;
import com.ssafy.bartter.trade.dto.TradePostDto;
import com.ssafy.bartter.trade.dto.TradePostDto.SimpleTradePostDetail;
import com.ssafy.bartter.trade.dto.TradePostDto.TradePostDetail;
import com.ssafy.bartter.trade.entity.TradePost;
import com.ssafy.bartter.trade.services.TradePostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@RestController
@RequiredArgsConstructor
@Tag(name = "농작물 물물교환 API", description = "농작물 물물교환 게시글 등록/목록/상세조회 관련 API")
@RequestMapping("/trades")
public class TradeController {

    private final TradePostService cropTradeService;
    private List<CropCategoryDetail> desiredCategoryList;

    @Operation(summary = "농작물 물물교환 목록 조회", description = "농작물 물물교환 게시글 목록을 조회한다. ")
    @GetMapping("/posts")
    public SuccessResponse<List<SimpleTradePostDetail>> getTradePostList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @RequestParam(value = "givenCategory", defaultValue = "0") int givenCategory,
            @RequestParam(value = "desiredCategories", required = false) List<Integer> desiredCategories
    ) {
        int locationId = 1; // TODO : 사용자 로그인 구현시 변경 예정

        log.debug("page : {}, limit : {}, givenCategory : {}, desiredCategories : {}", page, limit, givenCategory, desiredCategories);

        List<TradePost> tradePostList = cropTradeService.getTradePostList(page, limit, givenCategory, desiredCategories, locationId);

        List<SimpleTradePostDetail> simpleTradePostList = tradePostList.stream().map(o -> SimpleTradePostDetail.of(o)).collect(Collectors.toList());
        return SuccessResponse.of(simpleTradePostList);
    }

    @GetMapping("/posts/{tradePostId}")
    public SuccessResponse<TradePostDetail> getTradePost(@PathVariable("tradePostId") int tradePostId) {
        TradePost tradePost = cropTradeService.getTradePost(tradePostId);
        List<String> imageList = tradePost.getImageList().stream().map(o -> o.getImageUrl()).collect(Collectors.toList());
        List<CropCategoryDetail> desiredCategoryList = tradePost.getWishCropCategoryList().stream().map(o -> CropCategoryDetail.of(o.getCategory())).toList();
        TradePostDetail tradePostDetail = TradePostDetail.of(tradePost,imageList,desiredCategoryList);

        return SuccessResponse.of(tradePostDetail);
    }

    @PostMapping("/posts")
    public SuccessResponse<Void> createTradePost(
            @RequestBody @Valid TradePostDto.Create request){
        return SuccessResponse.empty();
    }

}
