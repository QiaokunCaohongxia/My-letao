


;$(function () {
  var currentPage = 1;
  var pageSize = 5;
  var currentId;
  var isDelete;
   function render() {
     $.ajax({
       type : "get",
       url : "/user/queryUser",
       data : {
         page : currentPage,
         pageSize : pageSize
       },
       dataType : "json",
       success : function (info) {
         $("tbody").html(template("tmp",info));
         $("#paginator").bootstrapPaginator({
           bootstrapMajorVersion : 3,
           totalPages : Math.ceil(info.total/info.size),
           currentPage : info.page,
           onPageClicked : function (a,b,c,page) {
             currentPage = page;
             render();
           }
         })
       }
     })
   }
   render();
   $("tbody").on("click",".btn",function () {
       $("#updateModal").modal("show");
       currentId = $(this).parent().data("id");
       isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
   });
   $("#updateBtn").on("click",function () {
       $.ajax({
         type:"post",
         url : "/user/updateUser",
         data : {
           id : currentId,
           isDelete : isDelete
         },
         dataType : "json",
         success : function (info) {
           if(info.success){
             $("#updateModal").modal("hide");
             render();
           }
         }
       })
   })
   
});