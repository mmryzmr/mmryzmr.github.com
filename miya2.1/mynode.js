var http=require('http'),
	fs=require('fs'),
	mysql=require('mysql'),
	qs=require('querystring');

http.createServer(function (req,res){
	if(req.url.indexOf('?')!=-1){
		var GET={};
		var arr=req.url.split('?');
		switch(arr[0]){
			case '/a':
				//GET={act:login,username:xxx,password:xxx}
				GET=qs.parse(arr[1]);
				switch(GET['act']){
					case 'login':
						var db=mysql.createConnection({
							host:'127.0.0.1',
							user:'root',
							password:'',
							database:'aaaa'
						});
						var SQL='SELECT * FROM user WHERE username="'+GET['username']+'"';
						db.query(SQL,function (err,data){
							if(err){
								res.end('失败'+err);
							}else{
								//true false
								if(data.length){
									if(data[0]['password']==GET['password']){
										res.end('登陆成功');
									}else{
										res.end('密码错误');
									}
								}else{
									res.end('用户名未注册');
								}
							}
						});
						break;
					case 'add':
						var db=mysql.createConnection({
							host:'127.0.0.1',
							user:'root',
							password:'',
							database:'aaaa'
						});
						var SQL='SELECT * FROM user WHERE username="'+GET['username']+'"';
						db.query(SQL,function (err,data){
							if(err){
								res.end('失败'+err);
							}else{
								if(data.length){
									//abc
									res.end('用户名已被注册');
								}else{
									var SQL='INSERT INTO user VALUE("'+GET['username']+'","'+GET['password']+'")';
									db.query(SQL,function (err,data){
										if(err){
											res.end('失败');
										}else{
											res.end('用户注册成功');	
										}										
									});
								}
							}
						});
						break;
				}
				break;
			default:
				res.end('404');
				break;
		}
	}else{
		fs.readFile('root'+req.url,function (err,data){
			if(err){
				res.end('404');
			}else{
				res.end(data);
			}
		});
	}
}).listen(80);























	
	
	