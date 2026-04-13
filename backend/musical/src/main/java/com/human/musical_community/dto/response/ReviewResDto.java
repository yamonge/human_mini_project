package com.human.musical_community.dto.response;

import com.human.musical_community.entity.Review;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter @Builder
@Schema(description = "리뷰 응답 DTO")
public class ReviewResDto {
    private Long reviewId;
    private Long musicalId;
    private String musicalTitle;
    private Long userId;
    private String userName;
    private BigDecimal rating;
    private String content;
    private LocalDateTime createdAt;

    public static ReviewResDto from(Review r) {
        return ReviewResDto.builder()
                .reviewId(r.getReviewId())
                .musicalId(r.getMusical().getMusicalId())
                .musicalTitle(r.getMusical().getTitle())
                .userId(r.getUser().getUserId())
                .userName(r.getUser().getName())
                .rating(r.getRating())
                .content(r.getContent())
                .createdAt(r.getCreatedAt())
                .build();
    }
}
