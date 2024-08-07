// 검색한 장소들의 위치를 표시할 마커
var markers = [];

// 사용자의 현재 위치
var presentLocation = window.presentLocation;

// 장소 검색 객체 생성
var ps = new kakao.maps.services.Places(window.map);

// 음식점 정보를 보여줄 인포윈도우
var infowindow = new kakao.maps.InfoWindow({zIndex: 1});

// 검색 form
const keywordForm = document.getElementById('keywordForm');

// submit 버튼 클릭 시 장소 검색 기능 수행
keywordForm.addEventListener('submit', function (e) {

    // 창 새로고침 방지
    e.preventDefault();

    // 장소 검색
    searchPlaces();
})

// 장소 검색
function searchPlaces() {
    // 키워드 값
    var keyword = document.getElementById('keyword').value;

    // 키워드를 입력하지 않은 경우
    if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
    }

    // 검색 범위 설정
    var options = {
        bounds: window.map.getBounds(),
    }

    // 장소 검색
    ps.keywordSearch(keyword, placesSearchCB, options);
}

function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 표시
        displayPlaces(data);

        // 검색 결과가 많은 경우 페이징 처리
        // displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
    } else if (status === kakao.maps.service.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
    }
}

// 장소 표시
function displayPlaces(places) {
    var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = window.circle === null ? window.map.getBounds() : window.circle.getBounds(),
        listStr = '';

    console.log("bounds : " + bounds + ", window.map.getBounds() : " + window.map.getBounds());

    removeAllChildNods(listEl);

    removeMarker();

    var dist = document.getElementById('range').value;

    for (var i = 0; i < places.length; i++) {

        if (checkInsideCircle(window.circle.getPosition(), places[i], dist)) { // 검색 결과 중 원 내부의 결과만 표시
            const lng = places[i].x;
            const lat = places[i].y;

            var placePosition = new kakao.maps.LatLng(lat, lng),
                marker = addMarker(placePosition, i),
                itemEl = getListItem(i, places[i]);

            (function (marker, title) {
                kakao.maps.event.addListener(marker, 'mouseover', function () {
                    displayInfowindow(marker, title);
                });
                kakao.maps.event.addListener(marker, 'mouseout', function () {
                    infowindow.close();
                });
                itemEl.onmouseover = function () {
                    displayInfowindow(marker, title);
                }
                itemEl.onmouseout = function () {
                    infowindow.close();
                }
            })(marker, places[i].place_name);

            (function (marker, title) {
                kakao.maps.event.addListener(marker, 'click', function () {
                    searchDetailAddrFromCoords(presentPosition, function (result, status) {
                        if (status === kakao.maps.services.Status.OK) {
                            detailAddr = !!result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
                            location.href = "https://map.kakao.com/?sName=" + detailAddr + "&eName=" + title
                        }
                    });
                })

                itemEl.onclick = function () {
                    searchDetailAddrFromCoords(presentPosition, function (result, status) {
                        if (status === kakao.maps.services.Status.OK) {
                            detailAddr = !!result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
                            location.href = "https://map.kakao.com/?sName=" + detailAddr + "&eName=" + title
                        }
                    });
                };
            })(marker, places[i].place_name);

            fragment.appendChild(itemEl);
        }
    }

    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    map.setBounds(bounds);
}

function getListItem(index, places) {

    var el = document.createElement('li'),
        itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
            '<div class="info">' +
            '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
            '   <span class="jibun gray">' + places.address_name + '</span>';
    } else {
        itemStr += '    <span>' + places.address_name + '</span>';
    }

    itemStr += '  <span class="tel">' + places.phone + '</span>' +
        '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png',
        imageSize = new kakao.maps.Size(36, 37), // 마커 이미지 크기
        imgOptions = {
            spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage
        });

    marker.setMap(map); // 지도 위에 마커 표시
    markers.push(marker);  // 마커 배열에 새로 생성된 마커 추가

    return marker;
}

// 지도 위의 모든 마커 제거
function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

// 검색결과 목록 하단에 페이지번호 표시
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment();

    // 기존의 페이지번호 삭제
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild(paginationEl.lastChild);
    }

    for (var i = 1; i <= pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;
        el.style = 'margin: 10px';

        if (i === pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function (i) {
                return function () {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 인포윈도우에 장소명 표시
function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

// 검색결과 목록의 자식 요소 제거
function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}

// 좌표를 주소로 변환하기 위한 geocoder 객체 생성
var geocoder = new kakao.maps.services.Geocoder();

// 좌표를 주소로 변환
function searchDetailAddrFromCoords(coords, callback) {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 생성된 원의 중심과 핀의 거리를 측정하여 원의 내부에 있는지 확인
function checkInsideCircle(centerCoords, pinCoords, dist) {

    if (dist == 0) {
        return true;
    }

    // 원 중앙의 좌표
    var c_lat = centerCoords.getLat();
    var c_lng = centerCoords.getLng();

    // 핀의 좌표
    var p_lat = pinCoords.y;
    var p_lng = pinCoords.x;

    // 지구의 반지름
    var R = 6371e3;

    // 좌표를 라디안으로 변경
    var c_lat_rad = c_lat * Math.PI / 180;
    var c_lng_rad = c_lng * Math.PI / 180;

    var p_lat_rad = p_lat * Math.PI / 180;
    var p_lng_rad = p_lng * Math.PI / 180;

    var degree = Math.acos(
        Math.sin(c_lat_rad) * Math.sin(p_lat_rad)
        + Math.cos(c_lat_rad) * Math.cos(p_lat_rad) * Math.cos(Math.abs(c_lng_rad - p_lng_rad))
    );

    var distance = Math.abs(degree * R);

    if (distance > dist) {
        return false;
    } else {
        return true;
    }
}