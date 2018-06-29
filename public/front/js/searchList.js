








;$(function () {
   var key = getSearch("key");
   $(".search_input").val(key);
   render();
   function render() {
     var key = $(".search_input").val();
     var params = {};
     params.proName = key;
     params.page = 1;
     params.pageSize = 100;
     var $current = $(".lt_sort .current");
     if($current.length > 0 ){
       var sortName = $current.data("type");
       var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
       params[sortName] = sortValue;
     }
     $.ajax({
       type : "get",
       url : "/product/queryProduct",
       data : params,
       dataType : "json",
       success : function (info) {
         $(".lt_product").html(template("tpl",info));
       }
     });
   };
   $(".search_btn").on("click",function () {
       var key = $(".search_input").val();
       if(!key){
         mui.toast("请输入搜索关键字");
         return;
       }
       var str = localStorage.getItem("search_list") || "[]";
       var arr = JSON.parse(str);
       var index = arr.indexOf(key);
       if(index > -1) {
         arr.splice(index,1);
       }
       if(arr.length >= 10 ){
         arr.pop();
       }
       arr.unshift(key);
       str = JSON.stringify(arr);
       localStorage.setItem("search_list",str);
       render();
   });
   $(".lt_sort a[data-type]").on("click",function () {
       if($(this).hasClass("current")){
         $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
       }else{
         $(this).addClass("current").siblings().removeClass("current");
       }
       render();
   })
});