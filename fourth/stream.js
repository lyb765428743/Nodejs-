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