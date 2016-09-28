/**
 * Created by yuanyaoqi on 16/7/18.
 */
var mysql=require("./../node_modules/mysql");
exports.profilequery=function(req,resp){
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"chocolate"
    });
    myconnection.connect();
    var userid=req.body.userid;
    myconnection.query("select username from users where userid=?",[userid],function(err,data) {
        console.log("profile");
        resp.send(data);
    });
    myconnection.end();
};
exports.pwdchange=function(req,resp){
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"chocolate"
    });
    myconnection.connect();
    var newpwd=req.body.newpwd;
    var userid=req.body.userid;
    myconnection.query("update users set userpwd=? where userid=?",[newpwd,userid],function(err,data) {
        resp.send(data);
    });
    myconnection.end();
};
exports.oldpwdcheck=function(req,resp){
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"chocolate"
    });
    myconnection.connect();
    var userid=req.body.userid;
    myconnection.query("select userpwd from users where userid=?",[userid],function(err,data) {
        resp.send(data);
    });
    myconnection.end();
};
exports.addressquery=function(req,resp){
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"chocolate"
    });
    myconnection.connect();
    var userid=req.body.userid;
    myconnection.query("select * from address where userid=?",[userid],function(err,data) {
        resp.send(data);
    });
    myconnection.end();
};
exports.addressadd=function(req,resp){
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"chocolate"
    });
    myconnection.connect();
    var userid=req.body.userid;
    var addname=req.body.addname;
    var addnumber=req.body.addnumber;
    var addinfo=req.body.addinfo;
    myconnection.query("insert into address(addname,addnumber,addinfo,userid) value(?,?,?,?)",[addname,addnumber,addinfo,userid],function(err,data) {
        console.log("addaddress");
        resp.send(data);
    });

    myconnection.end();
};
exports.addressset=function(req,resp){
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"chocolate"
    });
    myconnection.connect();
    var addid=req.body.addid;
    myconnection.query("select addid from address where addstate=1",[],function(err,data) {
        console.log("setaddress222");
        resp.send(data);
    });
    myconnection.query("update address set addstate=0",[],function() {
        console.log("setaddress000");
    });
    myconnection.query("update address set addstate=1 where addid=?",[addid],function() {
        console.log("setaddress111");
    });
    myconnection.end();
};
exports.addressdelect=function(req,resp){
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"chocolate"
    });
    myconnection.connect();
    var addid=req.body.addid;
    myconnection.query("delete from address where addid=?",[addid],function() {
        console.log("delect");
    });
    myconnection.end();
};
exports.orderquery=function(req,resp){
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"chocolate"
    });
    myconnection.connect();
    var userid=req.body.userid;
    myconnection.query("select * from orders where userid=?",[userid],function(err,data) {
        console.log("order");
        resp.send(data);
    });
    myconnection.end();
};
exports.orderinfoquery=function(req,resp){
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"chocolate"
    });
    myconnection.connect();
    var orderid=req.body.orderid;
    myconnection.query("select * from orderinfo a join productsinformation b on a.goodid=b.goodid where a.orderid=?;",[orderid],function(err,data) {
        console.log("orderinfo");
        resp.send(data);
    });
    myconnection.end();
};
exports.orderconfirm=function(req,resp){
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"chocolate"
    });
    myconnection.connect();
    var orderid=req.body.orderid;
    myconnection.query("update orders set orderstate='已完成' where orderid=?",[orderid],function(err,data) {
        console.log("confirm");
        resp.send(data);
    });
    myconnection.end();
};
exports.collectquery=function(req,resp){
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"chocolate"
    });
    myconnection.connect();
    var userid=req.body.userid;
    myconnection.query("select * from productsinformation where goodid in (select goodid from goodCollect where userid=?)",[userid],function(err,data) {
        console.log("collect");
        resp.send(data);
    });
    myconnection.end();
};