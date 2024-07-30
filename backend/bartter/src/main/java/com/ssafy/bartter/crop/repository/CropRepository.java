package com.ssafy.bartter.crop.repository;

import com.ssafy.bartter.crop.entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CropRepository extends JpaRepository<Crop, Integer> {
    List<Crop> findAllByUserId(Integer userId);
}
