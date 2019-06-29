let fs = require('fs');
{
//异步读取
  fs.readFile('1.txt',(err,data)=>{
    if(err){
      console.log(err); return
    }
    console.log(data.toString());
  })
  console.log('执行完成')
}
{
  //同步读取
  let data = fs.readFileSync('1.txt');
  console.log(data);
  console.log('同步读取')
}
{
  //打开文件  fs.open(path, flags[, mode], callback)  (路径，打开行为（读写等）)
  fs.open('1.txt','r+',function (err,fd) {
    if (err) {
      return console.error(err);
    }
    console.log("文件打开成功！");
    console.log(fd , 'fd');
  })
}
{
  //获取文件信息。判断文件类型
  fs.stat('1.txt',function (err,stats) {
    if(err){
      console.log(err); return
    }
    console.log(stats , 'stats')
    console.log(stats.isFile() , '是否为文件')
  })
}
{
  //写入文件
  fs.writeFile('1.txt','林少丹是sb1',function (err) {
    if(err){
      console.log(err);return
    }
    console.log('文件写入成功')
  })
}
{
  var buf = new Buffer.alloc(1024);

  console.log("准备打开已存在的文件！");
  fs.open('1.txt', 'r+', function(err, fd) {
    if (err) {
      return console.error(err);
    }
    console.log("文件打开成功！");
    console.log("准备读取文件：");
    fs.read(fd, buf, 0, buf.length, 3, function(err, bytes){
      if (err){
        console.log(err);
      }
      console.log(bytes + "  字节被读取");

      // 仅输出读取的字节
      if(bytes > 0){
        console.log(buf.slice(0, bytes).toString());
      }
      fs.close(fd, function(err){
        if (err){
          console.log(err);
        }
        console.log("文件关闭成功");
      });
    });
    fs.ftruncate(fd, 9, function(err){  //裁剪，直接改变文件内容
      if (err){
        console.log(err);
      }
      console.log("文件截取成功。");
      console.log("读取相同的文件");
    });
  });
}
{
  // fs.unlink('1.txt', function (err) {
  //   if(err){
  //     return console.log(err)
  //   }
  //   console.log('文件删除成功')
  // })
  // fs.mkdir('./test',function (err) {
  //   if (err) {
  //     return console.error(err);
  //   }
  //   console.log("目录创建成功。");
  // })
  fs.readdir('./test',function (err,files) {
    console.log(files);
  })
  //fs.rmdir(path, callback) 删除目录
}