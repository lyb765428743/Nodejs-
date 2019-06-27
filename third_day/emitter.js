let event = require('events');
let eventEmitter = new event.EventEmitter();
{
  //注册事件
  eventEmitter.on('sayHello', function () {
    console.log("hello")
  });
//1s后执行监听
  let timer = setTimeout(() => {
    eventEmitter.emit('sayHello')
  }, 1000)
}
{
  eventEmitter.on('someEvent',function (arg1,arg2) {
    console.log(arg1 - arg2)
  })
  eventEmitter.on('someEvent',function (arg1,arg2) {
    console.log(arg1 + arg2);
  })
  eventEmitter.emit('someEvent',1,2);
}
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
