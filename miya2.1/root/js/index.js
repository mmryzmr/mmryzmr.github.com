/**
 * Created by Administrator on 2016/9/13.
 */

$(function(){
    //购物车
    $('.shop').hover(function(){
        $(this).children().eq(0).attr('class','af_ho');
        $(this).children().eq(0).children().eq(0).attr('class','iaf_ho');
        $(this).children().eq(0).children().eq(1).attr('class','saf_ho');
        $(this).children().eq(1).css({'display':'block'});
    },function(){
        $(this).children().eq(0).attr('class','a_ho');
        $(this).children().eq(0).children().eq(0).attr('class','be_ho');
        $(this).children().eq(0).children().eq(1).attr('class','');
        $(this).children().eq(1).css({'display':'none'});
    });
    //搜索框
    //第一种
    /*$('.txt1').focus(function(){
        $(this).next().css({'display':'none'});
    });
    $('.txt1').blur(function(){
        if($(this).val()==''){
            $(this).next().css({'display':'block'});
        }
    });
    $('.txt1').next().click(function(){
        $('.txt1').focus();
    });*/
    //第二种
    $('.txt1').keyup(function(){
        if($(this).val()==''){
            $(this).next().css({'display':'block'});
        }else{
            $(this).next().css({'display':'none'});
        }
    });
    $('.txt1').next().click(function(){
        $('.txt1').focus();
    });
    //全部商品分类
    $('.bul ul li a').eq(0).toggle(function(){
        $(this).parent().css({'background':'#FF3893'});
        $(this).find('i').css({'background-image':'url(images/jiantou.png)'});
        $('.xiala').animate({'opacity':0});
    },function(){
        $(this).parent().css({'background':'#ec0971'});
        $(this).find('i').css({'background-image':'url(images/njiantou.png)'});
        $('.xiala').animate({'opacity':1});
    });
    //正品推荐
    $('.zlast').hover(function(){
        $(this).css({'background':'#ec0971'});
        $(this).find('i').css({'background-image':'url(images/njiantou.png)'});
        $(this).find('.list').css('display','block');
    },function(){
        $(this).css({'background':'#FF3893'});
        $(this).find('i').css({'background-image':'url(images/jiantou.png)'});
        $(this).find('.list').css('display','none');
    });
    //无缝滚动轮播图   (没加定时器)
    var iNow=0;
    $('.lubo ul li').eq(0).css({'left':0});
    $('.prev').click(function(){
       prev();
    });
    function prev(){
        $('.lubo ul li').eq(iNow).animate({'left':-1400});
        iNow++;
        if(iNow==$('.lubo ul li').length){
            iNow=0;
        }
        $('.lubo ul li').eq(iNow).css({'left':1400});
        $('.lubo ul li').eq(iNow).animate({'left':0});
        change(iNow);
    }
    var timer=null;
    timer=setInterval(prev,3000);

    $('.lubo').mouseover(function(){
        clearInterval(timer);
    });
    $('.lubo').mouseleave(function(){
        timer=setInterval(prev,3000);
    });
    $('.next').click(function(){
        $('.lubo ul li').eq(iNow).animate({'left':1400});
        iNow--;
        if(iNow==-1){
            iNow=$('.lubo ul li').length-1;
        }
        $('.lubo ul li').eq(iNow).css({'left':-1400});
        $('.lubo ul li').eq(iNow).animate({'left':0});
        change(iNow);
    });
    function change(iNow){
        $('.lubo ol li').attr('class','');
        $('.lubo ol li').eq(iNow).attr('class','on');
    }
    $('.lubo ol li').click(function(){
        if(iNow<$(this).index()){
            $('.lubo ul li').eq(iNow).animate({'left':-1400});
            $('.lubo ul li').eq($(this).index()).css({'left':1400});
            $('.lubo ul li').eq($(this).index()).animate({'left':0});
            change($(this).index());
        }else{
            $('.lubo ul li').eq(iNow).animate({'left':1400});
            $('.lubo ul li').eq($(this).index()).css({'left':-1400});
            $('.lubo ul li').eq($(this).index()).animate({'left':0});
            change($(this).index());
        }
        iNow=$(this).index();
    });
    //为你推荐
    $('.tTwo ul li').mouseover(function(){
        $(this).find('p').css({'color':' #FF3893'});
        $(this).css({'opacity':0.9});
    });
    $('.tTwo ul li').mouseleave(function(){
        $(this).find('p').css({'color':' #222'});
        $(this).css({'opacity':1});
    });
    $('.tTwo ul li i').mouseover(function(){
        $(this).css({'opacity':1});
    });
    $('.tTwo ul li i').mouseleave(function(){
        $(this).css({'opacity':0.6});
    });
    //侧边栏
    $('.add:gt(0):lt(4)').css('top',-20);
    $('.add:eq(0)').css('top',0);
    $('.old').parent().mouseover(function(){
        $(this).find('.old').addClass('hover');
        $(this).find('em').addClass('ehover');
        $(this).find('.add').css('display','block');
        if($(this).find('.ban').length){
            $('.add').css('width',873);
        }else{
            $('.add').css('width',579);
        }
    });
    $('.old').parent().mouseleave(function(){
        $(this).find('.old').removeClass('hover');
        $(this).find('em').removeClass('ehover');
        $(this).find('.add').css('display','none');
    });
    //选项卡
    $('.tab').each(function(i,item){
        Tab(item);
    });
    function Tab(item){
        $(item).find('.tabr ul li').mouseenter(function(){
            var index=$(this).index();
            //animate有问题？
            /* $('.myjian').animate({'top':index*120+40});*/
            move( $(item).find('.myjian').get(0),{'top':index*120+40});
            $(item).find('.tabl img').each(function(i){
                move( $(item).find('.tabl img').get(i),{opacity:0});
            });
            move( $(item).find('.tabl img').get($(this).index()),{opacity:1});
        });
    }
    //底部i背景
    $('.footer1 li i').each(function(i,item){
        $(this).css({'background-position':'-'+(3+60*i)+'px 0'});
    });
    //左右悬浮广告框
    //回到顶部
	//吸顶条
	var pt=$('.water1').offset().top;
    var flag=false;
    var timer1=null;
    $('.r5').click(function(){
        var start=$(window).scrollTop();
        var dis=0-start;
        var count=Math.floor(1000/30);
        var n=0;
       timer1=setInterval(function(){
           flag=false;
           n++;
           var a=n/count;
           var cur=dis*a+start;
           $(window).scrollTop(cur);
           if(n==count){
               clearInterval(timer1);
           }
       },30);
    });
    $(window).scroll(function(){
        if(flag){
            clearInterval(timer1);
        }
        flag=true;
        if($(window).scrollTop()>=200){
             $('.left').css({'display':'block'});
             $('.right').css({'display':'block'});
         }else{
             $('.left').css({'display':'none'});
             $('.right').css({'display':'none'});
            //console.log(1);
        }
		if($(window).scrollTop()>pt){
					if(window.navigator.userAgent.indexOf('MSIE 6.0')!=-1){
						$('.water1').css('position','absolute');
						$('.water1').css('top',$(window).scroll());
					}else{
						$('.water1').css('position','fixed');
						$('.water1').css('top',0);
					}
					/*$('.water1').css('left',0);*/
					$('.water1_1').css('display','block');
				}else{
					$('.water1').css('position','');	
					$('.water1_1').css('display','none');
				}
    });
    $('.r4').hover(function(){
        $('.gong').css('display','block');
        $('.gong').animate({
            'right':50
        },500);
    },function(){
        $('.gong').css({
            'display':'none',
            'right':150
        });
    });

    $('.r3').hover(function(){
        $('.dian').css('display','block');
        $('.dian').animate({
            'right':50
        },500);
    },function(){
        $('.dian').css({
            'display':'none',
            'right':150
        });
    });
    //从cookie中取值
   // alert(getCookie('username'));
    if(getCookie('flag')=='true'){
        $('.cook1').html('你好,'+getCookie('username')+'');
        $('.cook2').html('我的蜜芽');
    }
	//购物车
	$('.tTwo ul li').hover(function(){
		$(this).find('.down').css({'height':165.5});	
		$(this).find('.up').css({'height':165.5});
		$(this).find('b').css({'opacity':1});	
		
	},function(){
		$(this).find('.down').css({'height':0});	
		$(this).find('.up').css({'height':0});		
		$(this).find('b').css({'opacity':0});	
		
	});
	$('.up b').click(function(){
		$('.down').css({'height':0});	
		$('.up').css({'height':0});	
		$('.down').find('b').css({'opacity':0});
		$('.up').find('b').css({'opacity':0});
	});
	var left=$(window).width()-80;
	
	$('.down b').click(function(event){
			var img=$(this).parent().siblings('img').attr('src'); 
			var flyer=$('<img class="u-flyer" src="'+img+'">');
		
			flyer.fly({
			start: {
				
				left: event.clientX,
				top: event.clientY
			},
			end: {
				left: left+10,
				top: 300+10,
				width: 0,
				height: 0
			},
			onEnd: function(){
				$(".msg").show().animate({width: '250px'}, 200).fadeOut(1000);
				this.destory();
			}
		});
	});
	
	
	$('.span').click(function(){
		$('.mask').css('display','none');
		$('.shopping').css('display','none');	
	});
	$('.r1').click(function(){
		$('.mask').css('display','block');
		$('.shopping').css('display','block');	
	});
	var app=angular.module('app',[]);
	app.controller('buyCar',function($scope){
		$scope.data=[{
			'name':'西红柿',
			'price':12,
			'count':1	
		},{
			'name':'青菜',
			'price':4,
			'count':1
		},{
			'name':'茄子',
			'price':3,
			'count':1	
		}];
		$scope.sum=function(){
			var res=0;
			angular.forEach($scope.data,function(item,index){
				res+=item.price*item.count;
			});
			return res;
		}
		$scope.dele=function(index){
			$scope.data.splice(index,1);
		}
		function fina(){
			for(var i=0;i<$scope.data.length;i++){
				if($scope.data[i].name==$scope.pp){
					$scope.data[i].count++;
					return true;
				}
			}
			return false;
		}
		$scope.add=function($event){
			$scope.pp=$($event.target).parent().parent().find('.pp').html();
			$scope.h3=$($event.target).parent().parent().find('.h3').html();
			$scope.h3=$scope.h3.substring(1);
			if(!fina()){
				$scope.data.unshift({
						'name':$scope.pp,
						'price':$scope.h3,
						'count':1
				});	
			}
			
		}
	});
	
	//穿墙
	function getDir(obj,ev){
		var x=obj.get(0).getBoundingClientRect().left+obj.get(0).offsetWidth/2-ev.clientX;
		var y=obj.get(0).getBoundingClientRect().top+obj.get(0).offsetHeight/2-ev.clientY;
		return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
	} 
function through(obj){
	obj.mouseenter(function(ev){
		var oD=obj.find('.through');
		var oEvent=ev||event;
		var dir=getDir(obj,oEvent);
		//alert(dir);
		switch(dir){
			//右
			case 0:
				oD.css('left','350px');
				oD.css('top',0);
				break;
			//下
			case 1:
				oD.css('left',0);
				oD.css('top','113px');
				break;
			//左
			case 2:
				oD.css('left','-350px');
				oD.css('top',0);
				break;
			//上
			case 3:
				oD.css('left',0);
				oD.css('top','-113px');
				break;
		}
		move(oD.get(0),{left:-5,top:0})
	});
	obj.mouseleave(function(ev){
	
		var oD=obj.find('.through');
		var oEvent=ev||event;
		var dir=getDir(obj,oEvent);
		switch(dir){
			case 0:
				move(oD.get(0),{top:0,left:350});
				break;
			case 1:
				move(oD.get(0),{top:113,left:0});
				break;
			case 2:
				move(oD.get(0),{top:0,left:-350});
				break;
			case 3:
				move(oD.get(0),{top:-113,left:0});
				break;
		}
	});
}
$('.li_th').each(function(index,item){
	through($(item));
});
	
});