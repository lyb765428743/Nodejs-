## first day
### 1、一切之始 ------ Hello World
引入http模块，引用createServer创建一个服务器并监听8888端口，createServer接收一个函数，
函数接收（request,response）两个参数，前者用来接收请求，后者用来响应请求
```
let http = require("http");
http.createServer(function (request,response) {
/*发送http头部（状态值，内容类型等）*/
  response.writeHead(200,{'Content-Type':'text/plain'});
  response.end("Hello World");
}).listen(8888);
console.log("server running at '127.0.0.1:8888'");
```
### 2、NPM
npm 为nodejs的包管理工具  主要用来管理第三方模块
+ 安装express模块 npm i express  
+ 卸载express模块 npm uninstall express
+ 更新express模快 npm updata express
+ 搜索express模快 npm search express

### 3、REPL (交互式解释器)
Node.js REPL(Read Eval Print Loop:交互式解释器) 表示一个电脑的环境，类似 Window 系统的终端或 Unix/Linux shell，我们可以在终端中输入命令，并接收系统的响应。

+ 读取 - 读取用户输入，解析输入了Javascript 数据结构并存储在内存中。 
+ 执行 - 执行输入的数据结构 
+ 打印 - 输出结果 
+ 循环 - 循环操作以上步骤直到用户两次按下 ctrl-c 按钮退出。 

### 4、nodejs回调函数
nodejs的异步主要体现就是回调函数

回调函数在完成任务后就会被调用，Node 使用了大量的回调函数，Node 所有 API 都支持回调函数。
```$xslt
//阻塞实例
{
  let fs = require('fs');
  let data = fs.readFileSync('a.txt');
  console.log(data.toString())
  console.log("这是阻塞实例")
}
//非阻塞实例
{
  let fs = require('fs');
  fs.readFile("a.txt",function (err,data) {
    if(err){
      console.log(err)
      return
    }
    console.log(data.toString());
  });
  console.log("利用回调函数进行异步操作");
}
```
