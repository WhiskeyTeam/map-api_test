package com.whiskey.mapapi_test.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@Slf4j
@RequestMapping("/kakao")
public class KakaoMapController {

    @GetMapping("")
    public String index() {
        return "kakaomap";
    }

    @GetMapping("/mapView")
    public String basic() {
        return "kakaoMapView";
    }
}
