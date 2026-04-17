package com.human.musical_community.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Data
public class FindIdResDto {
    private String email;
    private LocalDateTime createdAt;
}
