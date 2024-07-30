package com.ssafy.bartter.community.service;

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

import static com.ssafy.bartter.community.dto.CommunityPostCommentDto.Create;

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

    /**
     * 동네모임 댓글 작성
     * */
    public CommunityPostComment createComment(Integer communityPostId, Create request, Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        CommunityPost post = communityPostRepository.findById(communityPostId).orElseThrow(() -> new CustomException(ErrorCode.COMMUNITY_POST_NOT_FOUND));

        CommunityPostComment comment = new CommunityPostComment(request.getContent());
        comment.addUser(user);
        comment.addCommunityPost(post);

        return communityPostCommentRepository.save(comment);
    }

    /**
     * 동네모임 댓글 삭제
     * */
    // TODO : AWS에서 삭제
    public void deleteComment(Integer userId, Integer commentId) {
        CommunityPostComment comment = communityPostCommentRepository.findById(commentId).orElseThrow(() -> new CustomException(ErrorCode.COMMUNITY_POST_COMMENT_NOT_FOUND));;
        if (!comment.getUser().getId().equals(userId)) {
            throw new CustomException(ErrorCode.UNAUTHENTICATED);
        }
        communityPostCommentRepository.delete(comment);
    }
}
