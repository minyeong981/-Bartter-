package com.ssafy.bartter.domain.community.service;

import com.ssafy.bartter.domain.community.entity.CommunityPost;
import com.ssafy.bartter.domain.community.entity.CommunityPostImage;
import com.ssafy.bartter.domain.community.entity.CommunityPostLike;
import com.ssafy.bartter.domain.community.repository.CommunityPostImageRepository;
import com.ssafy.bartter.domain.community.repository.CommunityPostLikeRepository;
import com.ssafy.bartter.domain.community.repository.CommunityPostRepository;
import com.ssafy.bartter.domain.community.dto.CommunityPostDto;
import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.service.LocationService;
import com.ssafy.bartter.global.service.S3UploadService;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * 동네모임 게시글 Service
 *
 * @author 김가람
 */
@Service
@Transactional
@RequiredArgsConstructor
public class CommunityPostService {

    private final CommunityPostRepository communityPostRepository;
    private final CommunityPostImageRepository communityPostImageRepository;
    private final UserRepository userRepository;
    private final S3UploadService s3UploadService;
    private final LocationService locationService;
    private final CommunityPostLikeRepository communityPostLikeRepository;

    /**
     * 동네모임 게시글 전체조회
     */
    @Transactional(readOnly = true)
    public List<CommunityPost> getPostList(int page, int limit, String keyword, boolean isCommunity, int userId) {

        // 전체 게시글 조회에서는 빈 ArrayList로 남아있다
        List<Location> nearbyLocationList = new ArrayList<>();

        // 동네 게시글 조회에서는 유저 위치 반경에 있는 Location들의 ArrayList로 바꿔준다
        if (isCommunity) {
            User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            Integer locationId = user.getLocation().getId();
            nearbyLocationList = locationService.getNearbyLocationList(locationId);
        }

        PageRequest pageable = PageRequest.of(page, limit, Sort.by("createdAt").descending());
        List<CommunityPost> postList = communityPostRepository.findNearbyCommunityPostListByKeyword("%" + keyword + "%", isCommunity, nearbyLocationList, pageable);
        return postList;
    }

    /**
     * 특정 유저가 작성한 동네모임 게시글 전체조회
     */
    @Transactional(readOnly = true)
    public List<CommunityPost> getUserPostList(int page, int limit, int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        PageRequest pageable = PageRequest.of(page, limit, Sort.by("createdAt").descending());
        return communityPostRepository.findAllByUserId(userId, pageable);
    }

    /**
     * 동네모임 게시글 작성
     */
    public CommunityPost createPost(CommunityPostDto.Create request, MultipartFile[] imageList, int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Location userLocation = user.getLocation();

        CommunityPost post = CommunityPost.builder()
                .user(user)
                .location(userLocation)
                .title(request.getTitle())
                .content(request.getContent())
                .build();

        communityPostRepository.save(post);

        if (imageList != null) {
            for (int i = 0; i < imageList.length; i++) {
                String imageUrl = s3UploadService.upload(imageList[i]);
                CommunityPostImage postImage = CommunityPostImage.builder()
                        .imageUrl(imageUrl)
                        .order(i + 1)
                        .build();

                postImage.addCommunityPost(post);
                communityPostImageRepository.save(postImage);
            }
        }

        return post;
    }

    /**
     * 동네모임 게시글 상세조회
     */
    @Transactional(readOnly = true)
    public CommunityPost getPost(int communityPostId) {
        return communityPostRepository.findById(communityPostId).orElseThrow(() -> new CustomException(ErrorCode.COMMUNITY_POST_NOT_FOUND));
    }

    /**
     * 동네모임 게시글 삭제
     */
    public void deletePost(int communityPostId, int userId) {
        CommunityPost post = communityPostRepository.findById(communityPostId).orElseThrow(() -> new CustomException(ErrorCode.COMMUNITY_POST_NOT_FOUND));

        if (!post.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.UNAUTHENTICATED);
        }

        List<CommunityPostImage> imageList = post.getImageList();
        for (CommunityPostImage image : imageList) {
            s3UploadService.delete(image.getImageUrl());
        }

        communityPostRepository.delete(post);
    }

    /**
     * 동네모임 게시글 좋아요 생성
     */
    public void createCommunityLike(int communityPostId, int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        CommunityPost post = communityPostRepository.findById(communityPostId).orElseThrow(() -> new CustomException(ErrorCode.COMMUNITY_POST_NOT_FOUND));
        Optional<CommunityPostLike> findLike = communityPostLikeRepository.findByCommunityPostIdAndUserId(post.getId(), userId);

        if (findLike.isPresent()) {
            throw new CustomException(ErrorCode.COMMUNITY_POST_LIKE_ALREADY_EXISTS);
        }

        CommunityPostLike like = new CommunityPostLike();
        like.addUser(user);
        like.addCommunityPost(post);
        communityPostLikeRepository.save(like);
    }

    /**
     * 동네모임 게시글 좋아요 삭제
     */
    public void deleteCommunityLike(int communityPostId, int userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        CommunityPost post = communityPostRepository.findById(communityPostId).orElseThrow(() -> new CustomException(ErrorCode.COMMUNITY_POST_NOT_FOUND));
        CommunityPostLike like = communityPostLikeRepository.findByCommunityPostIdAndUserId(post.getId(), userId).orElseThrow(() -> new CustomException(ErrorCode.COMMUNITY_POST_LIKE_NOT_FOUND));
        communityPostLikeRepository.delete(like);
    }
}
