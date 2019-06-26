## second Day
### 1、事件循环
Node.js是单进程单线程的应用程序，但是因为V8引擎提供的异步执行回调接口，通过这些接口可以处理大
量的并发，所以性能非常高。

#### 注：浏览器的渲染进程（浏览器内核（Render进程））是多线程的   最后的绘制是Browser进程进行绘制的，而不是渲染进程

过程：Browser进程下载页面所需资源（如css，js等），然后将任务给render进程，
最后将结果传回Browser进程进行绘制。中间render进程可能需要用到GPU进程来帮助渲染。

1、GUI渲染线程，负责html，css解析，当页面进行重绘和回流时，该线程会执行。

2、js引擎线程（js内核）用于js脚本，js引擎线程与Gui是互斥的，js引擎线程会阻塞GUI。

3、事件触发线程，当JS引擎执行代码块如setTimeOut时（也可来自浏览器内核的其他线程,如鼠标点击、
AJAX异步请求等），当对应的事件符合触发条件被触发时（如定时器计时到达，异步请求成功）会将事件添加到待处理队列，当js引擎线程
空闲时会执行事件

4、定时触发器线程，计时完毕后会添加到事件队列中，等待js引擎线程空闲时进行。

5、异步http请求线程，在XMLHttpRequest在连接后是通过浏览器新开一个线程请求，将检测到状态变更时，
如果设置有回调函数，异步线程就产生状态变更事件，将这个回调再放入事件队列中。
再由JavaScript引擎执行。
-----------------------------------------------
Node.js 几乎每一个 API 都是支持回调函数的。
Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。
Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.
------------------------------------------------
Node.js 使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。

当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。

这个模型非常高效可扩展性非常强，因为webserver一直接受请求而不等待任何读写操作。（这也被称之为非阻塞式IO或者事件驱动IO）

在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回调函数。

```$xslt
//引入event模块
let event = require('events');
//创建eventEmitter对象
let eventEmitter = new event.EventEmitter();
let EventHandle = function(){
  console.log('成功1');
  eventEmitter.emit('success');
};
eventEmitter.on('eventName',EventHandle);
eventEmitter.on('success',function () {
  console.log('success');
});
eventEmitter.emit('eventName');
```
Node 应用程序是如何工作的？
在 Node 应用程序中，执行异步操作的函数将回调函数作为最后一个参数， 回调函数接收错误对象作为第一个参数