package com.human.musical_community.entity.enums;

public enum MusicalStatus {
    공연중, 공연예정, 공연완료;

    public static MusicalStatus fromKopis(String state){
        return MusicalStatus.valueOf(state);
    }
}
