// 카카오맵 api키를 불러옴
function getConfig() {

    var result;

    $.ajax({
        url: '/kakao-api-key',
        async: false,
        type: 'get',
        success: function (data) {
            result = data;
        },
        error: function () {
            console.log("cannot get key from server.");
        }
    });

    return result;
}

// html에 카카오 api키가 적용된 카카오 api script를 추가
function setApiConfig(key) {
    return new Promise(() => {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=' + key + '&autoload=false&libraries=services,clusterer,drawing';
        document.head.prepend(script);
    });
}

setApiConfig(getConfig());