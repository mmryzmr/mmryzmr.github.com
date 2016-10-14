/**
 * Created by Administrator on 2016/10/6.
 */
$(function(){
    //输入框验证
    $('.one').blur(function(){
        if($(this).val()==''){
            $(this).parent().prev().css('display','block');
            return false;
        }
    });
    $('.one').keyup(function(){
        $(this).parent().prev().css('display','none');
        return true;
    });
    $('.two').blur(function(){
        if($(this).val()==''){
            $(this).parent().parent().prev().css('display','block');
            return false;
        }
    });
    $('.two').keyup(function(){
        $(this).parent().parent().prev().css('display','none');
        return true;
    });
    $('.phone').blur(function(){
        var phone=$(this).val();
        if(!(/^1[34578]\d{9}$/.test(phone))){
            $('.thid').css('display','block');
            return false;
        }
    });
    //密码正则：/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,14}$/
    $('.password').blur(function(){
        var password=$(this).val();
        if(!(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,14}$/.test(password))){
            $('.phid').css('display','block');
        }
    });
    $('.topassword').blur(function(){
        var topassword=$(this).val();
        if(!(/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,14}$/.test(topassword))){
            $('.tophid').css('display','block');
        }
    });
    //生成验证码
    function createCode(){
        var allCode=[2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var newCode='';
        for(var i=0;i<6;i++){
            var index=Math.floor(Math.random()*32);
            newCode+=allCode[index];
        }
        return newCode;
    }
    //判断验证码是否正确
    function test(){
        var value=$('.il').children().val().toUpperCase();
        if(value!=$('.ir').html()){
            $('.ihid').css('display','block');
            return false;
        }else{
            return true;
        }
    }
    $('.ir').html(createCode());
    $('.ir').click(function(){
        $(this).html(createCode());
    });


    //连接数据库
    $('.reg').click(function(){
        //判断是否符合注册条件
        if(!(/^1[34578]\d{9}$/.test($('.phone').val()))){
            $('.thid').css('display','block');
            return false;
        }else if(!test()){
            return false;
        }else if($('.password').val()!=$('.topassword').val()){
            $('.phid').css('display','block');
            $('.tophid').css('display','block');
            return false;
        }else{
            ajax({
                 'url':'/a',
                 'data':{
                     'act':'add',
                     'username':$('.phone').val(),
                     'password':$('.password').val()
                 },
                 'success':function(str){
                     alert(str);
                 },
                 'error': function (err) {
                    alert(err);
                 }
             });
        }

    });
});