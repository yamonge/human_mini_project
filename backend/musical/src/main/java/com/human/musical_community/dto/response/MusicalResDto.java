package com.human.musical_community.dto.response;

import com.human.musical_community.entity.Musical;
import com.human.musical_community.entity.enums.MusicalStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter @Builder
@Schema(description = "뮤지컬 정보 응답 DTO")
public class MusicalResDto {
    private Long musicalId;
    private String title;
    private String synopsis;
    private BigDecimal rating;
    private LocalDate startDate;
    private LocalDate endDate;
    private MusicalStatus status;
    private String venue;
    private String crew;
    private String casts;
    private String runtime;
    private String ageLimit;
    private String posterUrl;
    private String introImg1;
    private String introImg2;
    private String introImg3;
    private String introImg4;
    private String showTime;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String address;
    private LocalDateTime createdAt;

    public static MusicalResDto from(Musical m) {
        return MusicalResDto.builder()
                .musicalId(m.getMusicalId())
                .title(m.getTitle())
                .synopsis(m.getSynopsis())
                .rating(m.getRating())
                .startDate(m.getStartDate())
                .endDate(m.getEndDate())
                .status(m.getStatus())
                .venue(m.getVenue())
                .crew(m.getCrew())
                .casts(m.getCasts())
                .runtime(m.getRuntime())
                .ageLimit(m.getAgeLimit())
                .posterUrl(m.getPosterUrl())
                .introImg1(m.getIntroImg1())
                .introImg2(m.getIntroImg2())
                .introImg3(m.getIntroImg3())
                .introImg4(m.getIntroImg4())
                .showTime(m.getShowTime())
                .latitude(m.getLatitude())
                .longitude(m.getLongitude())
                .address(m.getAddress())
                .createdAt(m.getCreatedAt())
                .build();
    }
}
