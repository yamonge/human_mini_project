package com.human.musical_community.entity;

import com.human.musical_community.entity.enums.MusicalStatus;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 뮤지컬 엔티티
 *
 * TODO: 아래 필드들을 참고해서 MusicalService의 메서드를 구현하세요.
 */
@Entity
@Table(name = "musicals")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder @ToString
public class Musical {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "musical_id")
    private Long musicalId;

    @Column(nullable = false, length = 200)
    private String title;               // 뮤지컬 제목

    @Lob
    private String synopsis;            // 줄거리

    @Column(precision = 3, scale = 1)
    @Builder.Default
    private BigDecimal rating = BigDecimal.ZERO;  // 평균 별점

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;        // 공연 시작일

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;          // 공연 종료일

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MusicalStatus status;       // 공연중 / 공연예정 / 공연완료

    @Column(length = 200)
    private String venue;               // 공연장 이름

    @Column(length = 500)
    private String crew;                // 제작진

    @Column(length = 50)
    private String runtime;             // 공연 시간 (예: 150분)

    @Column(name = "age_limit", length = 50)
    private String ageLimit;            // 관람 연령 제한

    @Column(name = "poster_url", length = 512)
    private String posterUrl;           // 포스터 이미지 URL

    @Column(name = "intro_img_1", length = 512)
    private String introImg1;

    @Column(name = "intro_img_2", length = 512)
    private String introImg2;

    @Column(name = "intro_img_3", length = 512)
    private String introImg3;

    @Column(name = "intro_img_4", length = 512)
    private String introImg4;

    @Column(name = "show_time", length = 200)
    private String showTime;            // 공연 시간표 (예: 화~금 19:30)

    @Column(precision = 10, scale = 7)
    private BigDecimal latitude;        // 위도

    @Column(precision = 10, scale = 7)
    private BigDecimal longitude;       // 경도

    @Column(length = 300)
    private String address;             // 공연장 주소

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() { this.createdAt = LocalDateTime.now(); }
}
