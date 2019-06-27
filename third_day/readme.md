## third_day
### 1、EventEmitter
Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列
Node.js 里面的许多对象都会分发事件：一个 net.Server 对象会在每次有新连接时触发一个事件， 一个 fs.readStream 对象会在文件被打开的时候触发一个事件。 所有这些产生事件的对象都是 events.EventEmitter 的实例。
events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。
```$xslt
let event = require('events');
let eventEmitter = new event.EventEmitter();
//注册事件
eventEmitter.on('sayHello',function () {
  console.log("hello")
});
//监听事件
let timer = setTimeout(()=>{
  eventEmitter.emit('sayHello')
},1000)
```
EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器。

当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。
```$xslt
{
  eventEmitter.on('someEvent',function (arg1,arg2) {
    console.log(arg1 - arg2)
  })
  eventEmitter.on('someEvent',function (arg1,arg2) {
    console.log(arg1 + arg2);
  })
  eventEmitter.emit('someEvent',1,2);
}
```
#### 方法
addListener(event, listener)
on(event,listener) //添加监听器

once(event,listener) //监听一次后移除

removeListener(event, listener)//移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。它接受两个参数，第一个是事件名称，第二个是回调函数名称

removeAllListeners([event])//移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。

setMaxListeners(n)//默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于提高监听器的默认限制的数量。

listeners(event)//返回指定事件的监听器数组。

emit(event, [arg1], [arg2], [...])//按监听器的顺序执行执行每个监听器，如果事件有注册监听返回 true，否则返回 false
#### 事件
newListener //该事件在添加新监听器时被触发。
removeListener //从指定监听器数组中删除一个监听器。需要注意的是，此操作将会改变处于被删监听器之后的那些监听器的索引。
```$xslt
{
  eventEmitter.on('newListener',(event,listener) => {
    console.log(event,listener)
  })
  eventEmitter.on('say',function () {
    console.log(123)
  })
  eventEmitter.on('say',function () {
    console.log(456)
  })
  console.log(eventEmitter.listeners('say').length)
}
```
```$xslt
eventEmitter.emit('error');
```
大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。

为什么要这样做呢？原因有两点：

首先，具有某个实体功能的对象实现事件符合语义， 事件的监听和发生应该是一个对象的方法。

其次 JavaScript 的对象机制是基于原型的，支持 部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系。

### Node.js Buffer(缓冲区)
js语言自身只有字符串类型。没有二进制数据类型
但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。
```$xslt
{
  const buf = Buffer.from('runoob', 'ascii');
  console.log(buf)
  console.log(buf.toString('hex'));
  console.log(buf.toString('base64'));
}
```
#### 创建buffer类
Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
```$xslt
{
  const buf = new Buffer.alloc(10);
  const buf1 = new Buffer.alloc(10,1);
  console.log(buf , 'alloc')
  console.log(buf1 , 'alloc 01')
}
```
Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据

Buffer.allocUnsafeSlow(size)

Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）

Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。

Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例

Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例

#### 写入缓冲区
```$xslt
{
  let buf = Buffer.alloc(10);
  console.log(buf,'原来')
  let len = buf.write('wo');//返回写入的长度 2
  let len1 = buf.write('shi');//返回写入的长度 3
  console.log(buf,'现在')
}
```
#### 读取缓冲区
```$xslt
{
  buf = Buffer.alloc(26);
  for (var i = 0 ; i < 26 ; i++) {
    buf[i] = i + 97;
  }
  console.log(buf);
  console.log(buf.toString('utf-8',0,5))
}
```
```$xslt
buf转JSON
{
  const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
  const json = JSON.stringify(buf);
  console.log(buf.toJSON())
// 输出: {"type":"Buffer","data":[1,2,3,4,5]}
  console.log(json);
}
```
```$xslt
合并
{
  var buffer1 = Buffer.from('菜鸟教程');
  console.log(buffer1,'buf1')
  var buffer2 = Buffer.from('www.runoob.com');
  var buffer3 = Buffer.concat([buffer1,buffer2],20);
  console.log("buffer3 内容: " + buffer3.toString());
}
```
```$xslt
比较
var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}
```
```$xslt
拷贝
{
  var buf1 = Buffer.from('abcdefghijkl');
  var buf2 = Buffer.from('RUNOOB');

//将 buf2 插入到 buf1 指定位置上
  buf2.copy(buf1, 2 , 1,2); //sourceStart包含,sourceEnd不包含,可选参数

  console.log(buf1.toString());
}
```
长度 buffer.length
```$xslt
{
  //裁剪功能返回的实际是原始缓存区 buffer 或者一部分，操作的是与原始 buffer 同一块内存区域。
  //裁剪
  var buffer1 = Buffer.from('runoob');
// 剪切缓冲区
  var buffer2 = buffer1.slice(0,2);
  console.log("buffer2 content: " + buffer2.toString());  //ru
  console.log("buffer1 content: " + buffer1.toString()); //runoob
}
```