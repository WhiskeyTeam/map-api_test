window.marker = new kakao.maps.Marker({
    // 지도 중심좌표에 마커를 생성합니다
    position: map.getCenter()
});

kakao.maps.event.addListener(window.map, 'click', function (mouseEvent) {
    console.log('지도에서 클릭한 위치의 좌표는 ' + mouseEvent.latLng.getLat() + ' 입니다!');
    console.log('지도에서 클릭한 위치의 좌표는 ' + mouseEvent.latLng.getLng() + ' 입니다!');

    window.marker.setMap(window.map);

    window.marker.setPosition(mouseEvent.latLng);
});