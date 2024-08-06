var rangeCheckBox = document.getElementById('rangeCheckBox');
var rangeValue = document.getElementById('rangeValue');
var range = document.getElementById('range');

// 지도에 표시할 원 생성
window.circle = new kakao.maps.Circle({});

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

range.addEventListener('input', function () {
    rangeValue.textContent = range.value / 1000;

    if (rangeCheckBox.checked) {
        if (window.circle.getMap()) {
            window.circle.setMap(null);
        }

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

        window.circle.setMap(window.map);
    }
});


