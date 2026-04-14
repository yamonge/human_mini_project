package com.human.musical_community.service;

import com.human.musical_community.dto.kopis.*;
import com.human.musical_community.entity.Musical;
import com.human.musical_community.entity.enums.MusicalStatus;
import com.human.musical_community.repository.MusicalRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
@RequiredArgsConstructor
public class KopisService {
    private final RestTemplate restTemplate;
    private final MusicalRepository musicalRepository;

    @Value("${kopis.api.key}")
    private String apiKey;

    @Value("${kopis.api.base-url}")
    private String baseUrl;

    public void fetchAndSaveMusicals(){
        String url = baseUrl + "/pblprfr?service=" + apiKey + "&stdate=20260101&eddate=20261231&shcate=GGGA&rows=50&cpage=1";

        KopisPerformanceItemList itemList = restTemplate.getForObject(url, KopisPerformanceItemList.class);

        for(KopisPerformanceItem item : itemList.getItems()){
            String detailUrl = baseUrl + "/pblprfr/" + item.getMt20id() + "?service=" + apiKey;
            KopisPerformanceDetailList detailList = restTemplate.getForObject(detailUrl, KopisPerformanceDetailList.class);
            KopisPerformanceDetail detail = detailList.getKopisDetailList().get(0);

            String facilityUrl = baseUrl + "/prfplc/" + detail.getMt10id() + "?service=" + apiKey;
            KopisFacilityDetailList facilityList = restTemplate.getForObject(facilityUrl, KopisFacilityDetailList.class);
            KopisFacilityDetail facility = facilityList.getKopisSubDetailList().get(0);

            Musical musical = Musical.builder()
                    .title(detail.getPrfnm())
                    .startDate(LocalDate.parse(detail.getPrfpdfrom(), DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                    .endDate(LocalDate.parse(detail.getPrfpdto(), DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                    .venue(detail.getFcltynm())
                    .crew(detail.getPrfcrew())
                    .runtime(detail.getPrfruntime())
                    .ageLimit(detail.getPrfage())
                    .posterUrl(detail.getPoster())
                    .synopsis(detail.getSty())
                    .showTime(detail.getDtguidance())
                    .status(MusicalStatus.fromKopis(detail.getPrfstate()))
                    .address(facility.getAdres())
                    .latitude(BigDecimal.valueOf(facility.getLa()))
                    .longitude(BigDecimal.valueOf(facility.getLo()))
                    .build();
            musicalRepository.save(musical);
        }
    }

    @Scheduled(cron = "0 0 13 * * *")
    public void scheduleFetch(){
        log.info("===== KOPIS 데이터 동기화 시작 =====");
        fetchAndSaveMusicals();
        log.info("===== KOPIS 데이터 동기화 완료 =====");
    }

}
