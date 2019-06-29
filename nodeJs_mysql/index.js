var query = require("./db");
let fs = require('fs');
query('select * from lunyu',function (err,vals,fields) {
  for(let i in vals){
    let json = {id : vals[i].id,title:vals[i].chapter,content:vals[i].content};
    fs.writeFile(`${vals[i].id}.json`,json,function () {
      console.log(`${vals[i].id}.json`)
    })
  }
});