package com.ssafy.bartter.domain.trade.repository;

import com.ssafy.bartter.domain.trade.entity.TradePost;
import com.ssafy.bartter.global.common.Location;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * TradePostRepository
 *
 * @author 김용수
 */
public interface TradePostRepository extends JpaRepository<TradePost, Integer> {

    /**
     * 조건에 맞는 물물교환 게시글들의 Id를 리턴
     *
     * @param nearbyLocationList    반경에 해당하는 지역 번호
     * @param givenCategory         주고 싶은 카테고리 존재하지 않으면 0
     * @param desiredCategories     받고 싶은 카테고리 존재하지 않으면 null
     * @param desiredCategoriesSize 받고 싶은 카테고리의 개수
     * @param pageable              페이징 조건
     * @return 페이징된 물물교환 게시글들의 ID값
     */
    @Query("SELECT tp.id FROM TradePost tp " +
            "JOIN tp.location loc " + // 물물교환 게시글의 위치
            "LEFT JOIN tp.category cat " + // 물물교환 게시글의 카테고리
            "LEFT JOIN tp.wishCropCategoryList wcc " + // 해당 게시글의 원하는 카테고리
            "WHERE loc IN :nearbyLocationList " + // 현재 위치에 해당하는 게시글만 가져온다.
            "AND (:givenCategory = 0 OR wcc.category.id = :givenCategory) " + // 주고 싶은 카테고리가 0이라면 항상 True, 0이 아니라면 해당 게시글의 원하는 농작물에 내가 주고 싶은게 있는가 ?
            "AND (:desiredCategoriesSize = 0 OR cat.id IN :desiredCategories) " + // 원하는 카테고리가 비어 있으면 항상 True, 그렇지 않으먄 카테고리 매핑
            "GROUP BY tp.id ")
    Page<Integer> findTradePostIdList(
            @Param("nearbyLocationList") List<Location> nearbyLocationList,
            @Param("givenCategory") int givenCategory,
            @Param("desiredCategories") List<Integer> desiredCategories,
            @Param("desiredCategoriesSize") int desiredCategoriesSize,
            Pageable pageable
    );

    /**
     * 리스트에 있는 ID를 가진 포스트를 리턴해준다.
     *
     * @param idList ID가 담긴 리스트
     * @return ID에 해당하는 TradePost
     */
    @Query("SELECT tp FROM TradePost tp " +
            "LEFT JOIN FETCH tp.location loc " +
            "LEFT JOIN FETCH tp.likeList lk " +
            "WHERE tp.id IN :idList " +
            "ORDER BY tp.id DESC")
    List<TradePost> findTradePostListByIdList(@Param("idList") List<Integer> idList);

    /**
     * 해당 ID를 가진 게시글을 리턴해준다.
     *
     * @param findTradePostId 찾고싶은 아이디
     * @return 해당 ID를 가진 TradePost
     */
    @Query("SELECT tp FROM TradePost tp " +
            "JOIN FETCH tp.user " +
            "LEFT JOIN FETCH tp.crop " +
            "JOIN FETCH tp.location " +
            "LEFT JOIN tp.wishCropCategoryList " +
            "LEFT JOIN tp.imageList " +
            "LEFT JOIN FETCH tp.likeList " +
            "LEFT JOIN tp.tradeList " +
            "WHERE tp.id = :findTradePostId "
    )
    Optional<TradePost> findTradePostById(@Param("findTradePostId") int findTradePostId);

    /**
     * 해당 키워드를 가진 물물교환 게시글 ID 리스트를 리턴해준다.
     *
     * @param keyword  검색 할 키워드
     * @param pageable 페이징 조건
     * @return 키워드가 포함된 페이징 ID
     */
    @Query("SELECT tp.id FROM TradePost tp " +
            "WHERE LOWER(tp.title) LIKE LOWER(CONCAT('%', :keyword,'%'))" +
            "OR LOWER(tp.content) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Integer> findTradePostListByKeyword(
            @Param("keyword") String keyword,
            Pageable pageable
    );

    /**
     * 해당하는 ID를 가진 작성자와 포스트가 있는지 확인한다.
     *
     * @param userId      글작성자
     * @param tradePostId 게시글 ID
     * @return userId가 글작성자이고 tradePostId를 PK로 갖는 TradePost
     */
    @Query("SELECT " +
            "CASE WHEN COUNT(tr) > 0 " +
            "THEN TRUE " +
            "ELSE FALSE " +
            "END " +
            "FROM TradePost tr " +
            "WHERE tr.user.id = :userId " +
            "AND tr.id = :tradePostId")
    boolean existByUserIdAndTradePost(@Param("userId") int userId, @Param("tradePostId") int tradePostId);


    @Query("SELECT " +
            "CASE WHEN COUNT(li) > 0 " +
            "THEN TRUE " +
            "ELSE FALSE " +
            "END " +
            "FROM TradePost tp " +
            "JOIN tp.likeList li " +
            "WHERE li.user.id = :userId " +
            "AND tp.id = :tradePostId")
    boolean likeExistByUserId(@Param("tradePostId") int tradePostId, @Param("userId") int userId);
}
