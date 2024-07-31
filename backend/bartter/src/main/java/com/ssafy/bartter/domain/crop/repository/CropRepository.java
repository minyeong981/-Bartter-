package com.ssafy.bartter.domain.crop.repository;

import com.ssafy.bartter.domain.crop.entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CropRepository extends JpaRepository<Crop, Integer> {
    List<Crop> findAllByUserId(Integer userId);

    // TODO : DTO 변환 후 쿼리 체크
    @Query(
            "SELECT tp.crop FROM TradePost tp"
                    + " LEFT JOIN FETCH Crop c"
                    + " ON tp.crop.id = c.id"
                    + " WHERE tp.user.id = :userId"
                    + " AND tp.status = 'COMPLETED'"
    )
    List<Crop> findGiveCropByUserId(
            @Param("userId") Integer userId
    );

    // TODO : DTO 변환 후 쿼리 체크
    @Query(
            "SELECT t.tradePost.crop FROM Trade t"
                    + " LEFT JOIN FETCH TradePost tp"
                    + " ON t.tradePost.id = tp.id"
                    + " LEFT JOIN FETCH Crop c"
                    + " ON tp.crop.id = c.id"
                    + " WHERE t.status = 'COMPLETED'"
                    + " AND t.user.id = :userId"
    )
    List<Crop> findReceiveCropByUserId(
            @Param("userId") Integer userId
    );
}
