package com.ssafy.bartter.domain.trade.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.crop.dto.CropCategoryDto.CropCategoryDetail;
import com.ssafy.bartter.domain.trade.dto.TradePostDto;
import com.ssafy.bartter.domain.trade.dto.TradePostDto.SimpleTradePostDetail;
import com.ssafy.bartter.domain.trade.dto.TradePostDto.TradePostDetail;
import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.domain.trade.services.TradePostService;
import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.common.SimpleLocation;
import com.ssafy.bartter.global.common.SimpleLocation.LocationRequestDto;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.response.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/trades")
@Tag(name = "농작물 물물교환 API", description = "농작물 물물교환 게시글 등록/목록/상세조회 관련 API")
public class TradeController {

    private final TradePostService cropTradeService;
    private List<CropCategoryDetail> desiredCategoryList;

    @Operation(summary = "농작물 물물교환 목록 조회", description = "농작물 물물교환 게시글 목록을 조회한다. ")
    @GetMapping("/posts")
    public SuccessResponse<List<SimpleTradePostDetail>> getTradePostList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @RequestParam(value = "givenCategory", defaultValue = "0") int givenCategory,
            @RequestParam(value = "desiredCategories", required = false) List<Integer> desiredCategories,
            @CurrentUser UserAuthDto user
    ) {
        List<TradePost> tradePostList = cropTradeService.getTradePostList(page, limit, givenCategory, desiredCategories, user.getLocationId());

        List<SimpleTradePostDetail> simpleTradePostList = tradePostList.stream().map(o -> SimpleTradePostDetail.of(o)).collect(Collectors.toList());
        return SuccessResponse.of(simpleTradePostList);
    }

    @GetMapping("/posts/{tradePostId}")
    public SuccessResponse<TradePostDetail> getTradePost(@PathVariable("tradePostId") int tradePostId) {
        TradePost tradePost = cropTradeService.getTradePost(tradePostId);
        List<String> imageList = tradePost.getImageList().stream().map(o -> o.getImageUrl()).collect(Collectors.toList());
        List<CropCategoryDetail> desiredCategoryList = tradePost.getWishCropCategoryList().stream().map(o -> CropCategoryDetail.of(o.getCategory())).toList();
        TradePostDetail tradePostDetail = TradePostDetail.of(tradePost, imageList, desiredCategoryList);

        return SuccessResponse.of(tradePostDetail);
    }

    @PostMapping("/posts/locations")
    public SuccessResponse<SimpleLocation> getLocation(
            @RequestBody @Valid LocationRequestDto request,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, bindingResult);
        }
        log.debug("hasErrors: {} , request: {} ",bindingResult.hasErrors(), request);
        Location location = cropTradeService.getLocation(request.getLatitude(), request.getLongitude());
        return SuccessResponse.of(SimpleLocation.of(location));
    }

    //    @PostMapping("/posts")
//    public SuccessResponse<Void> createTradePost(
//            @RequestBody @Valid TradePostDto.Create request) {
//        return SuccessResponse.empty();
//    }

}

