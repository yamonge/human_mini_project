package com.human.musical_community.service;

import com.human.musical_community.dto.kopis.*;
import com.human.musical_community.entity.Musical;
import com.human.musical_community.entity.enums.MusicalStatus;
import com.human.musical_community.repository.MusicalRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
        int cpage = 1;
        int rows = 100;
        String stdate = "20260101";
        String eddate = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));

        while(true){
            try{
                String url = baseUrl + "/pblprfr?service=" + apiKey
                        + "&stdate=" + stdate
                        + "&eddate=" + eddate
                        + "&shcate=GGGA&rows=" + rows
                        + "&cpage=" +  cpage;

                KopisPerformanceItemList itemList = restTemplate.getForObject(url, KopisPerformanceItemList.class);

                if(itemList == null || itemList.getItems() == null || itemList.getItems().isEmpty()){
                    log.warn("KOPIS 목록 응답이 비어 있습니다.");
                    break;
                }

                for(KopisPerformanceItem item : itemList.getItems()){
                    try{
                        Thread.sleep(500);

                        if(musicalRepository.existsByKopisId(item.getMt20id())){
                            log.info("이미 존재하는 공연 skip: {}", item.getMt20id());
                            continue;
                        }

                        String detailUrl = baseUrl + "/pblprfr/" + item.getMt20id() + "?service=" + apiKey;
                        KopisPerformanceDetailList detailList = restTemplate.getForObject(detailUrl, KopisPerformanceDetailList.class);
                        KopisPerformanceDetail detail = detailList.getKopisDetailList().get(0);

                        String facilityUrl = baseUrl + "/prfplc/" + detail.getMt10id() + "?service=" + apiKey;
                        KopisFacilityDetailList facilityList = restTemplate.getForObject(facilityUrl, KopisFacilityDetailList.class);
                        KopisFacilityDetail facility = facilityList.getKopisSubDetailList().get(0);

                        List<String> imgs = detail.getStyurl();

                        Musical musical = Musical.builder()
                                .title(detail.getPrfnm())
                                .kopisId(item.getMt20id())
                                .startDate(LocalDate.parse(detail.getPrfpdfrom(), DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                                .endDate(LocalDate.parse(detail.getPrfpdto(), DateTimeFormatter.ofPattern("yyyy.MM.dd")))
                                .venue(detail.getFcltynm())
                                .crew(detail.getPrfcrew())
                                .casts(detail.getPrfcast())
                                .runtime(detail.getPrfruntime())
                                .ageLimit(detail.getPrfage())
                                .posterUrl(detail.getPoster())
                                .synopsis(detail.getSty())
                                .showTime(detail.getDtguidance())
                                .status(MusicalStatus.fromKopis(detail.getPrfstate()))
                                .address(facility.getAdres())
                                .latitude(BigDecimal.valueOf(facility.getLa()))
                                .longitude(BigDecimal.valueOf(facility.getLo()))
                                .introImg1(imgs != null && imgs.size() > 0 ? imgs.get(0) : null)
                                .introImg2(imgs != null && imgs.size() > 1 ? imgs.get(1) : null)
                                .introImg3(imgs != null && imgs.size() > 2 ? imgs.get(2) : null)
                                .introImg4(imgs != null && imgs.size() > 3 ? imgs.get(3) : null)
                                .build();
                        musicalRepository.save(musical);

                    }catch(Exception e){
                        log.error("공연 처리 실패 [{}]: {}", item.getMt20id(), e.getMessage());
                    }
                }

                if (itemList.getItems().size() < rows) {
                    break;  // 마지막 페이지
                }

                cpage++;
            }catch(Exception e){
                log.error("KOPIS 페이지 {} 조회 실패: {}", cpage, e.getMessage());
                break;
            }

        }
    }

//    @PostConstruct
//    public void init() {
//        try {
//            log.info("===== 서버 시작 - KOPIS 초기 데이터 동기화 =====");
//            fetchAndSaveMusicals();
//            log.info("===== KOPIS 초기 데이터 동기화 완료 =====");
//        } catch (Exception e) {
//            log.error("초기 동기화 실패 (서버는 정상 시작): {}", e.getMessage());
//        }
//    }
    @Scheduled(cron = "0 0 13 * * *")

    public void scheduleFetch() {
        try {
            log.info("===== KOPIS 데이터 동기화 시작 =====");
            fetchAndSaveMusicals();
            log.info("===== KOPIS 데이터 동기화 완료 =====");
        } catch (Exception e) {
            log.error("스케줄 동기화 실패: {}", e.getMessage());
        }
    }

}
