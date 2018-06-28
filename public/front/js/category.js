


;$(function () {
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    dataType:"json",
    success:function (info) {
      $(".lt_category_left ul").html(template("tpl",info));
      renderSecondById(info.rows[0].id);
    }
  });
  function renderSecondById(id) {
      $.ajax({
        type:"get",
        url:"/category/querySecondCategory",
        data : {
          id : id
        },
        dataType: "json",
        success : function (info) {
          $(".lt_category_right ul").html(template("tmp",info));
        }
      })
  }
  $(".lt_category_left ul").on("click","a",function () {
    var id = $(this).data("id");
    renderSecondById(id);
    $(this).addClass("current").parent().siblings().find("a").removeClass("current");
  })
});