package com.ssafy.bartter.community.service;

import com.ssafy.bartter.community.entity.CommunityPost;
import com.ssafy.bartter.community.entity.CommunityPostImage;
import com.ssafy.bartter.community.entity.CommunityPostLike;
import com.ssafy.bartter.community.repository.CommunityPostImageRepository;
import com.ssafy.bartter.community.repository.CommunityPostLikeRepository;
import com.ssafy.bartter.community.repository.CommunityPostRepository;
import com.ssafy.bartter.community.repository.CommunityPostRepositoryImpl;
import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.service.LocationService;
import com.ssafy.bartter.global.service.S3UploadService;
import com.ssafy.bartter.user.entity.User;
import com.ssafy.bartter.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.ssafy.bartter.community.dto.CommunityPostDto.Create;

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
    private final CommunityPostRepositoryImpl communityPostRepositoryImpl;
    private final CommunityPostLikeRepository communityPostLikeRepository;

    /**
     * 동네모임 게시글 전체조회
     * */
    @Transactional(readOnly = true)
    public List<CommunityPost> getPostList(int page, int limit, String keyword, boolean isCommunity, Integer userId) {
        // 전체 게시글 조회에서는 빈 ArrayList로 남아있다.
        List<Location> nearbyLocationList = new ArrayList<>();

        // 동네 게시글 조회에서는 유저 위치 반경에 있는 Location들의 ArrayList로 바꿔준다.
        if (isCommunity) {
            User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            Integer locationId = user.getLocation().getId();
            nearbyLocationList = locationService.getNearbyLocationList(locationId);
        }

        PageRequest pageable = PageRequest.of(page, limit, Sort.by("createdAt").descending());
        List<CommunityPost> postList = communityPostRepositoryImpl.findPostListByParams(keyword, nearbyLocationList, pageable);
        return postList;
    }

    /**
     * 동네모임 게시글 작성
     * */
    public CommunityPost createPost(Create request, MultipartFile[] imageList, Integer userId) {
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

    // TODO : Fetch join - Location, LikeList, CommentList, ImageList
    /**
     * 동네모임 게시글 상세조회
     * */
    @Transactional(readOnly = true)
    public CommunityPost getPost(Integer communityPostId) {
        return communityPostRepository.findById(communityPostId).orElseThrow(() -> new CustomException(ErrorCode.COMMUNITY_POST_NOT_FOUND));
    }

    /**
     * 동네모임 게시글 삭제
     * */
    // TODO : AWS에서 삭제
    public void deletePost(Integer communityPostId, Integer userId) {
        CommunityPost post = communityPostRepository.findById(communityPostId).orElseThrow(() -> new CustomException(ErrorCode.COMMUNITY_POST_NOT_FOUND));
        if (!post.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.UNAUTHENTICATED);
        }
        communityPostRepository.delete(post);
    }

    public void toggleLikes(Integer communityPostId, Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        CommunityPost post = communityPostRepository.findById(communityPostId).orElseThrow(() -> new CustomException(ErrorCode.COMMUNITY_POST_NOT_FOUND));
        CommunityPostLike like = communityPostLikeRepository.findByCommunityPostIdAndUserId(post.getId(), userId);

        if (like == null) {
            CommunityPostLike newLike = new CommunityPostLike();
            newLike.addUser(user);
            newLike.addCommunityPost(post);
            communityPostLikeRepository.save(newLike);
        } else {
            communityPostLikeRepository.delete(like);
        }
    }

    @Transactional(readOnly = true)
    public List<CommunityPost> getUserPostList(int page, int limit, Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        PageRequest pageable = PageRequest.of(page, limit, Sort.by("createdAt").descending());
        return communityPostRepository.findAllByUserId(userId, pageable);
    }
}
