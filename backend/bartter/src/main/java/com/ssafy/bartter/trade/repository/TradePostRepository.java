package com.ssafy.bartter.trade.repository;

import com.ssafy.bartter.trade.dto.TradePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TradePostRepository extends JpaRepository<TradePost, Integer> {

    @Query("SELECT tp FROM TradePost tp " +
            "JOIN tp.location loc " + // 물물교환 게시글의 위치
            "LEFT JOIN tp.category cat " + // 물물교환 게시글의 카테고리
            "LEFT JOIN tp.wishCropCategoryList wcc " + // 해당 게시글의 원하는 카테고리
            "WHERE loc.id = :locationId " + // 현재 위치에 해당하는 게시글만 가져온다.
            "AND (:givenCategory = 0 OR wcc.category.id = :givenCategory) " + // 주고 싶은 카테고리가 0이라면 항상 True, 0이 아니라면 해당 게시글의 원하는 농작물에 내가 주고 싶은게 있는가 ?
            "AND (:desiredCategoriesSize = 0 OR cat.id IN :desiredCategories) " +
            "ORDER BY tp.createdAt DESC")
    List<TradePost> findTradePostList(
            @Param("locationId") int locationId,
            @Param("givenCategory") int givenCategory,
            @Param("desiredCategories") List<Integer> desiredCategories,
            @Param("desiredCategoriesSize") int desiredCategoriesSize);
}
