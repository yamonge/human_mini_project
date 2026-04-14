package com.human.musical_community.dto.kopis;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class KopisPerformanceItem {
    private String mt20id;
    private String genrenm;
}
