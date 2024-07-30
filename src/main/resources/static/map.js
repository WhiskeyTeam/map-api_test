// 지도 api를 불러오기 전에 코드들이 수행되면 ready 조건 밖의 코드들이 수행이 안되는 현상이 있음
// 해결법 유무는 찾아봐야함
$(document).ready(function () {

    // 지도 표시 기능
    var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.5112, 127.0981), // 잠실 롯데월드를 중심으로 하는 지도 -> 설정된 좌표를 중심으로 지도 렌더링
        zoom: 15 // 확대 정도
    });

    // 지도상에 핀을 찍는 기능
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5112, 127.0981), // 위에서 설정한 바와 같이 처음 렌더링되는 지도의 중앙인 잠실 롯데월드에 핀을 찍음
        map: map
    });

    // map.center는 위도와 경도 값을 가지고 있음 -> 위도 = _lat, 경도 = _lng
    document.getElementById('checkBtn').addEventListener('click', function () {
        alert("위도 : " + map.center._lat + "  " + "경도 : " + map.center._lng);
    });

    // 지도를 이동할 때마다 지도 중앙의 좌표를 표시하는 기능
    naver.maps.Event.addListener(map, 'drag', function (e) {
        $('#center tr:nth-child(2) th')[0].textContent = map.center._lat;
        $('#center tr:nth-child(2) th')[1].textContent = map.center._lng;
    });
});

