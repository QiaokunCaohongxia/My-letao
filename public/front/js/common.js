


;$(function () {
  //获得slider插件对象
  var gallery = mui('.mui-slider');
  gallery.slider({
    interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
  });
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false,
  });
});


function getSearch(name) {
    var str = location.search;
    str = decodeURI(str);
    str = str.slice(1);
    var arr = str.split("&");
    var obj = {};
    arr.forEach(function (ele) {
        var key = ele.split("=")[0];
        var value = ele.split("=")[1];
        obj[key] = value;
    });
    return obj[name];
}


