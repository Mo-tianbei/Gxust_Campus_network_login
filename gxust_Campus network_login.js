// ==UserScript==
// @name         科大校园网自动登录
// @version      0.1
// @author       天涯之北
// @match        http://172.16.1.3
// @match        http://172.16.1.3/?isReback=1
// @include      *://172.16.1.3*
// @include      *://172.16.1.11*
// @description  自动登录校园网，减少等待时间。代码指令只是模拟用户输入点击。
// @description  首次使用需要自行设置自己的账号密码和登录方式
// @note         非编程专业，自学编程自娱自乐，旨在方便登录校园网。
// @note         重点：登录非默认账号时，需关闭该脚本运行
// @note         V0.1,2021/06/06,实现基础功能
// @grant        none
// ==/UserScript==

//变量赋值，初始化设置,用户只需修改对应数值即可
var account_number="";//默认账号设置(请在""中输入你的默认登录账号)
var password="";//默认密码设置(请在""中输入你的默认登录密码)
var drop_down=2;//下拉框的默认选项设置：0为“请选择网络”1为“校园网（免费）”2为“中国电信”

//循环点击，页面加载完成后检查为登录成功页面即停止循环
(function() {
    'use strict';
    var Auto=setInterval(function() {
    //判断是否为登录成功页面    
    if(document.getElementsByName("logout").length==1){
        setTimeout(function stopLoop(){clearInterval(Auto2)},20000);
        clearInterval(Auto);
        var username=document.getElementById("account").innerText;
        //与默认账号不相同时自动注销登录（解决sometime开机自动登录别人账号的bug）
        if(username!=account_number){
            document.getElementsByName("logout")[0].click();//注销
            document.getElementsByClassName("boxy-btn1")[0].click();//确认
        }
    }
    //网络未连接页面，自动点击“重新加载”
    else if(document.getElementsByClassName("blue-button text-button").length==2){
        document.getElementsByClassName("blue-button text-button")[0].click();
    }
    else{
        //登录页面执行写入和登录动作
        document.f1.DDDDD.value=account_number;
        document.f1.upass.value=password;
        document.getElementsByName("ISP_select")[0].selectedIndex=drop_down;
        var Login=document.getElementsByName("0MKKey");//读取登录按钮
        Login[1].click();//点击登录
    }
    },200);
    //判断是否为返回页面
    var Auto2=setInterval(function(){
        if(document.getElementsByName("GobackButton").length==1){
            document.getElementsByName("GobackButton")[0].click();
        }
    },1000); 
})();