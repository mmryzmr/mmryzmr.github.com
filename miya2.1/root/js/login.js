/**
 * Created by Administrator on 2016/10/5.
 */
$(function(){
	//自动登录
	var check=false;
	$('.auto').click(function(){
		if(typeof (getCookie('check'))=='string'){
			if(getCookie('check')=='true'){
				check=true;
			}else if(getCookie('check')=='false'){
				check=false;
			}
		}
		check=!check;
		setCookie('check',check,1);
	});
	if(getCookie('check')=='true'){
		 $('.auto').attr('checked','checked');
		 $('.phone').val(getCookie('username'));
		 $('.password').val(getCookie('password'));
	}else{
		$('.auto').attr('checked',undefined);	
	}
    //内容为空时，失去焦点时提示
   $('.right input[type="text"]').blur(function(){
       if($(this).val()==''){
           $(this).parent().prev().css('display','block');
           return false;
       }
   });
    $('.right input[type="text"]').keyup(function(){
        $(this).parent().prev().css('display','none');
        return true;
    });
    $('.il').children().blur(function(){
        if($(this).val()==''){
            $('.ihid').css('display','block');
            return false;
        }
    });
    $('.il').children().keyup(function(){
        $('.ihid').css('display','none');
        return true;
    });
    $('.phone').blur(function(){
        var phone=$(this).val();
        if(!(/^1[34578]\d{9}$/.test(phone))){
            $('.thid').css('display','block');
            return false;
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
    $('.login').click(function(){
        if(!test()){
            return false;
        }else if(!(/^1[34578]\d{9}$/.test($('.phone').val()))){
            $('.thid').css('display','block');
            return false;
        }else{
             ajax({
                'url':'/a',
                'data':{
                    'act':'login',
                    'username':$('.phone').val(),
                    'password':$('.password').val()
                },
                'success':function(str){
                    alert(str);
                    if(str=='登陆成功'){
                        setCookie('username',$('.phone').val(),1);
                        setCookie('password',$('.password').val(),1);
                        setCookie('flag','true');
                 
                        window.open('index-2.0.html','_self');
                    }
                },
                'error':function(err){
                   console.log(err);
                }
            });
			
        }

    });


});