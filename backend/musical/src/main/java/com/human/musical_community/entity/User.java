package com.human.musical_community.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 회원 엔티티
 * [베이스 공통] userId, email, password, name, isAdmin, createdAt
 * [1조 추가]   birthDate - 생년월일
 */
@Entity
@Table(name = "users")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder @ToString(exclude = "password")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false, unique = true, length = 200)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(name = "is_admin")
    @Builder.Default
    private int isAdmin = 0;

    // ===== 1조 추가 필드 =====
    @Column(name = "birth_date")
    private LocalDate birthDate;  // 생년월일

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
