package com.ssafy.bartter.community.service;

import com.ssafy.bartter.community.entity.CommunityPost;
import com.ssafy.bartter.community.entity.CommunityPostImage;
import com.ssafy.bartter.community.repository.CommunityPostImageRepository;
import com.ssafy.bartter.community.repository.CommunityPostRepository;
import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.global.service.S3UploadService;
import com.ssafy.bartter.user.entity.User;
import com.ssafy.bartter.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

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

    public CommunityPost createPost(Create request, List<MultipartFile> imageList) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Location userLocation = user.getLocation();
        List<CommunityPostImage> images = new ArrayList<>();

        CommunityPost post = CommunityPost.builder()
                .user(user)
                .location(userLocation)
                .title(request.getTitle())
                .content(request.getContent())
                .build();

        communityPostRepository.save(post);

        for (int i = 0; i < imageList.size(); i++) {
            String imageUrl = s3UploadService.upload(imageList.get(i));
            CommunityPostImage postImage = CommunityPostImage.builder()
                    .imageUrl(imageUrl)
                    .order(i + 1)
                    .build();

            postImage.setCommunityPost(post);
            communityPostImageRepository.save(postImage);
        }

        return post;
    }

    // TODO : Fetch join - Location, LikeList, CommentList, ImageList
    public CommunityPost getPost(Integer communityPostId) {
        return communityPostRepository.findById(communityPostId).orElseThrow(() -> new CustomException(ErrorCode.COMMUNITY_POST_NOT_FOUND));
    }

    public void deletePost(Integer communityPostId) {
        CommunityPost post = communityPostRepository.findById(communityPostId).orElseThrow(() -> new CustomException(ErrorCode.COMMUNITY_POST_NOT_FOUND));
        communityPostRepository.delete(post);
    }
}
