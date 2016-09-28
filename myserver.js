/**
 * Created by yuanyaoqi on 16/7/18.
 */
var myExpress=require("./server/node_modules/express");
var userDao=require("./server/Dao/userDao");
var profileDao=require("./server/Dao/profileDao");
var myWeb=myExpress();
myWeb.set("port",2000);
myWeb.configure(function () {
    myWeb.use(myExpress.logger("dev"));
    myWeb.use(myExpress.bodyParser());
    myWeb.use(myExpress.methodOverride());
    myWeb.use(myWeb.router);
    myWeb.use(myExpress.static(__dirname+"/client"));
    myWeb.use(myExpress.favicon());
    myWeb.use(myExpress.errorHandler());
});
myWeb.listen(myWeb.get("port"),function(){
    console.log("服务器已启动");
});

// 登录注册
myWeb.post("/userlogin.do",userDao.userlogin);
myWeb.post("/userregis.do",userDao.userregis);
myWeb.post("/usernamecheck.do",userDao.usernamecheck);

// 个人中心
myWeb.post("/profilequery.do",profileDao.profilequery);
myWeb.post("/pwdchange.do",profileDao.pwdchange);
myWeb.post("/oldpwdcheck.do",profileDao.oldpwdcheck);
myWeb.post("/addressquery.do",profileDao.addressquery);
myWeb.post("/addressadd.do",profileDao.addressadd);
myWeb.post("/addressset.do",profileDao.addressset);
myWeb.post("/addressdelect.do",profileDao.addressdelect);
myWeb.post("/orderquery.do",profileDao.orderquery);
myWeb.post("/orderinfoquery.do",profileDao.orderinfoquery);
myWeb.post("/orderconfirm.do",profileDao.orderconfirm);
myWeb.post("/collectquery.do",profileDao.collectquery);

