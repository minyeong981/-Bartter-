package com.ssafy.bartter.community.service;

import com.ssafy.bartter.community.entity.CommunityPost;
import com.ssafy.bartter.community.entity.CommunityPostImage;
import com.ssafy.bartter.community.repository.CommunityPostImageRepository;
import com.ssafy.bartter.community.repository.CommunityPostRepository;
import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.service.S3UploadService;
import com.ssafy.bartter.user.entity.User;
import com.ssafy.bartter.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.ssafy.bartter.community.dto.CommunityPostDto.Create;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;

/**
 * @Author 김가람
 *
 * CommunityPostService 테스트
 * */
@ExtendWith(MockitoExtension.class)
class CommunityPostServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private CommunityPostRepository communityPostRepository;

    @Mock
    private CommunityPostImageRepository communityPostImageRepository;

    @Mock
    private S3UploadService s3UploadService;

    @InjectMocks
    private CommunityPostService communityPostService;

    @DisplayName("이미지 3개를 포함한 요청 정보와 동일한 정보를 가진 동네모임 게시글을 생성한다.")
    @Test
    void 이미지_포함_동네모임_게시글_생성() {
        // given
        Create request = getRequest();
        MultipartFile image1 = mock(MultipartFile.class);
        MultipartFile image2 = mock(MultipartFile.class);
        MultipartFile image3 = mock(MultipartFile.class);
        List<MultipartFile> imageList = List.of(image1, image2, image3);

        User mockUser = mock(User.class);
        Location mockUserLocation = mock(Location.class);

        given(userRepository.findById(1)).willReturn(Optional.of(mockUser));
        given(mockUser.getLocation()).willReturn(mockUserLocation);
        given(s3UploadService.upload(image1)).willReturn("testurl1");
        given(s3UploadService.upload(image2)).willReturn("testurl2");
        given(s3UploadService.upload(image3)).willReturn("testurl3");

        // when
        CommunityPost post = communityPostService.createPost(request, imageList);

        // then
        assertThat(post).isNotNull();
        assertThat(post.getUser()).isEqualTo(mockUser);
        assertThat(post.getLocation()).isEqualTo(mockUserLocation);
        assertThat(post.getTitle()).isEqualTo("title");
        assertThat(post.getContent()).isEqualTo("content");

        List<CommunityPostImage> postImageList = post.getImageList();
        List<String> imageUrlList = new ArrayList<>();
        for (int i = 0; i < postImageList.size(); i++) {
            CommunityPostImage postImage = postImageList.get(i);
            assertThat(postImage.getImageUrl()).isEqualTo("testurl" + (i + 1));
            assertThat(postImage.getOrder()).isEqualTo(i + 1);
        }
    }

    @DisplayName("이미지 없이 요청 정보와 동일한 정보를 가진 동네모임 게시글을 생성한다.")
    @Test
    void 이미지_미포함_동네모임_게시글_생성() {
        // given
        Create request = getRequest();
        List<MultipartFile> imageList = new ArrayList<>();

        User mockUser = mock(User.class);
        Location mockUserLocation = mock(Location.class);

        given(userRepository.findById(1)).willReturn(Optional.of(mockUser));
        given(mockUser.getLocation()).willReturn(mockUserLocation);

        // when
        CommunityPost post = communityPostService.createPost(request, imageList);

        // then
        assertThat(post).isNotNull();
        assertThat(post.getUser()).isEqualTo(mockUser);
        assertThat(post.getLocation()).isEqualTo(mockUserLocation);
        assertThat(post.getTitle()).isEqualTo("title");
        assertThat(post.getContent()).isEqualTo("content");
        assertThat(post.getImageList()).hasSize(0);
    }

    @DisplayName("동네모임 게시글 PK로 동네모임 게시글을 조회한다.")
    @Test
    void 동네모임_게시글_조회() {
        // given
        CommunityPost post = mock(CommunityPost.class);
        given(communityPostRepository.findById(1)).willReturn(Optional.of(post));

        // when
        CommunityPost findPost = communityPostService.getPost(1);

        // then
        assertThat(findPost).isNotNull();
        assertThat(findPost).isEqualTo(post);
    }


    private static Create getRequest() {
        Integer userId = 1;
        String title = "title";
        String content = "content";

        return new Create(userId, title, content);
    }
}