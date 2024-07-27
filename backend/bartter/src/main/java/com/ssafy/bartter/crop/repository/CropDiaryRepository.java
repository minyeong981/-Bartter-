package com.ssafy.bartter.crop.repository;

import com.ssafy.bartter.crop.entity.CropDiary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropDiaryRepository extends JpaRepository<CropDiary, Integer> {
}
