package com.ssafy.bartter.domain.crop.repository;

import com.ssafy.bartter.domain.crop.entity.Crop;
import com.ssafy.bartter.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * CropRepository
 *
 * @author 김가람
 */
public interface CropRepository extends JpaRepository<Crop, Integer> {

    @Query(
            "SELECT c FROM Crop c"
                    + " JOIN FETCH c.user"
                    + " JOIN FETCH c.category"
                    + " WHERE c.id = :cropId"
    )
    Optional<Crop> findById(
            @Param("cropId") int cropId
    );

    @Query(
            "SELECT c FROM Crop c"
            + " JOIN FETCH c.user"
            + " JOIN FETCH c.category"
            + " WHERE c.user.id = :userId"
    )
    List<Crop> findAllByUserId(
            @Param("userId") Integer userId
    );

    // TODO : DTO 변환 후 쿼리 체크
    @Query(
            "SELECT tp.crop FROM TradePost tp"
                    + " LEFT JOIN FETCH Crop c"
                    + " ON tp.crop.id = c.id"
                    + " WHERE tp.user.id = :userId"
                    + " AND tp.status = 'COMPLETED'"
                    + " ORDER BY tp.createdAt DESC"
    )
    List<Crop> findGiveCropByUserId(
            @Param("userId") int userId
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
                    + " ORDER BY t.createdAt DESC"
    )
    List<Crop> findReceiveCropByUserId(
            @Param("userId") int userId
    );

    @Query(
            "SELECT COUNT(tp) FROM TradePost tp"
                    + " WHERE tp.status = 'COMPLETED'"
                    + " AND tp.crop.id = :cropId"
    )
    int getTradeCount(
            @Param("cropId") int cropId
    );
}
