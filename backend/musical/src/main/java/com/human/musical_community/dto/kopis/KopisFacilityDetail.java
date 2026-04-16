package com.human.musical_community.dto.kopis;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class KopisFacilityDetail {
    private String mt20id;
    private String adres;
    private double la;
    private double lo;
}
