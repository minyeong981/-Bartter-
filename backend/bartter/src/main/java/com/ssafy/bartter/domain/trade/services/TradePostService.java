package com.ssafy.bartter.domain.trade.services;

import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.domain.crop.entity.CropCategory;
import com.ssafy.bartter.domain.crop.repository.CropCategoryRepository;
import com.ssafy.bartter.domain.crop.repository.CropRepository;
import com.ssafy.bartter.domain.trade.dto.TradePostDto.Create;
import com.ssafy.bartter.domain.trade.entity.*;
import com.ssafy.bartter.domain.trade.repository.TradePostImageRepository;
import com.ssafy.bartter.domain.trade.repository.TradePostLikeRepository;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.domain.user.repository.UserRepository;
import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.service.LocationService;
import com.ssafy.bartter.domain.trade.repository.TradePostRepository;
import com.ssafy.bartter.global.service.S3UploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import static com.ssafy.bartter.global.exception.ErrorCode.TRADE_POST_NOT_FOUND;

@Slf4j
@Service
@RequiredArgsConstructor
public class TradePostService {

    private final UserRepository userRepository;
    private final CropRepository cropRepository;
    private final CropCategoryRepository cropCategoryRepository;
    private final TradePostImageRepository tradePostImageRepository;
    private final TradePostRepository tradePostRepository;
    private final TradePostLikeRepository tradePostLikeRepository;

    private final LocationService locationService;
    private final S3UploadService uploadService;
    private final S3UploadService s3UploadService;

    public List<TradePost> getTradePostList(int page, int limit, int givenCategory, List<Integer> desiredCategories, int locationId) {
        List<Location> nearbyLocationList = locationService.getNearbyLocationList(locationId);
        log.debug("근처 동네 개수 : {}", nearbyLocationList.size());
        for(Location l : nearbyLocationList) {log.debug("위치 {}", l.getName());}
        PageRequest pageable = PageRequest.of(page, limit, Sort.by("createdAt").descending());
        int desiredCategoriesSize = (desiredCategories == null) ? 0 : desiredCategories.size();

        log.debug("offset:{}, limit:{}, givenCategory:{}, desiredCategories:{},desiredSize:{}", page, limit, givenCategory, desiredCategories, desiredCategoriesSize);
        List<Integer> idList = tradePostRepository.findTradePostIdList(nearbyLocationList, givenCategory, desiredCategories, desiredCategoriesSize, pageable).getContent();
        log.debug("{}", idList);
        return tradePostRepository.findTradePostListByIdList(idList);
    }

    public List<TradePost> getTradePostListById(int page, int limit, int userId) {
        PageRequest pageable = PageRequest.of(page, limit, Sort.by("createdAt").descending());
        List<Integer> idList = tradePostRepository.findTradePostIdListByUserId(userId, pageable);
        return tradePostRepository.findTradePostListByIdList(idList);
    }

    public List<TradePost> getTradePostLikeList(int page, int limit, int userId) {
        PageRequest pageable = PageRequest.of(page, limit, Sort.by("createdAt").descending());
        List<Integer> idList = tradePostLikeRepository.findTradePostLikeIdList(userId, pageable);
        return tradePostRepository.findTradePostListByIdList(idList);
    }

    public TradePost getTradePost(int tradePostId) {
        return tradePostRepository.findTradePostById(tradePostId).
                orElseThrow(() -> new CustomException(TRADE_POST_NOT_FOUND));
    }

    public List<TradePost> getTradePostByKeyword(int offset, int limit, String keyword) {
        PageRequest pageable = PageRequest.of(offset, limit, Sort.by("createdAt").descending());
        List<Integer> tradePostIds = tradePostRepository.findTradePostListByKeyword(keyword, pageable).getContent();
        return tradePostRepository.findTradePostListByIdList(tradePostIds);
    }

    public Location getLocation(double latitude, double longitude) {
        return locationService.getCurrentLocation(latitude, longitude);
    }

    @Transactional
    public void create(Create request, List<MultipartFile> imageList, UserAuthDto user) {
        User currentUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Location location = locationService.getById(request.getLocationId());

        Crop crop = null;
        if (request.getCropId() > 0) {
            crop = cropRepository.findById(request.getCropId())
                    .orElseThrow(() -> new CustomException(ErrorCode.CROP_NOT_FOUND));
        }

        CropCategory cropCategory = cropCategoryRepository.findById(request.getCropCategoryId())
                .orElseThrow(() -> new CustomException(ErrorCode.CROP_CATEGORY_NOT_FOUND));

        TradePost tradePost = TradePost.builder()
                .user(currentUser)
                .crop(crop)
                .location(location)
                .category(cropCategory)
                .title(request.getTitle())
                .content(request.getContent())
                .isShare(request.isShareStatus())
                .build();

        if (request.getWishCropCategoryList() != null) {
            // 해당 ID를 가진 카테고리 조회
            List<CropCategory> categoryList = cropCategoryRepository.findAllById(request.getWishCropCategoryList());

            // TradeWishCropCategory 생성
            List<TradeWishCropCategory> wishCropCategoryList = categoryList.stream().
                    map(wishCategory -> TradeWishCropCategory.of(tradePost, wishCategory))
                    .toList();

            tradePost.getWishCropCategoryList().addAll(wishCropCategoryList);
        }

        int[] order = {1};
        List<TradePostImage> tradePostImageList = uploadService.uploadImageList(imageList)
                .stream().map(o -> TradePostImage.of(tradePost, o, order[0]++)).toList();
        tradePost.getImageList().addAll(tradePostImageList);
        tradePostRepository.save(tradePost);
    }

    /**
     * 게시글 삭제
     *
     * @param tradePostId 게시글 ID
     * @param user        글 작성자 ID
     */
    @Transactional
    public void delete(int tradePostId, UserAuthDto user) {
        if (!tradePostRepository.existByUserIdAndTradePost(user.getId(), tradePostId)) {
            throw new CustomException(ErrorCode.TRADE_POST_INVALID_REQUEST);
        }

        List<TradePostImage> imageList = tradePostImageRepository.findByTradePostId(tradePostId);
        for (TradePostImage image : imageList) {
            try {
                s3UploadService.delete(image.getImageUrl());
            } catch (Exception e) {
                log.debug("오류 발생 : {}", image.getId());
            }
        }

        tradePostRepository.deleteById(tradePostId);
    }

    @Transactional
    public void like(int tradePostId, int userId) {
        if (tradePostRepository.likeExistByUserId(tradePostId, userId)) {
            throw new CustomException(ErrorCode.TRADE_POST_LIKE_EXIST);
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        TradePost tradePost = tradePostRepository.findById(tradePostId)
                .orElseThrow(() -> new CustomException(TRADE_POST_NOT_FOUND));

        TradePostLike tradePostLike = TradePostLike.of(user, tradePost);
        user.getTradePostLikeList().add(tradePostLike);
        tradePost.getLikeList().add(tradePostLike);
        tradePostLikeRepository.save(tradePostLike);
    }

    @Transactional
    public void unLike(int tradePostId, int userId) {
        TradePostLike tradePostLike = tradePostLikeRepository.findByTradePostIdAndUserId(tradePostId, userId).orElseThrow(() -> new CustomException(ErrorCode.TRADE_POST_LIKE_NOT_FOUND));
        tradePostLikeRepository.delete(tradePostLike);
    }

    @Transactional
    public void changeStatus(int tradePostId, int userId, TradeStatus newStatus) {
        if (!tradePostRepository.existByUserIdAndTradePost(userId, tradePostId)) {
            throw new CustomException(ErrorCode.TRADE_POST_INVALID_REQUEST);
        }

        TradePost tradePost = tradePostRepository.findTradePostById(tradePostId).get();
        if (tradePost.getStatus() == newStatus) {
            throw new CustomException(ErrorCode.TRADE_POST_SAME_STATUS);
        }
        tradePost.changeStatus(newStatus);
        tradePostRepository.save(tradePost);
    }


}
