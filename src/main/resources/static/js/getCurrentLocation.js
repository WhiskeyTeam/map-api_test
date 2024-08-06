var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

window.map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

/*
 * 지정한 위치에 마킹과 인포윈도우를 표시
 * */
function displayMarkerCurrentLocation(map, locPosition, message) {

    var imageSrc = '//t1.daumcdn.net/localimg/localimages/07/2018/mw/m640/ico_marker.png', // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(30, 30), // 마커이미지의 크기입니다
        imageOption = {offset: new kakao.maps.Point(15, 15)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
        image: markerImage
    });

    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({
        content: message,
    });

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker);

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition);
}

/*
* 실시간으로 사용자의 위치를 조회
* 반환 : 위도, 경도
* */
function currentLocation(map) {
    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
    if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(
            function (position) {

                var lat = position.coords.latitude,  // 위도
                    lng = position.coords.longitude; // 경도

                window.presentLocation = new kakao.maps.LatLng(lat, lng);
                var message = '<div style="padding:5px;">현위치</div>'; // 인포윈도우에 표시할 내용

                displayMarkerCurrentLocation(map, window.presentLocation, message);
            },
            function (err) {
                console.warn('ERROR(' + err.code + '): ' + err);
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );

    } else {
        console.log('현재 위치를 알 수 없어 기본 위치로 이동합니다.');
        var locPosition = new kakao.maps.LatLng(37.4812845080678, 126.952713197762),
            message = '현재 위치를 알 수 없어 기본 위치로 이동합니다.';

        displayMarkerCurrentLocation(locPosition, message);
    }
}

currentLocation(window.map);