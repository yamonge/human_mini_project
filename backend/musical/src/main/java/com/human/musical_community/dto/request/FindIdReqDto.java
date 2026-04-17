package com.human.musical_community.dto.request;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FindIdReqDto {
    private String name;
    private LocalDate birthDate;
}
