var express = require('express');
var proxy = require('http-proxy-middleware');
var path = require('path');
var app = express();

//设置跨域访问
// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", ' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

app.use('/hywisdom',proxy({///hywisdom 为匹配被转发的请求路径
  target:'http://192.168.22.8:8888', // 目标服务器 host,即后端ip+端口
  changeOrigin:true//,			// 默认false，是否需要改变原始主机头为目标URL
  //ws: true,                         // 是否代理websockets
  //pathRewrite:{
  //    '^/api/old-path' : '/api/new-path',   重写请求，比如我们源访问的是api/old-path，那么请求会被解析为/api/new-path
  //}
}));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname, './dist', 'index.html'));
});

app.listen(8083,function(){//监听的端口,即前端端口
    console.log("success connected");
});
