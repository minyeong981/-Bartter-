package com.ssafy.bartter.domain.community.service;

import com.ssafy.bartter.domain.community.dto.CommunityPostCommentDto;
import com.ssafy.bartter.domain.community.dto.CommunityPostDto;
import com.ssafy.bartter.domain.community.entity.CommunityPost;
import com.ssafy.bartter.domain.community.entity.CommunityPostComment;
import com.ssafy.bartter.domain.community.repository.CommunityPostCommentRepository;
import com.ssafy.bartter.domain.user.entity.User;
import com.ssafy.bartter.domain.user.repository.UserRepository;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.service.LocationService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@ActiveProfiles("test")
//@Sql({"/schema.sql", "/data.sql"})
@Transactional
@SpringBootTest
class CommunityPostCommentServiceTest {

    @Autowired
    CommunityPostService communityPostService;

    @Autowired
    CommunityPostCommentService communityPostCommentService;

    @Autowired
    CommunityPostCommentRepository communityPostCommentRepository;

    @Autowired
    LocationService locationService;

    @Autowired
    UserRepository userRepository;

    User user;

    CommunityPost post;

    @DisplayName("동네모임 댓글을 작성한다.")
    @Test
    void 동네모임_댓글_작성() {
        // given
        CommunityPostCommentDto.Create request = new CommunityPostCommentDto.Create();
        request.setContent("댓글");

        // when
        CommunityPostComment comment = communityPostCommentService.createComment(post.getId(), request, user.getId());

        // then
        Optional<CommunityPostComment> findComment = communityPostCommentRepository.findById(comment.getId());
        Assertions.assertThat(findComment).isNotNull();
        Assertions.assertThat(findComment.get().getId()).isEqualTo(comment.getId());
    }

    @DisplayName("댓글에 빈 문자열을 입력하면 예외가 발생한다.")
    @Test
    void 댓글_작성_예외_빈_문자열()                                                                                                                                                                                                                                                                                                            {
        // given
        CommunityPostCommentDto.Create request = new CommunityPostCommentDto.Create();
        request.setContent("");

        // when, then
        Assertions.assertThatThrownBy(() -> communityPostCommentService.createComment(200, request, user.getId()))
                .isInstanceOf(CustomException.class)
                .hasMessageContaining("해당 ID의 동네모임 게시글을 찾을 수 없습니다.");
    }


    @BeforeEach
    void setUp() {
        // User
        user = userRepository.findByUserId(1).get();

        // Post 생성
        CommunityPostDto.Create create = new CommunityPostDto.Create();
        create.setTitle("제목");
        create.setContent("내용");

        post = communityPostService.createPost(create, null, 1);
    }
}