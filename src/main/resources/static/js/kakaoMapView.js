/*
 * 지도 표시 기능
 * */

// 스크립트 로드가 완료된 후 mapView 호출
var container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스

var options = { // 지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(37.4812845080678, 126.952713197762), // 지도의 중심좌표.
    level: 3 // 지도의 레벨(확대, 축소 정도)
};

window.map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

// 지도 타입 변경 컨트롤 생성
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도의 상단 우측에 지도 타입 변경 컨트롤 추가
window.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도에 확대 축소 컨트롤 생성
var zoomControl = new kakao.maps.ZoomControl();

// 지도의 우측에 확대 축소 컨트롤 추가
window.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);