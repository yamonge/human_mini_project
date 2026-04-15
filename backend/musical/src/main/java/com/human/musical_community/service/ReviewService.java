package com.human.musical_community.service;

import com.human.musical_community.dto.request.ReviewReqDto;
import com.human.musical_community.dto.response.ReviewResDto;
import com.human.musical_community.entity.Musical;
import com.human.musical_community.entity.Review;
import com.human.musical_community.entity.User;
import com.human.musical_community.repository.MusicalRepository;
import com.human.musical_community.repository.ReviewRepository;
import com.human.musical_community.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final MusicalRepository musicalRepository;
    private final UserRepository userRepository;

    /**
     * 리뷰 등록
     * TODO: musicalId의 뮤지컬과 dto.userId의 유저를 조회하고 리뷰를 저장하세요.
     */
    public ReviewResDto saveReview(Long musicalId, ReviewReqDto dto) {
        // TODO: musicalRepository.findById() 로 뮤지컬 조회
        Musical val1 = musicalRepository.findById(musicalId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 뮤지컬입니다."));
        // TODO: userRepository.findById() 로 유저 조회
        User val2 = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저 입니다."));
        // TODO: Review 엔티티 생성 후 저장
        Review review = Review.builder()
                .musical(val1)
                .user(val2)
                .rating(dto.getRating())
                .content(dto.getContent())
                .build();
        reviewRepository.save(review);

        // TODO: 뮤지컬 테이블 평균 별점 계산
        List<Review> reviews = reviewRepository.findByMusicalMusicalIdOrderByCreatedAtDesc(musicalId);

        BigDecimal avg = reviews.stream()
                .map(Review::getRating)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .divide(BigDecimal.valueOf(reviews.size()), 1, RoundingMode.HALF_UP);

        val1.setRating(avg);
        musicalRepository.save(val1);
        // TODO: ReviewResDto.from() 으로 변환해서 반환
        return ReviewResDto.from(review);
    }

    /**
     * 특정 뮤지컬의 리뷰 목록 조회
     * TODO: musicalId에 해당하는 리뷰 목록을 반환하세요.
     */
    @Transactional(readOnly = true)
    public List<ReviewResDto> getReviewList(Long musicalId) {
        // TODO: findByMusicalMusicalIdOrderByCreatedAtDesc() 사용
        return reviewRepository.findByMusicalMusicalIdOrderByCreatedAtDesc(musicalId).stream()
                .map(ReviewResDto::from)
                .collect(Collectors.toList());
    }

    /**
     * 리뷰 삭제 (작성자 본인만)
     * TODO: reviewId로 조회 후 userId 검증하고 삭제하세요.
     */
    public void deleteReview(Long reviewId, Long userId) {
        // TODO: findById() → userId 검증 → delete()
        // TODO: 현재 삭제 기능없음 작업X
    }
}
