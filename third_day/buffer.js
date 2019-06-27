{
  const buf = Buffer.from('runoob', 'ascii');
  console.log(buf)
  console.log(buf.toString('hex'));
  console.log(buf.toString('base64'));
}
{
  const buf = new Buffer.alloc(10);
  const buf1 = new Buffer.alloc(10,1);
  console.log(buf , 'alloc')
  console.log(buf1 , 'alloc 01')
}
{
  const buf = Buffer.allocUnsafe(10);
  console.log(buf);
}
{
  let buf = Buffer.alloc(10);
  console.log(buf,'原来')
  let len = buf.write('wo');//返回写入的长度 2
  let len1 = buf.write('shi');//返回写入的长度 3
  console.log(buf,'现在')
}
{
  buf = Buffer.alloc(26);
  for (var i = 0 ; i < 26 ; i++) {
    buf[i] = i + 97;
  }
  console.log(buf);
  console.log(buf.toString('utf-8',0,5))
}
{
  const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
  const json = JSON.stringify(buf);
  console.log(buf.toJSON())
// 输出: {"type":"Buffer","data":[1,2,3,4,5]}
  console.log(json);
}
{
  var buffer1 = Buffer.from('菜鸟教程');
  console.log(buffer1,'buf1')
  var buffer2 = Buffer.from('www.runoob.com');
  var buffer3 = Buffer.concat([buffer1,buffer2],20);
  console.log("buffer3 内容: " + buffer3.toString());
}
{
  var buf1 = Buffer.from('abcdefghijkl');
  var buf2 = Buffer.from('RUNOOB');

//将 buf2 插入到 buf1 指定位置上
  buf2.copy(buf1, 2 , 1,2); //sourceStart包含,sourceEnd不包含,可选参数

  console.log(buf1.toString());
}
{
  //裁剪功能返回的实际是原始缓存区 buffer 或者一部分，操作的是与原始 buffer 同一块内存区域。
  //裁剪
  var buffer1 = Buffer.from('runoob');
// 剪切缓冲区
  var buffer2 = buffer1.slice(0,2);
  console.log("buffer2 content: " + buffer2.toString());  //ru
  console.log("buffer1 content: " + buffer1.toString()); //runoob
}