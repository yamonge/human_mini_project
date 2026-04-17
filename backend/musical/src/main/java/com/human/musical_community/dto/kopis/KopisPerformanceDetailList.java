package com.human.musical_community.dto.kopis;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.Data;

import java.util.List;

@Data
@JacksonXmlRootElement(localName = "dbs")
@JsonIgnoreProperties(ignoreUnknown = true)
public class KopisPerformanceDetailList {
    @JacksonXmlElementWrapper(useWrapping = false)
    @JsonProperty("db")
    private List<KopisPerformanceDetail> kopisDetailList;
}
