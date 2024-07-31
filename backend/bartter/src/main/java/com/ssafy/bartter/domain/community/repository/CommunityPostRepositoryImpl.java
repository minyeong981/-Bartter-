package com.ssafy.bartter.domain.community.repository;

import com.ssafy.bartter.domain.community.entity.CommunityPost;
import com.ssafy.bartter.domain.community.entity.CommunityPostComment;
import com.ssafy.bartter.domain.community.entity.CommunityPostImage;
import com.ssafy.bartter.domain.community.entity.CommunityPostLike;
import com.ssafy.bartter.global.common.Location;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class CommunityPostRepositoryImpl implements CommunityPostRepositoryCustom {

    private final EntityManager em;

    @Override
    public List<CommunityPost> findPostListByParams(String keyword, List<Location> nearbyLocationList, PageRequest pageable) {
        List<CommunityPost> postList = findNearbyCommunityPostListByKeyword(keyword, nearbyLocationList, pageable);
        List<Integer> postIdList = toIdList(postList);

        // likelist
        Map<Integer, List<CommunityPostLike>> likeMap = findLikeMap(postIdList);

        // commentlist
        Map<Integer, List<CommunityPostComment>> commentMap = findCommentMap(postIdList);

        // imagelist
        Map<Integer, List<CommunityPostImage>> imageMap = findImageMap(postIdList);

        // N + 1 문제 미해결:
        // - postList를 순회하며 리스트들을 매핑해주기
        // - 그러나 이렇게 하려면 postList에 setter를 열거나 현재 작업을 위한 dto를 따로 만들어야 하는 번거로움이 존재
        // - 수동으로 매핑해주지 않아도 controller단에서 dto로 변환활 때 getImageList()를 통해서 불러올 수 있지 않나?
        // - 그리고 불러오는 시점에는 위에서 이미 영속성 컨텍스트에 객체들이 모두 등록되어있기 때문에 쿼리가 새로 실행되지 않지 않을까?
        //   -> 여전히 실행됨 : 프록시 객체에 연관관계 있는 객체가 비어있으면 그냥 쿼리 실행하는듯
//        postList.forEach(o -> {
//            o.setLikeList(likeMap.get(o.getId()));
//            o.setCommentList(commentMap.get(o.getId()));
//            o.setImageList(imageMap.get(o.getId()));
//        });
        return postList;
    }

    private Map<Integer, List<CommunityPostLike>> findLikeMap(List<Integer> postIdList) {
        List<CommunityPostLike> likeList = em.createQuery(
                                "SELECT l FROM CommunityPostLike l"
                                + " WHERE l.communityPost.id IN :postIdList", CommunityPostLike.class
                        )
                        .setParameter("postIdList", postIdList)
                        .getResultList();

        return likeList.stream()
                .collect(Collectors.groupingBy(o -> o.getCommunityPost().getId()));
    }

    private Map<Integer, List<CommunityPostComment>> findCommentMap(List<Integer> postIdList) {
        List<CommunityPostComment> commentList = em.createQuery(
                        "SELECT c FROM CommunityPostComment c"
                                + " WHERE c.communityPost.id IN :postIdList", CommunityPostComment.class
                )
                .setParameter("postIdList", postIdList)
                .getResultList();

        return commentList.stream()
                .collect(Collectors.groupingBy(o -> o.getCommunityPost().getId()));
    }

    private Map<Integer, List<CommunityPostImage>> findImageMap(List<Integer> postIdList) {
        List<CommunityPostImage> imageList = em.createQuery(
                        "SELECT i FROM CommunityPostImage i"
                                + " WHERE i.communityPost.id IN :postIdList", CommunityPostImage.class
                )
                .setParameter("postIdList", postIdList)
                .getResultList();

        return imageList.stream()
                .collect(Collectors.groupingBy(o -> o.getCommunityPost().getId()));
    }

    List<CommunityPost> findNearbyCommunityPostListByKeyword(String keyword, List<Location> nearbyLocationList, PageRequest pageable
    ) {
        return em.createQuery("SELECT p FROM CommunityPost p"
                        + " JOIN FETCH p.location l"
                        + " WHERE p.title LIKE :keyword OR p.content LIKE :keyword"
                        + " AND l in :nearbyLocationList", CommunityPost.class
                ).setParameter("keyword", "%" + keyword + "%")
                .setParameter("nearbyLocationList", nearbyLocationList)
                .getResultList();
    }

    private List<Integer> toIdList(List<CommunityPost> postList) {
        return postList.stream()
                .map(CommunityPost::getId)
                .collect(Collectors.toList());
    }
}
