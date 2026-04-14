package com.human.musical_community;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MusicalCommunityApplication {
    public static void main(String[] args) {
        SpringApplication.run(MusicalCommunityApplication.class, args);
    }
}
