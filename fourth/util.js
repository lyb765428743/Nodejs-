let util = require('util');
{
  function Base() {
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function() {
      console.log('Hello ' + this.name);
    };
  }
  Base.prototype.showName = function() {
    console.log(this.name);
  };
  function Sub() {
    this.name = 'sub';
  }
  util.inherits(Sub,Base);
  let sub = new Sub();
  let base = new Base();
  console.log(sub.name);
  console.log(base.name);
  console.log(sub.base);
// sub.sayHello();
  sub.showName();
}
{
  function Person() {
    this.name = 'hhehe';
    this.toString = function() {
      return this.name;
    };
  }
  var obj = new Person();
  console.log(util.inspect(obj));
  console.log(util.inspect(obj, true,null,true));
}
