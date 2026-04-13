package com.human.musical_community.dto.response;

import com.human.musical_community.entity.User;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter @Builder
@Schema(description = "회원 정보 응답 DTO")
public class UserResDto {
    private Long userId;
    private String email;
    private String name;
    private boolean isAdmin;
    private LocalDate birthDate;
    private LocalDateTime createdAt;

    public static UserResDto from(User user) {
        return UserResDto.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .name(user.getName())
                .isAdmin(user.isAdmin())
                .birthDate(user.getBirthDate())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
