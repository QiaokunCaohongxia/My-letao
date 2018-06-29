;$(function () {
  // var arr = ["1","2","3","4","5"];
  // var str = JSON.stringify(arr);
  // localStorage.setItem("search_list",str);
  function getHistory() {
    var history = localStorage.getItem("search_list") || "[]";
    var arr = JSON.parse(history);
    return arr;
  };
  
  function render() {
    var arr = getHistory();
    $(".lt_history").html(template("tmp", {arr: arr}));
  };
  render();
  $(".lt_history").on("click", ".clearAll", function () {
    mui.confirm("你是否要清空全部的历史记录？", "温馨提示", ["取消", "确定"], function (e) {
      if (e.index === 1) {
        localStorage.removeItem("search_list");
        render();
      }
    })
  });
  $(".lt_history").on("click", ".icon_delete", function () {
    var that = this;
    mui.confirm("你是否要删除本次历史记录", "温馨提示", ["取消", "确定"], function (e) {
      if (e.index === 1) {
        var arr = getHistory();
        arr.splice($(that).data("index"), 1);
        localStorage.setItem("search_list", JSON.stringify(arr));
        render();
      }
    })
  });
  $(".search_btn").on("click", function () {
    var value = $(".search_input").val();
    if (!value) {
      mui.toast("请输入关键字");
      return;
    }
    var arr = getHistory();
    var index = arr.indexOf(value);
    if(index > -1) {
      arr.splice(index,1);
    }
    if (arr.length >= 10) {
      arr.pop();
    }
    arr.unshift(value);
    var str = JSON.stringify(arr);
    localStorage.setItem("search_list", str);
    render();
    $(".search_input").val("");
    location.href = "searchList.html?key=" + value;
  })
  
});
