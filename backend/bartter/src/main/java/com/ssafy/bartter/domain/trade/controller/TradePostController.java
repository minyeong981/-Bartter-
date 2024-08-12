package com.ssafy.bartter.domain.trade.controller;

import com.ssafy.bartter.domain.auth.annotation.CurrentUser;
import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.crop.dto.CropCategoryDto.CropCategoryDetail;
import com.ssafy.bartter.domain.trade.dto.TradePostDto.Create;
import com.ssafy.bartter.domain.trade.dto.TradePostDto.SimpleTradePostDetail;
import com.ssafy.bartter.domain.trade.dto.TradePostDto.TradePostDetail;
import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.domain.trade.entity.TradePostImage;
import com.ssafy.bartter.domain.trade.entity.TradeStatus;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/trades/posts")
@Tag(name = "농작물 물물교환 API", description = "농작물 물물교환 게시글 등록/목록/상세조회 관련 API")
public class TradePostController {

    private final TradePostService tradePostService;

    @GetMapping("")
    @Operation(summary = "농작물 물물교환 목록 조회", description = "농작물 물물교환 게시글 목록을 조회한다. ")
    public SuccessResponse<List<SimpleTradePostDetail>> getTradePostList(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "10") int limit,
            @RequestParam(value = "givenCategory", defaultValue = "0") int givenCategory,
            @RequestParam(value = "desiredCategories", required = false) List<Integer> desiredCategories,
            @CurrentUser UserAuthDto user
    ) {
        List<TradePost> tradePostList = tradePostService.getTradePostList(page, limit, givenCategory, desiredCategories, user.getLocationId());
        List<SimpleTradePostDetail> simpleTradePostList = tradePostList.stream().map(o -> SimpleTradePostDetail.of(o,user.getId())).collect(Collectors.toList());
        return SuccessResponse.of(simpleTradePostList);
    }

    @GetMapping("/{tradePostId}")
    @Operation(summary = "농작물 물물교환 상세 조회", description = "농작물 물물교환 게시글을 상세조회한다.")
    public SuccessResponse<TradePostDetail> getTradePost(
            @PathVariable("tradePostId") int tradePostId,
            @CurrentUser UserAuthDto user
    ) {
        TradePost tradePost = tradePostService.getTradePost(tradePostId);
        List<String> imageList = tradePost.getImageList().stream().map(TradePostImage::getImageUrl).toList();
        List<CropCategoryDetail> desiredCategoryList = tradePost.getWishCropCategoryList().stream().map(o -> CropCategoryDetail.of(o.getCategory())).toList();

        TradePostDetail tradePostDetail = TradePostDetail.of(tradePost, imageList, desiredCategoryList, user.getId());
        return SuccessResponse.of(tradePostDetail);
    }

    @PostMapping("/locations")
    @Operation(summary = "농작물 물물교환 위치 가져오기", description = "사용자의 현재 위치를 기반으로 동네를 불러온다.")
    public SuccessResponse<SimpleLocation> getLocation(
            @RequestBody @Valid LocationRequestDto request,
            BindingResult bindingResult
    ) {
        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, bindingResult);
        }
        log.debug("hasErrors: {} , request: {} ", bindingResult.hasErrors(), request);
        Location location = tradePostService.getLocation(request.getLatitude(), request.getLongitude());
        return SuccessResponse.of(SimpleLocation.of(location));
    }

    @PostMapping("")
    @Operation(summary = "농작물 게시글 생성", description = "농작물 물물교환 게시글을 작성한다.")
    public SuccessResponse<Void> createTradePost(
            @Valid Create create,
            BindingResult bindingResult,
            @RequestPart("images") List<MultipartFile> imageList,
            @CurrentUser UserAuthDto user
    ) {
        if (bindingResult.hasErrors()) {
            throw new CustomException(ErrorCode.INVALID_INPUT_VALUE, bindingResult);
        }
        log.debug("{}", imageList);
        tradePostService.create(create, imageList, user);
        return SuccessResponse.empty();
    }

    @DeleteMapping("/{tradePostId}")
    @Operation(summary = "농작물 게시글 삭제", description = "농작물 물물교환 게시글을 삭제한다.")
    public SuccessResponse<Void> deleteTradePost(
            @PathVariable("tradePostId") int tradePostId,
            @CurrentUser UserAuthDto user
    ) {
        tradePostService.delete(tradePostId, user);
        return SuccessResponse.empty();
    }

    @PostMapping("/{tradePostId}/like")
    @Operation(summary = "농작물 물물교환 게시글 좋아요", description = "농작물 물물교환 게시글을 좋아요한다.")
    public SuccessResponse<Void> tradePostLike(
            @PathVariable("tradePostId") int tradePostId,
            @CurrentUser UserAuthDto user
    ) {
        tradePostService.like(tradePostId, user.getId());
        return SuccessResponse.empty();
    }

    @DeleteMapping("/{tradePostId}/like")
    @Operation(summary = "농작물 물물교환 게시글 좋아요", description = "농작물 물물교환 게시글을 좋아요한다.")
    public SuccessResponse<Void> tradePostUnLike(
            @PathVariable("tradePostId") int tradePostId,
            @CurrentUser UserAuthDto user
    ) {
        tradePostService.unLike(tradePostId, user.getId());
        return SuccessResponse.empty();
    }

    @PutMapping("/{tradePostId}/progress")
    public SuccessResponse<Void> setTradePostProgress(
            @PathVariable("tradePostId") int tradePostId,
            @CurrentUser UserAuthDto user
    ) {
        tradePostService.changeStatus(tradePostId, user.getId(), TradeStatus.PROGRESS);
        return SuccessResponse.empty();
    }

    @PutMapping("/{tradePostId}/reserve")
    public SuccessResponse<Void> setTradePostReserve(
            @PathVariable("tradePostId") int tradePostId,
            @CurrentUser UserAuthDto user
    ) {
        tradePostService.changeStatus(tradePostId, user.getId(), TradeStatus.RESERVED);
        return SuccessResponse.empty();
    }

    @PutMapping("/{tradePostId}/complete")
    public SuccessResponse<Void> setTradePostComplete(
            @PathVariable("tradePostId") int tradePostId,
            @CurrentUser UserAuthDto user
    ) {
        tradePostService.changeStatus(tradePostId, user.getId(), TradeStatus.COMPLETED);
        return SuccessResponse.empty();
    }
}

