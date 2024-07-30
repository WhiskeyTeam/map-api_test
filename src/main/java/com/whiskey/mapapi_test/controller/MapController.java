package com.whiskey.mapapi_test.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Slf4j
public class MapController {

    // 이거 이렇게 매핑 안해주면 yml의 값을 불러오지 못함. mapping만 해줘도 됨
    @GetMapping("")
    public String index() {
        return "../static/index";
    }
}
