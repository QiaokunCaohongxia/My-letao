








;$(function () {
   var currentPage = 1;
   var pageSize = 5;
   var currentId;
   function render() {
      $.ajax({
        type : "get",
        url : "/category/querySecondCategoryPaging",
        data : {
          page : currentPage,
          pageSize : pageSize
        },
        dataType : "json",
        success : function (info) {
          $("tbody").html(template("tmp",info));
          $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion : 3,
            currentPage : info.page,
            totalPages : Math.ceil(info.total/info.size),
            onPageClicked : function (a,b,c,page) {
                currentPage = page;
                render();
            }
          })
        }
      })
   };
   render();
   $("#addSecond").on("click",function () {
       $("#secondModal").modal("show");
       $.ajax({
         type:"get",
         url:"/category/queryTopCategoryPaging",
         data:{
           page : 1,
           pageSize:100
         },
         dataType : "json",
         success : function (info) {
           $(".dropdown-menu").html(template("tpl",info));
         }
       })
   })
   $(".dropdown-menu").on("click","a",function () {
       var txt = $(this).text();
       $("#dropdownTxt").text(txt);
       currentId = $(this).data("id");
       $('[name="categoryId"]').val(currentId);
       $("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
   });
   $("#fileupload").fileupload({
     dataType : "json",
     done : function (e,data) {
       var picUrl = data.result.picAddr;
       $("#imgBox img").attr("src",picUrl);
       $('[name="brandLogo"]').val(picUrl);
       $("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
     }
   });
   $("#form").bootstrapValidator({
     excluded: [],
     feedbackIcons: {
       valid: 'glyphicon glyphicon-ok',   // 校验成功
       invalid: 'glyphicon glyphicon-remove', // 校验失败
       validating: 'glyphicon glyphicon-refresh'  // 校验中
     },
     fields : {
       categoryId :{
         validators : {
           notEmpty : {
             message : "请选择一级分类"
           }
         }
       },
       brandName :{
         validators : {
           notEmpty : {
             message : "请选择二级分类"
           }
         }
       },
       brandLogo :{
         validators : {
           notEmpty : {
             message : "请上传图片"
           }
         }
       }
     }
   });
   $("#form").on("success.form.bv",function (e) {
       e.preventDefault();
       $.ajax({
         type:"post",
         url:"/category/addSecondCategory",
         data:$("#form").serialize(),
         dataType : "json",
         success : function (info) {
             if(info.success){
               $("#secondModal").modal("hide");
               $("#form").data("bootstrapValidator").resetForm(true);
               currentPage = 1;
               render();
               $("#dropdownTxt").text("请选择一级分类");
               $("#imgBox img").attr("src","./images/none.png");
             }
         }
       })
   });
});