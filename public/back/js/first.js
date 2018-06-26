



$(function () {
  var currentPage = 1;
  var pageSize = 2;
  function render() {
      $.ajax({
        type : "get",
        url : "/category/queryTopCategoryPaging",
        data : {
          page : currentPage,
          pageSize : pageSize
        },
        dataType : "json",
        success : function (info) {
          $("tbody").html(template("tmp",info));
          $("#paginator").bootstrapPaginator({
            bootstrapMajorVersion : 3,
            totalPages : Math.ceil(info.total / info.size),
            currentPage : info.page,
            onPageClicked:function (a,b,c,page) {
                currentPage = page;
                render();
            }
          })
        }
      })
  }
  render();
  $("#addBtn").on("click",function () {
      $("#addModal").modal("show");
  })
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    fields : {
      categoryName : {
        validators : {
          notEmpty : {
            message : "一级分类名称不能为空"
          }
        }
      }
    }
  })
  $("#form").on("success.form.bv",function (e) {
      e.preventDefault();
      $.ajax({
        type: "post",
        url : "/category/addTopCategory",
        data : $("#form").serialize(),
        dataType : "json",
        success : function (info) {
          if(info.success){
            $("#form").data("bootstrapValidator").resetForm(true);
            $("#addModal").modal("hide");
            currentPage = 1;
            render();
          }
        }
      })
  })

})