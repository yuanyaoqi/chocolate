# chocolate
电商网站-登录注册页/个人中心
## 所用技术
* 页面：HTML&css，JavaScript，原生ajax
* 服务器：node.js express框架
* 数据库：mysql

## 页面功能
* 登录注册验证
* 个人中心查看订单，并确认收货
* 修改个人信息
* 增删收货地址等

## 功能实现
登录注册（通过ajax判断该用户名是否被注册）
```
function userRegis() {
    var uservalue=document.getElementsByClassName("username")[1].value;
    var pwdvalue=document.getElementsByClassName("userpwd")[1].value;
    var result=document.getElementById("regisResult");
    if(uservalue==""||pwdvalue=="") {
        result.innerHTML = "用户名及密码不能为空！";
        result.style.color = "red";
        return;
    }
    var httprequst;
    if(window.XMLHttpRequest){
        httprequst=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        httprequst=new ActiveXObject("Microsoft.XMLHTTP");
    }
    httprequst.open("post","userregis.do");
    httprequst.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    httprequst.onreadystatechange=function(){
        if(httprequst.readyState==4&&httprequst.status==200){
                result.innerHTML="注册成功！";
                result.style.color="grey";
        }
    }
    httprequst.send("username="+uservalue+"&&userpwd="+pwdvalue);
}
//验证用户名是否被注册
function usernameCheck() {
    var uservalue=document.getElementsByClassName("username")[1];
    var result=document.getElementById("nameResult");
    var httprequst;
    if(window.XMLHttpRequest){
        httprequst=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        httprequst=new ActiveXObject("Microsoft.XMLHTTP");
    }
    httprequst.open("post","usernamecheck.do");
    httprequst.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    httprequst.onreadystatechange=function(){
        if(httprequst.readyState==4&&httprequst.status==200){
            var responsedata=JSON.parse(httprequst.responseText);
            console.log(responsedata);
            if(responsedata==""){
                result.innerHTML="该用户名可以注册";
                result.style.color="grey";
                return;
            }
            else{
                result.innerHTML=" ' "+uservalue.value+" ' "+"已被注册";
                result.style.color="red";
                uservalue.value="";
            }
        }
    }
    httprequst.send("username="+uservalue.value);
}
```
个人中心部分:获取订单
```
function orderQuery() {
    var orderlist=document.getElementById("orderlist");
    orderlist.innerHTML='';
    var httprequest;
    if(window.XMLHttpRequest){
        httprequest=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        httprequest=new ActiveXObject("Microsoft.XMLHTTP");
    }
    httprequest.open("post","orderquery.do");
    httprequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    httprequest.onreadystatechange=function(){
        if(httprequest.readyState==4&&httprequest.status==200){
            var responsedata=JSON.parse(httprequest.responseText);
            for(var i=0;i<responsedata.length;i++){
                if(responsedata[i].orderstate=="配送中") {
                    orderlist.innerHTML = orderlist.innerHTML + '<div><span class="orderid">' + 
                        responsedata[i].orderid + '</span><span class="ordernumber">' + responsedata[i].allnumber 
                        + '</span><span class="orderprice">' + responsedata[i].allprice + 
                        ' 元</span><span class="orderstate">' + responsedata[i].orderstate + 
                        '</span><div class="spanbutton" onclick="orderinfoquery(this)">查看详情</div><div class="spanbutton" onclick="orderconfirm(this)">确认收货</div><br><br></div>';
                }
                else{
                    orderlist.innerHTML = orderlist.innerHTML + '<div><span class="orderid">' + 
                        responsedata[i].orderid + '</span><span class="ordernumber">' + responsedata[i].allnumber + 
                        '</span><span class="orderprice">' + responsedata[i].allprice + ' 元</span><span class="orderstate">'
                        + responsedata[i].orderstate + '</span><div class="spanbutton" onclick="orderinfoquery(this)">查看详情</div><br><br></div>';
                }
            }
        }
    }
    httprequest.send("userid="+userid);
}
```
服务器搭建
```
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
```
DAO层代码
```
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
```
