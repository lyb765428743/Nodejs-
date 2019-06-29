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
{
  //匿名函数
  function execute(someFunction, value) {
    someFunction(value);
  }

  execute(function(word){ console.log(word) }, "Hello");
}