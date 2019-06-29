## fourth day
### 1、NodeJs stream 流
Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。

Readable - 可读操作。

Writable - 可写操作。

Duplex - 可读可写操作.

Transform - 操作被写入数据，然后读出结果。

所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：

data - 当有数据可读时触发。

end - 没有更多的数据可读时触发。

error - 在接收和写入过程中发生错误时触发。

finish - 所有数据已被写入到底层系统时触发。
```
let fs = require('fs');
let data = ''
{
  //创建可读流
  let readStream = fs.createReadStream('1.txt');
  readStream.setEncoding('utf-8');
  readStream.on('data', function (chunk) {
    console.log(1111);
    data += chunk
  });
  readStream.on('end', function () {
    console.log(data);
  })
  readStream.on('error', function (err) {
    console.log(err.stack);
  });
  console.log('程序执行完毕')
}
{
  //创建写入流
  data = "我是天才哈哈哈我是天才哈哈哈"
  writeStream = fs.createWriteStream('2.txt');
  writeStream.write(data, 'utf-8');
  writeStream.end();//标记文件末尾
  writeStream.on('finish', function () {
    console.log("写入完成")
  })
  console.log('程序执行完毕1')

}
{
  //管道流
  let readerStream = fs.createReadStream('1.txt');
  let writerStream = fs.createWriteStream('2.txt');
  readerStream.pipe(writerStream);
  console.log('程序执行完毕')
}
{
  //链式流
  let zlib = require('zlib');

  // fs.createReadStream('1.txt')
  //   .pipe(zlib.createGzip())
  //   .pipe(fs.createWriteStream('1.txt.gz'));
  //
  // console.log('文件压缩完成');

// 解压 input.txt.gz 文件为 input.txt
  fs.createReadStream('1.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('3.txt'));

  console.log("文件解压完成。");
}
```
### 2、Nodejs模块系统
require();
moudle.exports = ...

由于 Node.js 中存在 4 类模块（原生模块和3种文件模块），尽管 require 方法极其简单，但是内部的加载却是十分复杂的，其加载优先级也各自不同

尽管原生模块与文件模块的优先级不同，但是都会优先从文件模块的缓存中加载已经存在的模块。

原生模块的优先级仅次于文件模块缓存的优先级。require 方法在解析文件名之后，优先检查模块是否在原生模块列表中。以http模块为例，尽管在目录下存在一个 http/http.js/http.node/http.json 文件，require("http") 都不会从这些文件中加载，而是从原生模块中加载。

原生模块也有一个缓存区，同样也是优先从缓存区加载。如果缓存区没有被加载过，则调用原生模块的加载方式进行加载和执行。

![example.png](https://www.runoob.com/wp-content/uploads/2014/03/nodejs-require.jpg "example")
#### exports 和 module.exports 的使用

如果要对外暴露属性或方法，就用 exports 就行，要暴露对象(类似class，包含了很多属性和方法)，就用 module.exports。

### NodeJs 函数
``` 
{
  //函数当参数
  function say(value) {
    console.log(value);
  }
  function ext(someValue,value) {
    someValue(value)
  }
  ext(say,'haha')
}
```

### nodeJs 全局对象/变量

JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可以在程序的任何地方访问，即全局变量。

在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。

在 Node.js 我们可以直接访问到 global 的属性，而不需要在应用中包含它。

1.__filename
   __filename 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。

```
//main.js  
console.log( __filename ); // /web/com/runoob/nodejs/main.js
```
2.__dirname
   __dirname 表示当前执行脚本所在的目录。

```
//main.js  
console.log( __dirname ); // /web/com/runoob/nodejs
```
3.setTimeOut  clearTimeout  setInterval console

4.process
  process 是一个全局变量，即 global 对象的属性。
  
  它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。
  1.	exit
  当进程准备退出时触发。
  2.	beforeExit
  当 node 清空事件循环，并且没有其他安排时触发这个事件。通常来说，当没有进程安排时 node 退出，但是 'beforeExit' 的监听器可以异步调用，这样 node 就会继续执行。
  3.	uncaughtException
  当一个异常冒泡回到事件循环，触发这个事件。如果给异常添加了监视器，默认的操作（打印堆栈跟踪信息并退出）就不会发生。
  4.	Signal 事件
  当进程接收到信号时就触发。信号列表详见标准的 POSIX 信号名，如 SIGINT、SIGUSR1 等。

``` 
process.on('exit', function(code) {

  // 以下代码永远不会执行
  setTimeout(function() {
    console.log("该代码不会执行");
  }, 0);
  
  console.log('退出码为:', code);
});
console.log("程序执行结束");
```


### NodeJs常用工具
util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心JavaScript 的功能 过于精简的不足

1. util.inherits(constructor, superConstructor) 是一个实现对象间原型继承的函数。
(只能继承原型下的)
2. util.inspect(object,[showHidden],[depth],[colors]) 是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。
  + showHidden 是一个可选参数，如果值为 true，将会输出更多隐藏信息。
  + depth 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多 少。如果不指定depth，默认会递归2层，指定为 null 表示将不限递归层数完整遍历对象。 如果color 值为 true，输出格式将会以ANSI 颜色编码，通常用于在终端显示更漂亮 的效果。
  + 特别要指出的是，util.inspect 并不会简单地直接把对象转换为字符串，即使该对 象定义了 toString 方法也不会调用。

3.util.isArray(object)
   如果给定的参数 "object" 是一个数组返回true，否则返回false。
   
4.util.isRegExp(object)
   如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。 
   
5.util.isDate(object)
  如果给定的参数 "object" 是一个日期返回true，否则返回false。
  
6.util.isError(object)
  如果给定的参数 "object" 是一个错误对象返回true，否则返回false。       

