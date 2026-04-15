package com.human.musical_community.controller;

import com.human.musical_community.dto.request.ReviewReqDto;
import com.human.musical_community.dto.response.ApiResponse;
import com.human.musical_community.dto.response.ReviewResDto;
import com.human.musical_community.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/musicals/{musicalId}/reviews")
@RequiredArgsConstructor
@Tag(name = "Review", description = "뮤지컬 리뷰 CRUD API")
public class ReviewController {

    private final ReviewService reviewService;

    @Operation(summary = "리뷰 등록")
    @PostMapping
    public ResponseEntity<ApiResponse<ReviewResDto>> saveReview(
            @Parameter(description = "뮤지컬 ID", example = "1") @PathVariable Long musicalId,
            @RequestBody ReviewReqDto dto) {
        // TODO: reviewService.saveReview() 구현 후 아래 주석 제거
        return ResponseEntity.ok(ApiResponse.ok("리뷰 등록 성공", reviewService.saveReview(musicalId, dto)));
        // return ResponseEntity.ok(ApiResponse.fail("TODO: ReviewService.saveReview() 구현 필요"));
    }

    @Operation(summary = "리뷰 목록 조회")
    @GetMapping
    public ResponseEntity<ApiResponse<List<ReviewResDto>>> getReviewList(
            @Parameter(description = "뮤지컬 ID", example = "1") @PathVariable Long musicalId) {
        // TODO: reviewService.getReviewList() 구현 후 아래 주석 제거
        return ResponseEntity.ok(ApiResponse.ok("리뷰 목록 조회 성공", reviewService.getReviewList(musicalId)));
        // return ResponseEntity.ok(ApiResponse.fail("TODO: ReviewService.getReviewList() 구현 필요"));
    }

    @Operation(summary = "리뷰 삭제")
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<ApiResponse<Void>> deleteReview(
            @PathVariable Long musicalId,
            @Parameter(description = "리뷰 ID", example = "1") @PathVariable Long reviewId,
            @Parameter(description = "요청자 userId", example = "1") @RequestParam Long userId) {
        // TODO: reviewService.deleteReview() 구현 후 아래 주석 제거
        // TODO: 삭제 기능 아직 없음 작업X
        // reviewService.deleteReview(reviewId, userId);
        // return ResponseEntity.ok(ApiResponse.ok("리뷰 삭제 성공"));
        return ResponseEntity.ok(ApiResponse.fail("TODO: ReviewService.deleteReview() 구현 필요"));
    }
}
