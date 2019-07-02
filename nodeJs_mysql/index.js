let query = require('./db');
let fs = require('fs');
let S = require('chinese-s2t');
let path = require('path');

{
  //词作者
  fs.readFile('../c/ci/author.song.json',(err,res)=>{
    let data = JSON.parse(res);
    for(let i in data){
      let d = data[i];
      let sql = `insert into ci_author (name,intro_s,intro) values ("${S.t2s(d.name)}","${S.t2s(d.short_description)}","${S.t2s(d.description)}")`;
      query(sql,(err,val,fileds)=>{
        if(err) {return console.log(err)}
        console.log('插入完成')
      })
    }
  });
}

/*{
  //词
  fs.readdir('../c/ci/',(err,files)=>{
    if(err){return console.log(err)}
    files.forEach((file)=>{
      if(file.indexOf('ci.song') !== -1){
        let data = JSON.parse(fs.readFileSync(path.join('../c/ci/', file)));

        data.forEach((item)=>{

          let sql = `insert into ci (title,content,author) values ("${item.rhythmic}","${item.paragraphs.join('|')}","${item.author}")`
          query(sql,(err,val,fileds)=>{
            if(err){return console.log(err)}
            console.log('插入完成')
          })
        })
      }
    })
  })
}*/

{
  //论语
  fs.readFile('../c/lunyu/lunyu.json',(err,res)=>{
    let data = JSON.parse(res);
    let vals = [];
    for(let i in data){
      let item = data[i];
      vals.push([S.t2s(item.chapter),S.t2s(item.paragraphs.join('|'))]);
    }
    let sql = `insert into lunyu (title,content) values ?`;
    query(sql,(err,val,fileds)=>{
      if(err){return console.log(err)}
      console.log('完成');
    },vals)
  })
}
