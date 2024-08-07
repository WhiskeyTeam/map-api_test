package com.whiskey.mapapi_test.model.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class RestaurantDTO {
    private Object meta;
    private List<DocsDTO> documents = new ArrayList<>();
}