package com.ssafy.bartter.domain.community.service;

import com.ssafy.bartter.domain.community.dto.CommunityPostDto;
import com.ssafy.bartter.domain.community.entity.CommunityPost;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.domain.user.repository.UserRepository;
import com.ssafy.bartter.domain.user.services.UserService;
import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.global.service.LocationService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test")
@Transactional
@SpringBootTest
class CommunityPostServiceTest {

    User user1;
    User user2;
    User user3;

    CommunityPost post1;
    CommunityPost post2;
    CommunityPost post3;
    CommunityPost post4;
    CommunityPost post5;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommunityPostService communityPostService;
    @Autowired
    private LocationService locationService;

    @DisplayName("게시글을 offset 0, limit 3으로 검색 키워드 없이 전체조회하면 1번부터 3번까지의 게시글을 반환한다.")
    @Test
    void 게시글_전체조회_페이징() {
        // when
        List<CommunityPost> postList = communityPostService.getPostList(0, 3, "", false, 1);

        // then
        Assertions.assertThat(postList).hasSize(3);
        Assertions.assertThat(postList).containsExactly(post1, post2, post3);
    }

    @DisplayName("제목에 특정 키워드를 포함한 게시글의 리스트를 반환한다.")
    @Test
    void 게시글_전체조회_키워드_제목() {
        // when
        List<CommunityPost> postList = communityPostService.getPostList(0, 5, "목3", false, 1);

        // then
        Assertions.assertThat(postList).hasSize(1);
        Assertions.assertThat(postList).containsExactly(post3);
    }

    @DisplayName("내용에 특정 키워드를 포함한 게시글의 리스트를 반환한다.")
    @Test
    void 게시글_전체조회_키워드_내용() {
        // when
        List<CommunityPost> postList = communityPostService.getPostList(0, 5, "용1", false, 1);

        // then
        Assertions.assertThat(postList).hasSize(1);
        Assertions.assertThat(postList).containsExactly(post1);
    }

    @DisplayName("우리동네 게시글 보기를 설정하지 않으면 전체 지역의 게시글이 반환된다.")
    @Test
    void 전체지역_게시글_조회() {
        // given
        boolean hasSeoul = false;
        boolean hasGwangju = false;

        // when
        List<CommunityPost> postList = communityPostService.getPostList(0, 5, "", false, 1);

        for (CommunityPost post : postList) {
            String city = post.getLocation().getName().substring(0, 2);
            if (city.equals("서울")) hasSeoul = true;
            if (city.equals("광주")) hasGwangju = true;
        }

        // then
        Assertions.assertThat(hasSeoul).isTrue();
        Assertions.assertThat(hasGwangju).isTrue();
    }

    @DisplayName("우리동네 게시글 보기를 설정하면 내 주변 동네에서 작성된 글만 반환된다.")
    @Test
    void 우리동네_게시글_조회() {
        // given
        HashMap<String, Integer> cityCount = new HashMap<>();
        cityCount.put("서울", 0);
        cityCount.put("광주", 0);
        List<Location> nearbyLocationList = locationService.getNearbyLocationList(user1.getLocation().getId());
        int inNearbyLocationCount = 0;

        // when
        List<CommunityPost> postList = communityPostService.getPostList(0, 5, "", true, 1);

        for (CommunityPost post : postList) {
            if (nearbyLocationList.contains(post.getLocation())) {
                inNearbyLocationCount++;
            }
        }

        // then
        Assertions.assertThat(inNearbyLocationCount).isEqualTo(3);
    }


    @BeforeEach
    void setUp() {
        user1 = userRepository.findById(1).get();
        user2 = userRepository.findById(2).get();
        user3 = userRepository.findById(3).get();

        CommunityPostDto.Create create1 = new CommunityPostDto.Create();
        create1.setTitle("제목1");
        create1.setContent("내용1");

        CommunityPostDto.Create create2 = new CommunityPostDto.Create();
        create2.setTitle("제목2");
        create2.setContent("내용2");

        CommunityPostDto.Create create3 = new CommunityPostDto.Create();
        create3.setTitle("제목3");
        create3.setContent("내용3");

        CommunityPostDto.Create create4 = new CommunityPostDto.Create();
        create4.setTitle("제목4");
        create4.setContent("내용4");

        CommunityPostDto.Create create5 = new CommunityPostDto.Create();
        create5.setTitle("제목5");
        create5.setContent("내용5");

        post1 = communityPostService.createPost(create1, null, 1);
        post2 = communityPostService.createPost(create2, null, 1);
        post3 = communityPostService.createPost(create3, null, 2);
        post4 = communityPostService.createPost(create4, null, 3);
        post5 = communityPostService.createPost(create5, null, 3);
    }
}