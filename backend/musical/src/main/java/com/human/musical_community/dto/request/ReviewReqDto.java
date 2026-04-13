package com.human.musical_community.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor
@Schema(description = "리뷰 작성 요청 DTO")
public class ReviewReqDto {
    @Schema(description = "작성자 userId", example = "1")
    private Long userId;
    @Schema(description = "별점 (0.0 ~ 10.0)", example = "9.5")
    private BigDecimal rating;
    @Schema(description = "리뷰 내용", example = "정말 감동적인 공연이었습니다!")
    private String content;
}
