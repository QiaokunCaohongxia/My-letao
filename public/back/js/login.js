








;$(function () {
 
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',   // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
    },
    fields : {
      username : {
        validators : {
          notEmpty : {
            message : "用户名不能为空"
          },
          stringLength : {
            min : 2,
            max : 6,
            message : "用户名长度为2~6位"
          },
          regexp : {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '用户名由数字字母下划线和.组成'
          },
          callback : {
            message : "用户名不存在"
          }
        }
      },
      password : {
        validators : {
          notEmpty : {
            message : "密码不能为空"
          },
          stringLength : {
            min : 6,
            max : 12,
            message : "密码长度在6到12之间"
          },
          regexp : {
            regexp: /^[a-zA-Z0-9_\.]+$/,
            message: '密码由数字字母下划线和.组成'
          },
          callback : {
            message : "密码错误"
          }
        }
      }
    }
  });
  $("#form").on("success.form.bv",function (e) {
      e.preventDefault();
      $.ajax({
        type : "post",
        url : "/employee/employeeLogin",
        data : $("#form").serialize(),
        dataType : "json",
        success : function (info) {
          if(info.success ===true) {
            location.href = "index.html";
          }
          if(info.error === 1000 ) {
            $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
          }
          if(info.error === 1001 ) {
            $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
          }
        }
      })
  })
  $("[type='reset']").on("click",function () {
    $("#form").data('bootstrapValidator').resetForm(true);
  })
});