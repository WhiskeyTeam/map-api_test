/*
 * 참고자료 - NAVER CLOUD PLATFORM - NAVER Map's Enterprise API 지도 예제
 * 링크 : https://navermaps.github.io/maps.js.ncp/docs/tutorial-digest.example.html
 */

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

    // 핀 표시된 장소의 위치정보를 모두 저장
    var markerList = [];

    // 지도를 클릭할 경우, 해당 위치에 핀이 표시되고 이는 저장되어 누적된다.
    naver.maps.Event.addListener(map, 'click', function (e) {
        // 핀 표시
        var marker = new naver.maps.Marker({
            position: e.coord,
            map: map
        });

        // 표시된 핀의 위도와 경도를 누적해서 보여준다.
        $('#pined_list tbody')[0].append(document.createElement('tr'));
        $('#pined_list tbody tr:last-child')[0].append(document.createElement('th'));
        $('#pined_list tbody tr:last-child th:last-child')[0].append(e.coord._lat);
        $('#pined_list tbody tr:last-child')[0].append(document.createElement('th'));
        $('#pined_list tbody tr:last-child th:last-child')[0].append(e.coord._lng);

        // 추가된 핀의 정보를 리스트에 넣어준다.
        markerList.push(marker);

        console.log(markerList);
    });

    // 핀의 옵션 지정
    // 핀의 클릭 영역을 지정
    // var markerOptions = {
    //     position: position,
    //     map: map,
    //     shape: {
    //         coords: [11, 0, 9, 0, 6, 1, 4, 2, 2, 4,
    //             0, 8, 0, 12, 1, 14, 2, 16, 5, 19,
    //             5, 20, 6, 23, 8, 26, 9, 30, 9, 34,
    //             13, 34, 13, 30, 14, 26, 16, 23, 17, 20,
    //             17, 19, 20, 16, 21, 14, 22, 12, 22, 12,
    //             22, 8, 20, 4, 18, 2, 16, 1, 13, 0],
    //         type: 'poly'
    //     }
    // };

    // 모든 핀 제거 및 리스트 초기화
    $('#erase_pinned_list')[0].addEventListener('click', function () {

        for (let i = 0; i < markerList.length; i++) {
            markerList[i].setMap(null);
        }
        markerList = [];

        $('#pined_list tbody')[0].innerHTML = "";
        $('#pined_list tbody')[0].append(document.createElement('tr'));
        $('#pined_list tbody tr:last-child')[0].append(document.createElement('th'));
        $('#pined_list tbody tr:last-child th:last-child')[0].append("위도");
        $('#pined_list tbody tr:last-child')[0].append(document.createElement('th'));
        $('#pined_list tbody tr:last-child th:last-child')[0].append("경도");
    })
});

