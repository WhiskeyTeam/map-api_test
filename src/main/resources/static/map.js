// 지도 api를 불러오기 전에 코드들이 수행되면 ready 조건 밖의 코드들이 수행이 안되는 현상이 있음
// 해결법 유무는 찾아봐야함
$(document).ready(function () {
    var map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(37.5112, 127.0981), // 잠실 롯데월드를 중심으로 하는 지도
        zoom: 15
    });

    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(37.5112, 127.0981),
        map: map
    });

    document.getElementById('checkBtn').addEventListener('click', function () {
        alert("위도 : " + map.center._lat + "  " + "경도 : " + map.center._lng);
    });

    naver.maps.Event.addListener(map, 'drag', function (e) {
        $('#center tr:nth-child(2) th')[0].textContent = map.center._lat;
        $('#center tr:nth-child(2) th')[1].textContent = map.center._lng;
    });
});

