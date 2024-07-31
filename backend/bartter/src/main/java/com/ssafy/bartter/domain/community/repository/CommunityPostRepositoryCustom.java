package com.ssafy.bartter.domain.community.repository;

import com.ssafy.bartter.domain.community.entity.CommunityPost;
import com.ssafy.bartter.global.common.Location;
import org.springframework.data.domain.PageRequest;

import java.util.List;

public interface CommunityPostRepositoryCustom {
    public List<CommunityPost> findPostListByParams(String keyword, List<Location> nearbyLocationList, PageRequest pageable);
}
