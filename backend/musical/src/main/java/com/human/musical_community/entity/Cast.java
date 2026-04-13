package com.human.musical_community.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * 출연진 엔티티
 * Musical(N:1) 관계
 *
 * TODO: CastService 메서드를 구현하세요.
 */
@Entity
@Table(name = "casts")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder @ToString
public class Cast {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cast_id")
    private Long castId;

    // 소속 뮤지컬 (N:1)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "musical_id", nullable = false)
    private Musical musical;

    @Column(name = "cast_name", nullable = false, length = 100)
    private String castName;            // 배우 이름

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() { this.createdAt = LocalDateTime.now(); }
}
