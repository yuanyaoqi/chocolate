/**
 * Created by yuanyaoqi on 16/7/13.
 */
var loginBox=document.getElementById("loginBox");
var login=document.getElementById("login");
var regis=document.getElementById("regis");
login.style.webkitTransition="all .2s linear";
regis.style.webkitTransition="all .2s linear";
login.style.top="100px";
regis.style.top="600px";
login.style.opacity="0";
regis.style.opacity="0";
// 弹出登陆框
function loginAppear() {
    loginBox.style.display="block";
    login.style.opacity="1";
}
//隐藏登录框
function loginDisappear() {
    loginBox.style.display="none";
    login.style.top="100px";
    regis.style.top="600px";
    login.style.opacity="0";
    regis.style.opacity="0";
}
//切换为登录
function loginTurn() {
    login.style.top="100px";
    login.style.opacity="1";
    regis.style.top="600px";
    regis.style.opacity="0";
    var uservalue=document.getElementsByClassName("username")[1];
    var pwdvalue=document.getElementsByClassName("userpwd")[1];
    var result=document.getElementById("regisResult");
    var nameresult=document.getElementById("nameResult");
    uservalue.value="";
    pwdvalue.value="";
    result.innerHTML="";
    nameresult.innerHTML="";
}
//切换为注册
function regisTurn() {
    login.style.top="-400px";
    regis.style.top="100px";
    login.style.opacity="0";
    regis.style.opacity="1";
    var uservalue=document.getElementsByClassName("username")[0];
    var pwdvalue=document.getElementsByClassName("userpwd")[0];
    var result=document.getElementById("loginResult");
    uservalue.value="";
    pwdvalue.value="";
    result.innerHTML="";
}
//登录
function userLogin() {
    var uservalue=document.getElementsByClassName("username")[0].value;
    var pwdvalue=document.getElementsByClassName("userpwd")[0].value;
    var result=document.getElementById("loginResult");
    var httprequst;
    if(window.XMLHttpRequest){
        httprequst=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        httprequst=new ActiveXObject("Microsoft.XMLHTTP");
    }
    httprequst.open("post","userlogin.do");
    httprequst.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    httprequst.onreadystatechange=function(){
        if(httprequst.readyState==4&&httprequst.status==200){
            var responsedata=JSON.parse(httprequst.responseText);
            console.log(responsedata);
            if(uservalue==""||pwdvalue==""){
                result.innerHTML="用户名及密码不能为空！";
                result.style.color="red";
                return;
            }
            else {
                if (responsedata=="") {
                    result.innerHTML = "用户名或密码错误!";
                    result.style.color = "red";
                }
                else{
                    result.innerHTML = "登陆成功!";
                    result.style.color = "grey";
                }
            }
        }
    }
    httprequst.send("username="+uservalue+"&&userpwd="+pwdvalue);
}
//注册
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
