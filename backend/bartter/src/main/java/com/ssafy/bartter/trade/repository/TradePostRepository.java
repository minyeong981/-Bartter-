package com.ssafy.bartter.trade.repository;

import com.ssafy.bartter.global.common.Location;
import com.ssafy.bartter.trade.entity.TradePost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TradePostRepository extends JpaRepository<TradePost, Integer> {

    // TODO : fetch LAZY로 인한 N + 1 가능성 생각해보기 
    @Query("SELECT tp.id FROM TradePost tp " +
            "JOIN tp.location loc " + // 물물교환 게시글의 위치
            "LEFT JOIN tp.category cat " + // 물물교환 게시글의 카테고리
            "LEFT JOIN tp.wishCropCategoryList wcc " + // 해당 게시글의 원하는 카테고리
            "WHERE (loc.id IN :nearbyLocationList) " + // 현재 위치에 해당하는 게시글만 가져온다.
            "AND (:givenCategory = 0 OR wcc.category.id = :givenCategory) " + // 주고 싶은 카테고리가 0이라면 항상 True, 0이 아니라면 해당 게시글의 원하는 농작물에 내가 주고 싶은게 있는가 ?
            "AND (:desiredCategoriesSize = 0 OR cat.id IN :desiredCategories) ") // 원하는 카테고리가 비어 있으면 항상 True, 그렇지 않으먄 카테고리 매핑
    Page<Integer> findTradePostIdList(
            @Param("nearbyLocationList") List<Location> nearbyLocationList,
            @Param("givenCategory") int givenCategory,
            @Param("desiredCategories") List<Integer> desiredCategories,
            @Param("desiredCategoriesSize") int desiredCategoriesSize,
            Pageable pageable
    );

    @Query("SELECT DISTINCT tp FROM TradePost tp " +
            "LEFT JOIN FETCH tp.location loc " +
            "LEFT JOIN FETCH tp.likeList lk " +
            "LEFT JOIN tp.imageList img " +
            "WHERE tp.id IN :idList")
    List<TradePost> findTradePostListByIdList(@Param("idList") List<Integer> idList);
}
