/**
 * Created by yuanyaoqi on 16/7/18.
 */
var mysql=require("./../node_modules/mysql");
exports.userlogin=function(req,resp){
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"chocolate"
    });
    myconnection.connect();
    var username=req.body.username;
    var password=req.body.userpwd;
    myconnection.query("select * from users where username=? and userpwd=?",[username,password],function(err,data) {
        console.log("login");
        resp.send(data);
    });
    myconnection.end();
};
exports.userregis=function(req,resp){
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"chocolate"
    });
    myconnection.connect();
    var username=req.body.username;
    var password=req.body.userpwd;
    myconnection.query("insert into users(username,userpwd) value(?,?)",[username,password],function(err,data) {
        console.log("regis");
        resp.send(data);
    });
    myconnection.end();
};
exports.usernamecheck=function(req,resp){
    var myconnection=mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root",
        port:"3306",
        database:"chocolate"
    });
    myconnection.connect();
    var username=req.body.username;
    myconnection.query("select * from users where username=?",[username],function(err,data) {
        console.log("namecheck");
        resp.send(data);
    });
    myconnection.end();
};