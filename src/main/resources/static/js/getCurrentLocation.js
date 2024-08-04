window.onload = function () {
    kakao.maps.load(function () {

        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        /*
         * 지정한 위치에 마킹과 인포윈도우를 표시
         * */
        function displayMarker(map, locPosition, message) {
            // 지도 중심좌표를 접속위치로 변경합니다
            // map.setCenter(locPosition);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: locPosition,
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

                        var currentLocation = new kakao.maps.LatLng(lat, lng);
                        var message = '<div style="padding:5px;">현위치</div>'; // 인포윈도우에 표시할 내용

                        displayMarker(map, currentLocation, message);
                        // displayMarker(position, message);
                    },
                    function () {
                        console.warn('ERROR(' + err.code + '): ' + err.message);
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

                displayMarker(locPosition, message);
            }
        }

        currentLocation(map);
    });
}
