package com.human.musical_community.dto.kopis;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class KopisPerformanceDetail {
    private String mt10id;
    private String prfnm;
    private String prfpdfrom;
    private String prfpdto;
    private String fcltynm;
    private String prfcast;
    private String prfcrew;
    private String prfruntime;
    private String prfage;
    private String poster;
    private String sty;
    private String area;
    private String prfstate;
    private String dtguidance;
    @JacksonXmlElementWrapper(localName = "styurls")
    @JsonProperty("styurl")
    private List<String> styurl;
}
