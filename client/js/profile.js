/**
 * Created by yuanyaoqi on 16/7/18.
 */
//传递当前用户id
var userid=1;
profileQuery();
orderQuery();

//获取内容体,侧栏标签,添加地址栏,订单详情框
var content=document.getElementById("content");
content.style.transition="all linear .1s";
var titleList=document.getElementsByTagName("li");
var newAddress=document.getElementById("newAddress");
var orderinfobox=document.getElementById("orderinfobox");
var orderinfolist=document.getElementById("orderinfolist");
var orderinfoboxShadow=document.getElementById("orderinfoboxShadow");
//为侧栏标签添加事件
titleList[0].onclick=function () {
    content.style.top="0px";
    titleColorchange();
    titleList[0].style.backgroundColor="gainsboro";
    orderQuery();
}
titleList[1].onclick=function () {
    content.style.top="-500px";
    titleColorchange();
    titleList[1].style.backgroundColor="gainsboro";
    passwordRemove();
}
titleList[2].onclick=function () {
    content.style.top="-1000px";
    titleColorchange();
    titleList[2].style.backgroundColor="gainsboro";
    newAddress.style.opacity="0";
    addressQuery();
}
titleList[3].onclick=function () {
    content.style.top="-1500px";
    titleColorchange();
    titleList[3].style.backgroundColor="gainsboro";
    collectQuery();
}
//获取用户名
function profileQuery() {
    var sidename=document.getElementById("sideName");
    var httprequest;
    if(window.XMLHttpRequest){
        httprequest=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        httprequest=new ActiveXObject("Microsoft.XMLHTTP");
    }
    httprequest.open("post","profilequery.do");
    httprequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    httprequest.onreadystatechange=function(){
        if(httprequest.readyState==4&&httprequest.status==200){
            var responsedata=JSON.parse(httprequest.responseText);
            sidename.innerHTML='欢迎,'+responsedata[0].username;
        }
    }
    httprequest.send("userid="+userid);
}
//标签恢复默认色
function titleColorchange() {
    for(var i=0;i<titleList.length;i++){
        titleList[i].style.backgroundColor="white";
    }
}
//获取订单
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
                    orderlist.innerHTML = orderlist.innerHTML + '<div><span class="orderid">' + responsedata[i].orderid + '</span><span class="ordernumber">' + responsedata[i].allnumber + '</span><span class="orderprice">' + responsedata[i].allprice + ' 元</span><span class="orderstate">' + responsedata[i].orderstate + '</span><div class="spanbutton" onclick="orderinfoquery(this)">查看详情</div><div class="spanbutton" onclick="orderconfirm(this)">确认收货</div><br><br></div>';
                }
                else{
                    orderlist.innerHTML = orderlist.innerHTML + '<div><span class="orderid">' + responsedata[i].orderid + '</span><span class="ordernumber">' + responsedata[i].allnumber + '</span><span class="orderprice">' + responsedata[i].allprice + ' 元</span><span class="orderstate">' + responsedata[i].orderstate + '</span><div class="spanbutton" onclick="orderinfoquery(this)">查看详情</div><br><br></div>';
                }
            }
        }
    }
    httprequest.send("userid="+userid);
}
//获取订单详情
function orderinfoquery(i) {
    orderinfobox.style.display="block";
    orderinfoboxShadow.style.display="block";
    var orderinfoid=i.parentNode.firstChild.textContent;
    var httprequest;
    if(window.XMLHttpRequest){
        httprequest=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        httprequest=new ActiveXObject("Microsoft.XMLHTTP");
    }
    httprequest.open("post","orderinfoquery.do");
    httprequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    httprequest.onreadystatechange=function(){
        if(httprequest.readyState==4&&httprequest.status==200){
            var responsedata=JSON.parse(httprequest.responseText);
            for(var i=0;i<responsedata.length;i++){
                orderinfolist.innerHTML=orderinfolist.innerHTML+'<img src="./images/'+responsedata[i].goodurl+'"><span class="orderinfoname">'+responsedata[i].goodname+'</span><span>'+responsedata[i].goodprice+'</span><span>'+responsedata[i].goodnumber+'</span><br>';
            }
        }
    }
    httprequest.send("orderid="+orderinfoid);
}
//确认收货
function orderconfirm(i) {
    var changeorderid=i.parentNode.firstChild.textContent;
    var confirmresult=window.confirm("确定已收到配送货物?");
    if(confirmresult){
        var httprequest;
        if(window.XMLHttpRequest){
            httprequest=new XMLHttpRequest();
        }else if(window.ActiveXObject){
            httprequest=new ActiveXObject("Microsoft.XMLHTTP");
        }
        httprequest.open("post","orderconfirm.do");
        httprequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        httprequest.onreadystatechange=function(){
            if(httprequest.readyState==4&&httprequest.status==200){
                var responsedata=JSON.parse(httprequest.responseText);
                console.log(responsedata);
            }
        }
        httprequest.send("orderid="+changeorderid);
        orderQuery();
    }
}
//关闭订单详情
function orderinfoboxClose() {
    orderinfobox.style.display="none";
    orderinfoboxShadow.style.display="none";
    orderinfolist.innerHTML="";
}
//清除密码输入框
function passwordRemove() {
    var oldpwd=document.getElementById("oldpwd");
    var newpwd=document.getElementById("newpwd");
    var assurepwd=document.getElementById("assurepwd");
    var pwdresult=document.getElementById("pwdresult");
    pwdresult.innerHTML="";
    oldpwd.value="";
    newpwd.value="";
    assurepwd.value="";
}
//更改密码
function passwordChange() {
    var oldpwd=document.getElementById("oldpwd");
    var newpwd=document.getElementById("newpwd");
    var assurepwd=document.getElementById("assurepwd");
    var pwdresult=document.getElementById("pwdresult");
    if(assurepwd.value!=newpwd.value){
        pwdresult.innerHTML="两次输入的密码不一致,请重新输入";
        pwdresult.style.color="red";
        newpwd.value="";
        assurepwd.value="";
        return;
    }
    if(oldpwd.value==""||newpwd.value==""||assurepwd.value==""){
        pwdresult.innerHTML="输入框不能为空!";
        pwdresult.style.color="red";
        return;
    }
    var httprequest;
    if(window.XMLHttpRequest){
        httprequest=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        httprequest=new ActiveXObject("Microsoft.XMLHTTP");
    }
    httprequest.open("post","pwdchange.do");
    httprequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    httprequest.onreadystatechange=function(){
        if(httprequest.readyState==4&&httprequest.status==200){
            pwdresult.innerHTML="密码更改成功!";
            pwdresult.style.color="grey";
        }
    }
    httprequest.send("newpwd="+newpwd.value+"&&userid="+userid);
}
//确认原密码
function oldpwdCheck() {
    var oldpwd=document.getElementById("oldpwd");
    var pwdresult=document.getElementById("pwdresult");
    if(oldpwd.value==""){
        return;
    }
    var httprequest;
    if(window.XMLHttpRequest){
        httprequest=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        httprequest=new ActiveXObject("Microsoft.XMLHTTP");
    }
    httprequest.open("post","oldpwdcheck.do");
    httprequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    httprequest.onreadystatechange=function(){
        if(httprequest.readyState==4&&httprequest.status==200){
            var responsedata=JSON.parse(httprequest.responseText);
            if(responsedata[0].userpwd!=oldpwd.value){
                pwdresult.innerHTML="原密码输入错误";
                pwdresult.style.color="red";
                oldpwd.value="";
            }
            else{
                pwdresult.innerHTML="";
            }
        }
    }
    httprequest.send("userid="+userid);
}
//获取配送地址
function addressQuery() {
    var addresslist=document.getElementById("addresslist");
    addresslist.innerHTML='';
    var addname=document.getElementById("newaddname");
    var addnumber=document.getElementById("newaddnumber");
    var addinfo=document.getElementById("newaddinfo");
    var addresult=document.getElementById("addresult");
    addname.value="";
    addinfo.value="";
    addnumber.value="";
    addresult.innerHTML="";
    var httprequest;
    if(window.XMLHttpRequest){
        httprequest=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        httprequest=new ActiveXObject("Microsoft.XMLHTTP");
    }
    httprequest.open("post","addressquery.do");
    httprequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    httprequest.onreadystatechange=function(){
        if(httprequest.readyState==4&&httprequest.status==200){
            var responsedata=JSON.parse(httprequest.responseText);
            console.log(responsedata);
            for(var i=0;i<responsedata.length;i++){
                if(responsedata[i].addstate==1){
                    addresslist.innerHTML=addresslist.innerHTML+'<div id="'+responsedata[i].addid+'"><span class="addname">'+responsedata[i].addname+
                        '</span><span class="addnumber">'+responsedata[i].addnumber+'</span><span class="addinfo">'+
                        responsedata[i].addinfo+'</span><span id="defaultadd">默认地址</span><span class="spanbutton" onclick="addressDelete(this)">删除该地址</span><br><br></div>';
                }
                else{
                    addresslist.innerHTML=addresslist.innerHTML+'<div id="'+responsedata[i].addid+'"><span class="addname">'+responsedata[i].addname+
                        '</span><span class="addnumber">'+responsedata[i].addnumber+'</span><span class="addinfo">'+
                        responsedata[i].addinfo+'</span><span class="spanbutton" onclick="addressSet(this)">设为默认地址</span><span class="spanbutton" onclick="addressDelete(this)">删除该地址</span><br><br></div>';
                }
            }
        }
    }
    httprequest.send("userid="+userid);
}
//显示添加地址模块
function addappear() {
    newAddress.style.opacity="1";
}
//添加地址
function addressAdd() {
    var addname=document.getElementById("newaddname");
    var addnumber=document.getElementById("newaddnumber");
    var addinfo=document.getElementById("newaddinfo");
    var addresult=document.getElementById("addresult");
    if(addname.value==""||addnumber.value==""||addinfo.value=="") {
        addresult.innerHTML="输入框不能为空!";
        addresult.style.color="red";
        return;
    }
    var httprequest;
    if(window.XMLHttpRequest){
        httprequest=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        httprequest=new ActiveXObject("Microsoft.XMLHTTP");
    }
    httprequest.open("post","addressadd.do");
    httprequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    httprequest.onreadystatechange=function(){
        if(httprequest.readyState==4&&httprequest.status==200){
            addresult.innerHTML="添加成功!";
            addresult.style.color="grey";
            addname.value="";
            addinfo.value="";
            addnumber.value="";
        }
    }
    httprequest.send("addname="+addname.value+"&&addnumber="+addnumber.value+"&&addinfo="+addinfo.value+"&&userid="+userid);
    addressQuery();
}
//删除地址
function addressDelete(i) {
    var addid=i.parentNode.id;
    var confirmresult=window.confirm("确定删除该地址?");
    if(confirmresult){
        i.parentNode.parentNode.removeChild(i.parentNode);
        var httprequest;
        if(window.XMLHttpRequest){
            httprequest=new XMLHttpRequest();
        }else if(window.ActiveXObject){
            httprequest=new ActiveXObject("Microsoft.XMLHTTP");
        }
        httprequest.open("post","addressdelect.do");
        httprequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        httprequest.onreadystatechange=function(){
            if(httprequest.readyState==4&&httprequest.status==200){
            }
        }
        httprequest.send("addid="+addid);
    }

}
//设置默认地址
function addressSet(i) {
    var addid=i.parentNode.id;
    var confirmresult=window.confirm("确定设置该地址为默认地址?");
    if(confirmresult){
        var httprequest;
        if(window.XMLHttpRequest){
            httprequest=new XMLHttpRequest();
        }else if(window.ActiveXObject){
            httprequest=new ActiveXObject("Microsoft.XMLHTTP");
        }
        httprequest.open("post","addressset.do");
        httprequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        httprequest.onreadystatechange=function(){
            if(httprequest.readyState==4&&httprequest.status==200){
                var responsedata=JSON.parse(httprequest.responseText);
                console.log(responsedata[0].addid);
                var oldadd=document.getElementById(responsedata[0].addid).childNodes[3];
                oldadd.innerHTML='<span class="spanbutton" onclick="addressSet(this)">设为默认地址</span>';
            }
        }
        httprequest.send("addid="+addid);
        i.innerHTML='<span id="defaultadd">默认地址</span>';
    }
}
//获取收藏表
function collectQuery() {
    var collectlist=document.getElementById("collectlist");
    collectlist.innerHTML='';
    var httprequest;
    if(window.XMLHttpRequest){
        httprequest=new XMLHttpRequest();
    }else if(window.ActiveXObject){
        httprequest=new ActiveXObject("Microsoft.XMLHTTP");
    }
    httprequest.open("post","collectquery.do");
    httprequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    httprequest.onreadystatechange=function(){
        if(httprequest.readyState==4&&httprequest.status==200){
            var responsedata=JSON.parse(httprequest.responseText);
            console.log(responsedata[0].goodurl);
            for(var i=0;i<responsedata.length;i++) {
                collectlist.innerHTML = collectlist.innerHTML + '<div class="collectcell"><img src="images/'+responsedata[i].goodurl+'"><h6>'+responsedata[i].goodname+'</h6></div>';
            }
        }
    }
    httprequest.send("userid="+userid);
}
//注销
function logout() {
}
