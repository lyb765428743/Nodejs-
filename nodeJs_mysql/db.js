let mysql = require('mysql');
let pool = mysql.createPool({
  host:'127.0.0.1',
  user:'root',
  password:'',
  port:3306,
  database:'database'
});
module.exports = function (sql,callback,value) {
  pool.getConnection(function (err,conn) {
    if(err){
      return console.log(err);
    }
    if(value){
      conn.query(sql,value,function (err,val,fileds) {
        conn.release();
        callback(err,val,fileds);
      })
    }else{
      conn.query(sql,function (err,val,fileds) {
        conn.release();
        callback(err,val,fileds);
      })
    }

  })
};

