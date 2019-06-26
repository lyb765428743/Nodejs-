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