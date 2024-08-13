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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@ActiveProfiles("test")
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
        assertThat(findComment).isNotNull();
        assertThat(findComment.get().getId()).isEqualTo(comment.getId());
        assertThat(findComment.get().getContent()).isEqualTo(comment.getContent());
        assertThat(findComment.get().getUser()).isEqualTo(user);
        assertThat(findComment.get().getCommunityPost()).isEqualTo(post);
    }

    @DisplayName("동네모임 댓글을 삭제하면 해당 엔티티가 더이상 조회되지 않는다.")
    @Test
    void 동네모임_댓글_삭제_성공() {
        // given
        CommunityPostCommentDto.Create request = new CommunityPostCommentDto.Create();
        request.setContent("댓글");
        CommunityPostComment comment = communityPostCommentService.createComment(post.getId(), request, user.getId());

        // when
        communityPostCommentService.deleteComment(user.getId(), comment.getId());

        // then
        Optional<CommunityPostComment> findComment = communityPostCommentRepository.findById(comment.getId());
        assertThat(findComment).isEmpty();
    }

    @DisplayName("작성자가 아니면 댓글을 삭제할 수 없다.")
    @Test
    void 동네모임_댓글_삭제_인가_실패() {
        // given
        CommunityPostCommentDto.Create request = new CommunityPostCommentDto.Create();
        request.setContent("댓글");
        CommunityPostComment comment = communityPostCommentService.createComment(post.getId(), request, user.getId());

        // when, then
        assertThatThrownBy(() -> communityPostCommentService.deleteComment(2, comment.getId()))
                .isInstanceOf(CustomException.class)
                .hasMessageContaining("접근 권한이 없습니다.");
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