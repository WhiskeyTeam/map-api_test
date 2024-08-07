// 범위 표시 사용 여부 확인을 위한 checkbox
var rangeCheckBox = document.getElementById('rangeCheckBox');

// 설정한 범위의 반경 값
var rangeValue = document.getElementById('rangeValue');

// 범위를 설정하는 슬라이더
var range = document.getElementById('range');

// 지도에 표시할 원 생성
window.circle = new kakao.maps.Circle({});

// checkbox의 값이 변경될 때마다 슬라이더 사용 가능 여부를 변경
rangeCheckBox.addEventListener('click', (event) => {
    if (event.currentTarget.checked) {
        range.disabled = false;
    } else {
        if (window.circle.getMap()) {
            window.circle.setMap(null);
        }

        range.value = 0;
        rangeValue.textContent = 0;
        range.disabled = true;
    }
})

// 범위가 변경될 때마다 범위 값과 범위를 표시하는 원의 크기 변경
range.addEventListener('input', function () {

    // 범위를 km 단위로 변환
    rangeValue.textContent = range.value / 1000;

    // 범위 checkbox가 설정된 상태인 경우에만 범위 설정 가능
    if (rangeCheckBox.checked) {

        if (window.circle.getMap()) {
            window.circle.setMap(null);
        }

        // 원의 설정 변경
        window.circle.setOptions({
            center: window.presentLocation,
            radius: range.value,
            strokeWeight: 5,
            strokeColor: '#FF0000',
            strokeOpacity: 1,
            strokeStyle: 'solid',
            fillColor: '#FF0000',
            fillOpacity: 0.2
        })

        // 지도에 윈을 표시
        window.circle.setMap(window.map);
    }
});