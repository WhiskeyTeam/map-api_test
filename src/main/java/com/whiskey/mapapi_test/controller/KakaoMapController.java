package com.whiskey.mapapi_test.controller;

import com.whiskey.libs.rest.request.RequestMethod;
import com.whiskey.libs.rest.request.RestInvoker;
import com.whiskey.mapapi_test.model.dto.RestaurantDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@Slf4j
@RequestMapping("/kakao")
public class KakaoMapController {

    @Value("${kakao.restApiKey}")
    private String restApiKey;

    @GetMapping("")
    public String index() {
        return "kakaomap";
    }

    @GetMapping("/mapView")
    public String basic() {
        return "kakaoMapView";
    }

    @GetMapping("/userLocation")
    public String userLocation() {
        return "kakaoMapUserLocation";
    }

    @GetMapping("/pinnedLocation")
    public String pinnedLocation() {
        return "kakaoMapPinnedLocation";
    }

    @GetMapping("/searchByKeyword")
    public String searchByKeyword() {
        return "kakaoMapSearchByKeyword";
    }

    @GetMapping("/getDataByApi")
    public String getDataByApi() {
        return "kakaoMapGetDataByApi";
    }

    @GetMapping("/getDataByRestApi")
    @ResponseBody
    public void getDataByRestApi(@RequestParam Map<String, String> params) throws Exception {

//        String keywordEncoded = URLEncoder.encode(params.get("keyword"), "UTF-8");
//        String apiUrl = "https://dapi.kakao.com/v2/local/search/keyword.json?" +
//                "page=1" +
//                "&size=15" +
//                "&sort=distance" +
//                "&x=" + params.get("lng") +
//                "&y=" + params.get("lat") +
//                "&radius=" + params.get("range") +
//                "&query=" + keywordEncoded;

        String apiUrl = "https://dapi.kakao.com/v2/local/search/category.json?" +
                "category_group_code=" + "FD6" +
                "&page=1" +
                "&size=15" +
                "&sort=distance" +
                "&x=" + params.get("lng") +
                "&y=" + params.get("lat") +
                "&radius=" + params.get("range");

        var invoker = new RestInvoker<>(apiUrl, RestaurantDTO.class);
        Map<String, String> headers = new HashMap<>();
        headers.put("Authorization", "KakaoAK " + this.restApiKey);
        RestaurantDTO response = invoker.request(headers, RequestMethod.GET);

        for (var document : response.getDocuments()) {
            System.out.println(document.toString());
        }
    }
}