package com.human.musical_community.dto.request;

import com.human.musical_community.entity.enums.MusicalStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.math.BigDecimal;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor
@Schema(description = "뮤지컬 등록/수정 요청 DTO")
public class MusicalReqDto {
    @Schema(example = "레미제라블")
    private String title;
    @Schema(example = "프랑스 혁명을 배경으로 한 감동적인 뮤지컬")
    private String synopsis;
    @Schema(example = "2026-05-01")
    private LocalDate startDate;
    @Schema(example = "2026-08-31")
    private LocalDate endDate;
    @Schema(example = "공연중")
    private MusicalStatus status;
    @Schema(example = "블루스퀘어 신한카드홀")
    private String venue;
    @Schema(example = "연출: 홍길동")
    private String crew;
    @Schema(example = "170분 (인터미션 20분 포함)")
    private String runtime;
    @Schema(example = "만 8세 이상")
    private String ageLimit;
    @Schema(example = "https://example.com/poster.jpg")
    private String posterUrl;
    private String introImg1;
    private String introImg2;
    private String introImg3;
    private String introImg4;
    @Schema(example = "화~금 19:30 / 토 14:00, 19:00 / 일 14:00")
    private String showTime;
    @Schema(example = "37.5100")
    private BigDecimal latitude;
    @Schema(example = "127.0200")
    private BigDecimal longitude;
    @Schema(example = "서울특별시 용산구 이태원로 294")
    private String address;
}
