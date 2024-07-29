package com.ssafy.bartter.community.service;

import com.ssafy.bartter.community.dto.CommunityPostCommentDto;
import com.ssafy.bartter.community.entity.CommunityPost;
import com.ssafy.bartter.community.entity.CommunityPostComment;
import com.ssafy.bartter.community.repository.CommunityPostCommentRepository;
import com.ssafy.bartter.community.repository.CommunityPostRepository;
import com.ssafy.bartter.global.exception.CustomException;
import com.ssafy.bartter.global.exception.ErrorCode;
import com.ssafy.bartter.user.entity.User;
import com.ssafy.bartter.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static com.ssafy.bartter.community.dto.CommunityPostCommentDto.*;

/**
 * 동네모임 게시글 댓글 Service
 *
 * @author 김가람
 */
@Service
@Transactional
@RequiredArgsConstructor
public class CommunityPostCommentService {
    private final CommunityPostRepository communityPostRepository;
    private final UserRepository userRepository;
    private final CommunityPostCommentRepository communityPostCommentRepository;

    public CommunityPostComment createComment(Integer communityPostId, Create request) {
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        CommunityPost post = communityPostRepository.findById(communityPostId).orElseThrow(() -> new CustomException(ErrorCode.COMMUNITY_POST_NOT_FOUND));

        CommunityPostComment comment = new CommunityPostComment(request.getContent());
        comment.setUser(user);
        comment.setCommunityPost(post);

        return communityPostCommentRepository.save(comment);
    }

    public void deleteComment(Integer commentId) {
        CommunityPostComment comment = communityPostCommentRepository.findById(commentId).orElseThrow(() -> new CustomException(ErrorCode.COMMUNITY_POST_COMMENT_NOT_FOUND));;
        communityPostCommentRepository.delete(comment);
    }
}
