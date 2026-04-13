package com.human.musical_community.repository;

import com.human.musical_community.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // 특정 뮤지컬의 리뷰 목록 (최신순)
    List<Review> findByMusicalMusicalIdOrderByCreatedAtDesc(Long musicalId);

    // 특정 회원이 작성한 리뷰 목록
    List<Review> findByUserUserIdOrderByCreatedAtDesc(Long userId);

    // TODO: 평균 별점 계산을 위한 쿼리 추가 가능
}
