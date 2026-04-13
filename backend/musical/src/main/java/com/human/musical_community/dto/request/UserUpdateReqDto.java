package com.human.musical_community.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateReqDto {

    private String name;
    private String password;
}