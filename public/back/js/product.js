


;$(function () {
   var currentPage = 1;
   var pageSize = 2;
   var currentId;
   var picUrlArr = [];
   function render() {
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      dataType:"json",
      success : function (info) {
        $("tbody").html(template("tmp",info));
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion : 3,
          currentPage : info.page,
          totalPages : Math.ceil(info.total/info.size),
          itemTexts : function (type,page,current) {
            switch(type){
              case "first":
                return "首页";
              case "prev" :
                return "上一页";
              case "next" :
                return "下一页";
              case "last" :
                return "末页";
              case "page" :
                return page;
            }
          },
          tooltipTitles : function (type,page,current) {
            switch(type){
              case "first":
                return "首页";
              case "prev" :
                return "上一页";
              case "next" :
                return "下一页";
              case "last" :
                return "末页";
              case "page" :
                return "前往第"+page+"页";
            }
          },
          useBootstrapTooltip : true,
          size : "small",
          onPageClicked : function (a,b,c,page) {
              currentPage = page;
              render();
          }
        })
      }
    })
   };
   render();
   $("#addProduct").on("click",function () {
       $("#productModal").modal("show");
       $.ajax({
         type:"get",
         url : "/category/querySecondCategoryPaging",
         data : {
           page : 1,
           pageSize : 100
         },
         dataType : "json",
         success : function (info) {
           $(".dropdown-menu").html(template("tpl",info));
         }
       })
   });
   $(".dropdown-menu").on("click","a",function () {
       var txt = $(this).text();
       $("#dropdownTxt").text(txt);
       currentId = $(this).data("id");
       $('[name="brandId"]').val(currentId);
     $("#form").data("bootstrapValidator").updateStatus("brandId","VALID");
   });
   $("#fileupload").fileupload({
     dataType : "json",
     done : function (e,data) {
         var picUrl = data.result.picAddr;
          picUrlArr.unshift(data.result);
          $("#imgBox").prepend('<img src="'+ picUrl + '" height="100" alt="">');
          if(picUrlArr.length > 3) {
            picUrlArr.pop();
            $("#imgBox img:last-of-type").remove();
          };
          if(picUrlArr.length === 3){
            $("#form").data("bootstrapValidator").updateStatus("picstatus","VALID");
          };
     }
   });
   $("#form").bootstrapValidator({
     excluded : [],
     feedbackIcons: {
       valid: 'glyphicon glyphicon-ok',   // 校验成功
       invalid: 'glyphicon glyphicon-remove', // 校验失败
       validating: 'glyphicon glyphicon-refresh'  // 校验中
     },
     fields : {
       brandId: {
         validators: {
           notEmpty: {
             message: "请选择二级分类"
           }
         }
       },
       proName: {
         validators: {
           notEmpty: {
             message: "请输入产品名称"
           }
         }
       },
       proDesc: {
         validators: {
           notEmpty: {
             message: "请输入产品描述"
           }
         }
       },
       num: {
         validators: {
           notEmpty: {
             message: "请输入产品库存"
           },
           regexp: {
             regexp: /^[1-9]\d*$/,
             message: "产品库存必须是非零开头的数字"
           }
         }
       },
       size: {
         validators: {
           notEmpty: {
             message: "请输入产品尺码"
           },
           regexp: {
             regexp: /^\d{2}-\d{2}$/,
             message: "产品尺码必须是 xx-xx 的格式 例如39-50"
           }
         }
       },
       oldPrice: {
         validators: {
           notEmpty: {
             message: "请输入产品原价"
           }
         }
       },
       price: {
         validators: {
           notEmpty: {
             message: "请输入产品现价"
           }
         }
       },
       picstatus: {
         validators: {
           notEmpty: {
             message: "请上传 3 张图片"
           }
         }
       },
     }
   });
   $("#form").on("success.form.bv",function (e) {
       e.preventDefault();
       var formData = $("#form").serialize();
       formData += "&picName1="+ picUrlArr[0].picName + "&picAddr1"+picUrlArr[0].picAddr;
       formData += "&picName1="+ picUrlArr[1].picName + "&picAddr1"+picUrlArr[1].picAddr;
       formData += "&picName1="+ picUrlArr[2].picName + "&picAddr1"+picUrlArr[1].picAddr;
       $.ajax({
         type : "post",
         url : "/product/addProduct",
         data : formData,
         dataType :"json",
         success : function (info) {
           if(info.success) {
             $('#productModal').modal("hide");
             $("#form").data("bootstrapValidator").resetForm(true);
             currentPage = 1;
             render();
             $("#imgBox img").remove();
             $("#dropdownTxt").text("请输入二级分类");
           }
         }
       })
   })
 
});