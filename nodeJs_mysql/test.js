let query = require('./db');
let fs = require('fs');
let S = require('chinese-s2t');
let path = require('path');
{
  //唐诗
  fs.readdir('../../c/tangshi/', (err, files) => {
    if (err) {
      return console.log(err)
    }
    let vals = [];
    files.forEach((file) => {
      if (file.indexOf('poet.tang') > -1) {
        // console.log(path.join('../../c/tangshi/',file))
        let data = JSON.parse(fs.readFileSync(path.join('../../c/tangshi/', file)));
        data.forEach(item => {
          vals.push([S.t2s(item.title), S.t2s(item.paragraphs.join('|')), S.t2s(item.author)])
        })
      }
    })
    let sql = 'insert into tangshi (title,content,author) values ?';
    query(sql, (err, val, fields) => {
      if (err) {
        return console.log(err)
      }
      console.log('唐诗完成');
    }, [vals])

  })
}