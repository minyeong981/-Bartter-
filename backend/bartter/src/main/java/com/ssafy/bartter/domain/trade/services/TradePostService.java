package com.ssafy.bartter.domain.trade.services;

import com.ssafy.bartter.domain.auth.dto.UserAuthDto;
import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.domain.crop.entity.CropCategory;
import com.ssafy.bartter.domain.crop.repository.CropCategoryRepository;
import com.ssafy.bartter.domain.crop.repository.CropRepository;
import com.ssafy.bartter.domain.trade.dto.TradePostDto.Create;
import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.domain.trade.entity.TradePostImage;
import com.ssafy.bartter.domain.trade.entity.TradeWishCropCategory;
import com.ssafy.bartter.domain.trade.repository.TradePostImageRepository;
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
    private final TradePostRepository cropTradeRepository;
    private final CropCategoryRepository cropCategoryRepository;
    private final TradePostImageRepository tradePostImageRepository;
    private final TradePostRepository tradePostRepository;

    private final LocationService locationService;
    private final S3UploadService uploadService;
    private final S3UploadService s3UploadService;

    public List<TradePost> getTradePostList(int offset, int limit, int givenCategory, List<Integer> desiredCategories, int locationId) {
        List<Location> nearbyLocationList = locationService.getNearbyLocationList(locationId);
        log.debug("{}", nearbyLocationList.size());
        PageRequest pageable = PageRequest.of(offset, limit, Sort.by("createdAt").descending());
        int desiredCategoriesSize = (desiredCategories == null) ? 0 : desiredCategories.size();

        List<Integer> tradePostIds = cropTradeRepository.findTradePostIdList(nearbyLocationList, givenCategory, desiredCategories, desiredCategoriesSize, pageable).getContent();
        log.debug("{}", tradePostIds);
        return cropTradeRepository.findTradePostListByIdList(tradePostIds);
    }

    public TradePost getTradePost(int tradePostId) {
        return cropTradeRepository.findTradePostById(tradePostId).
                orElseThrow(() -> new CustomException(TRADE_POST_NOT_FOUND));
    }

    public List<TradePost> getTradePostByKeyword(int offset, int limit, String keyword) {
        PageRequest pageable = PageRequest.of(offset, limit, Sort.by("createdAt").descending());
        List<Integer> tradePostIds = tradePostRepository.findTradePostListByKeyword(keyword, pageable).getContent();
        return cropTradeRepository.findTradePostListByIdList(tradePostIds);
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

        if(request.getWishCropCategoryList() != null){
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
     * @param tradePostId 게시글 ID
     * @param user 글 작성자 ID
     */
    @Transactional
    public void delete(int tradePostId, UserAuthDto user) {
        if(!tradePostRepository.findTradePostByTradePostIdAndUserId(user.getId(), tradePostId)){
            throw new CustomException(ErrorCode.TRADE_POST_DELETE_INVALID_REQUEST);
        }

        List<TradePostImage> imageList = tradePostImageRepository.findByTradePostId(tradePostId);
        for(TradePostImage image : imageList){
            try{
                s3UploadService.delete(image.getImageUrl());
            }catch (Exception e){
                log.debug("오류 발생 : {}", image.getId());
            }
        }

        tradePostRepository.deleteById(tradePostId);
    }
}
