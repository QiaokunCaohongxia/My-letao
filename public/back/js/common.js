

;$(function () {
   if(location.href.indexOf("login.html") === -1) {
     $.ajax({
       type : "get",
       url : "/employee/checkRootLogin",
       dataType : "json",
       success : function (info) {
         if(info.error === 400 ) {
           location.href = "login.html";
         }
         if(info.success === true) {
           console.log("已登录");
         }
       }
     })
   }
});






;$(document).ajaxStart(function () {
    NProgress.start();
});
;$(document).ajaxStop(function () {
    setTimeout(function () {
      NProgress.done();
    },500)
})


;$(function () {
   $(".lt_aside .category").on("click",function () {
      $(".lt_aside .child").stop().slideToggle();
   });
   $(".lt_main .lt_topbar .icon_menu").on("click",function () {
      $(".lt_aside").toggleClass("current");
      $(".lt_main").toggleClass("current");
      $(".lt_main .lt_topbar").toggleClass("current");
   })
  $(".lt_main .lt_topbar .icon_logout").on("click",function () {
      $("#myModal").modal("show");
  });
   $("#logBtn").on("click",function () {
       $.ajax({
         type : "get",
         url : "/employee/employeeLogout",
         dataType : "json",
         success : function (info) {
           if(info.success === true) {
             location.href = "login.html";
           }
         }
       })
   })
});
