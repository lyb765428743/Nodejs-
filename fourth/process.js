process.stdout.write("Hello World!" + "\n");
process.argv.forEach(function(val, index, array) {
  console.log(index + ': ' + val);
  console.log(array);
});
console.log(process.execPath);
console.log(process.platform);

console.log('当前目录: ' + process.cwd());

console.log('当前版本: ' + process.version);

console.log(process.memoryUsage());