let http = require("http");
http.createServer(function (request,response) {
/*发送http头部（状态值，内容类型等）*/
  response.writeHead(200,{'Content-Type':'text/plain'});
  response.end("Hello World");
}).listen(8888);
console.log("server running at '127.0.0.1:8888'");
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


