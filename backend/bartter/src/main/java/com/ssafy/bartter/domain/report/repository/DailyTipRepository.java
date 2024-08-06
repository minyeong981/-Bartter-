package com.ssafy.bartter.domain.report.repository;

import com.ssafy.bartter.domain.report.entity.DailyTip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DailyTipRepository extends JpaRepository<DailyTip, Integer> {
    @Query("UPDATE DailyTip d set d.isEnabled = false")
    void updateAllEnableFalse();
}
