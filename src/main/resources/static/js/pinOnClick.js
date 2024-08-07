window.marker = new kakao.maps.Marker({
    // 지도 중심좌표에 마커 생성
    position: map.getCenter()
});

// 지도를 클릭했을 때마다 클릭 위치 좌표의 위도, 경도를 알려주는 기능
kakao.maps.event.addListener(window.map, 'click', function (mouseEvent) {
    console.log('지도에서 클릭한 위치의 위도는 ' + mouseEvent.latLng.getLat() + ' 입니다!');
    console.log('지도에서 클릭한 위치의 경도는 ' + mouseEvent.latLng.getLng() + ' 입니다!');

    window.marker.setMap(window.map);

    window.marker.setPosition(mouseEvent.latLng);
});