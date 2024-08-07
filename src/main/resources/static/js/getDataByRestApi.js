var restApiData = document.getElementById('restApiData');

var getDataBtn = document.getElementById('getDataBtn');

var range = document.getElementById('range');

getDataBtn.addEventListener('click', function (e) {

    e.preventDefault();

    var searchData = {
        'keyword': '음식점',
        'lat': window.marker.getPosition().getLat(),
        'lng': window.marker.getPosition().getLng(),
        'range': range.value
    }

    console.log(searchData);

    $.ajax({
        url: '/kakao/getDataByRestApi',
        type: 'GET',
        data: searchData,
        success: function () {
            console.log("성공!!");
        },
        error: function () {
            console.log("실패!!");
        }
    })
})

