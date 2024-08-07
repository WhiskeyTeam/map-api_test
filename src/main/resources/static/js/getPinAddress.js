// geocoder를 객체 생성
var geocoder = new kakao.maps.services.Geocoder();

// 클릭한 위치에 대한 주소를 표시할 인포윈도우
var infowindow = new kakao.maps.InfoWindow({zindex: 1});

// 지도를 클릭했을 때마다 클릭 위치 좌표의 주소정보를 표시하는 기능
kakao.maps.event.addListener(window.map, 'click', function (mouseEvent) {

    searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

            var content = '<div style="height: auto" class="bAddr">' + detailAddr + '</div>';

            // 인포윈도우에 클릭한 위치에 대한 상세 주소정보를 표시
            infowindow.setContent(content);

            // 인포윈도우를 지도에 마커와 함께 표시
            infowindow.open(window.map, window.marker);
        }
    });
});

function searchAddrFromCoords(coords, callback) {
    // 좌표로 주소 정보 요청
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 상세 주소 정보 요청
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}