package com.ssafy.bartter.domain.report.repository;

import com.ssafy.bartter.domain.report.entity.DailyTip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface DailyTipRepository extends JpaRepository<DailyTip, Integer> {
    @Modifying
    @Query("UPDATE DailyTip t set t.isEnabled = false")
    void updateAllEnableFalse();

    @Query(
            "SELECT t FROM DailyTip t"
            + " WHERE t.user.id = :userId"
            + " AND t.isEnabled = true"
            + " AND t.weekday = :today"
    )
    Optional<DailyTip> getDailyTip(
            @Param("userId") int userId,
            @Param("today") int today
    );

    @Modifying
    @Query(
            "UPDATE DailyTip t set t.isEnabled = false"
                    + " WHERE t.user.id = :userId"
                    + " AND t.weekday = :today"
    )
    void updateEnableFalse(int userId, int today);
}
