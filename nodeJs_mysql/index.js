let query = require('./db');
let fs = require('fs');
let S = require('chinese-s2t');
let path = require('path');

{
  //论语
  fs.readFile('../../c/lunyu/lunyu.json', (err, res) => {
    let data = JSON.parse(res);
    let vals = [];
    for (let i in data) {
      let item = data[i];
      vals.push([ S.t2s(item.chapter), S.t2s(item.paragraphs.join('|')) ]);
    }
    let sql = `insert into lunyu (title,content) values ?`;
    query(sql, (err, val, fileds) => {
      if (err) {
        return console.log(err)
      }
      console.log('论语完成');
    }, [vals])
  })
}
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
{
  //唐作者
  fs.readFile('../../c/tangshi/authors.tang.json', (err, res) => {
    let data = JSON.parse(res);
    let vals = [];
    data.forEach(item => {
      vals.push([S.t2s(item.name), S.t2s(item.desc)]);
    })
    let sql = 'insert into ts_author (name,description) values ?'
    query(sql,(err,val,fields)=>{
      if(err){return console.log(err);}
      console.log('唐诗作者完成')
    },[vals])
  })
}
{
  //宋诗
  fs.readdir('../../c/songshi/', (err, files) => {
    if (err) {
      return console.log(err)
    }
    let vals = [];
    files.forEach((file) => {
      if (file.indexOf('poet.song') > -1) {
        // console.log(path.join('../../c/tangshi/',file))
        let data = JSON.parse(fs.readFileSync(path.join('../../c/songshi/', file)));
        data.forEach(item => {
          vals.push([S.t2s(item.title), S.t2s(item.paragraphs.join('|')), S.t2s(item.author)])
        })
      }
    })
    let sql = 'insert into songshi (title,content,author) values ?';
    query(sql, (err, val, fields) => {
      if (err) {
        return console.log(err)
      }
      console.log('宋诗完成');
    }, [vals])
  })
}
{
  //宋作者
  fs.readFile('../../c/songshi/authors.song.json', (err, res) => {
    let data = JSON.parse(res);
    let vals = [];
    data.forEach(item => {
      vals.push([S.t2s(item.name), S.t2s(item.desc)]);
    })
    let sql = 'insert into ss_author (name,description) values ?'
    query(sql,(err,val,fields)=>{
      if(err){return console.log(err);}
      console.log('宋诗作者完成')
    },[vals])
  })
}
{
  //诗经
  fs.readFile('../../c/shijing/shijing.json', (err, res) => {
    let data = JSON.parse(res);
    let vals = [];
    data.forEach(item => {
      vals.push([S.t2s(item.title), S.t2s(item.chapter),S.t2s(item.section),S.t2s(item.content.join('|'))]);
    })
    let sql = 'insert into shijing (title,chapter,section,content) values ?'
    query(sql,(err,val,fields)=>{
      if(err){return console.log(err);}
      console.log('诗经完成')
    },[vals])
  })
}
{
  //词
  fs.readdir('../../c/ci/', (err, files) => {
    if (err) {
      return console.log(err)
    }
    let vals = [];
    files.forEach((file) => {
      if (file.indexOf('ci.song') > -1) {
        // console.log(path.join('../../c/tangshi/',file))
        let data = JSON.parse(fs.readFileSync(path.join('../../c/ci/', file)));
        data.forEach(item => {
          vals.push([S.t2s(item.rhythmic), S.t2s(item.paragraphs.join('|')), S.t2s(item.author)])
        })
      }
    })
    let sql = 'insert into ci (title,content,author) values ?';
    query(sql, (err, val, fields) => {
      if (err) {
        return console.log(err)
      }
      console.log('词完成');
    }, [vals])
  })
}
{
  //词作者
  fs.readFile('../../c/ci/author.song.json', (err, res) => {
    console.log(res)
    let data = JSON.parse(res);
    let vals = [];
    data.forEach(item => {
      vals.push([S.t2s(item.name), S.t2s(item.description)]);
    })
    let sql = 'insert into ci_author (name,description) values ?'
    query(sql,(err,val,fields)=>{
      if(err){return console.log(err);}
      console.log('词作者完成')
    },[vals])
  })
}
