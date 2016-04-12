/**
 * Created by john on 2016/4/9.
 */



    function cleanAd() {

//////清掉广告
    var ad=document.getElementsByClassName("top-banner-ad-container");
//alert("清除的广告类长度"+ad.length);
    if(ad.length){
        document.body.removeChild(ad[0]);
    }

    var richlink=document.getElementsByClassName("element-rich-link");
//alert("richlink长度"+richlink.length);
    if(richlink.length){
        richlink[0].style.display="none";
    }

    var newad=document.getElementsByClassName("rich-link__container");
//alert("rich-link__container的长度"+newad.length);
    if(newad.length){

        newad[0].style.display="none";
    }

    var rightad=document.getElementsByClassName("content__secondary-column js-secondary-column");
    if(rightad.length){
        rightad[0].style.display="none";
    }

    var leftad=document.getElementsByClassName("content__meta-container js-content-meta js-football-meta");
//alert("左侧广告的长度"+leftad.length);
    if(leftad.length){
        leftad[0].style.display="none";
    }

    var leftlink=document.getElementsByClassName("element element-rich-link");

    if(leftlink.length){
        leftlink[0].style.display="none";
    }

    var footer=document.getElementsByClassName("content-footer");
//alert("footer长度是"+footer.length);
    if(footer.length){
        footer[0].style.display="none";
    }

    var google_image_div=document.getElementById("google_image_div");
    if(google_image_div){
        google_image_div.style.display="none";
    }

    var dfp=document.getElementById("dfp-ad--inline1");
    if(dfp){
        dfp.style.display="none";
    }
}

alert("使用js创建一个结构");
window.setInterval(cleanAd,1000);

createpanel();
drag();

//////
var news=document.getElementsByClassName("content__main tonal__main tonal__main--tone-news");
//alert("这个类的div共（划词区域）"+news.length);
//news.setAttribute("onmouseup","message()");
news[0].onmouseup=message;

var header=document.getElementsByClassName("content__head tonal__head tonal__head--tone-news");
if(header){
    header[0].onmouseup=message;
}


function model() {
    alert("helloooooooo");
    var newnode=document.createElement("div");
    newnode.className="complain";
   /* newnode.style.width="100px";
    newnode.style.height="100px";
    newnode.style.backgroundColor="red";*/
    document.body.appendChild(newnode);

}

document.addEventListener('DOMContentLoaded', function () {

   // model();

   /* checkLoginStatus();
    document.querySelector('button').addEventListener('click', click);
    document.querySelector('input').addEventListener('keydown', keydown);
    document.querySelector('#jump').addEventListener('click', addWord);
    document.querySelector('#sound').addEventListener('click', playSound);
    document.querySelector('#sound').addEventListener('mouseover', playSound);*/
});





///////////////////////4.9用js注入css和其他的方法

/*var link = document.createElement('link');
document.head.appendChile(link);
link .setAttribute('rel','stylesheet');
link .setAttribute('href','./clean.css');
link .setAttribute('type','text/css');*/

/////////////////////////////

function createpanel() {

    var div_mainpanel=document.createElement("div");
    div_mainpanel.id="mainpanel";
    var div_info=document.createElement("div");
    div_info.className="info";
    div_info.innerHTML="拖动区域";
    var div_title=document.createElement("div");
    div_title.id="title";
    div_title.appendChild(div_info);
    var div_content=document.createElement("div");
    div_content.id="content";
    var div_ui_boxyClose=document.createElement("div");
    div_ui_boxyClose.id="ui_boxyClose"
    div_mainpanel.appendChild(div_title);
    div_mainpanel.appendChild(div_content);
    div_mainpanel.appendChild(div_ui_boxyClose);
    document.body.appendChild(div_mainpanel);
    div_mainpanel.style.display="none";
}


function getByClass(className, parent) {
    var oParent = parent ? document.getElementById(parent) : document;
    var eles = [];
    elements = oParent.getElementsByTagName('*');
    for (var i = 0; i < elements.length; i++) {

        if (elements[i].className == className) {
            eles.push(elements[i]);
        }
    }
    return eles;
}

// window.onload = drag;
/*window.onload=function () {
    alert("使用js创建一个结构");
    createpanel();
    drag();

};*/

function message() {
    //alert("选择了一部分");

    var oMainpanel = document.getElementById("mainpanel");
    var content=document.getElementById("content");
    var selection=window.getSelection();
    var jsonrq={};
    jsonrq.greeting=""+selection;
   // alert("选中的内容是"+jsonrq.greeting);

    var winW = document.documentElement.clientWidth || document.body.clientWidth;
    var bound=winW-210;
    var leftbound=event.clientX;
    var data=null;
    if(selection.anchorOffset != selection.extentOffset) {
       // alert("前台选中的单词是："+JSON.stringify(jsonrq));

        //sendInterval = setInterval(function() {
            chrome.extension.sendMessage(jsonrq, function(result) {
                //if (result && result.definition) {
                    data=result;
                    alert("!!!!" + result.definition);
                    //content.innerHTML = ""+selection+"的意思："+"<br/>"+result.definition;
                   // clearInterval(sendInterval);
                //}
            });
        //}, 100);


        //alert("函数外data"+data);
        if (oMainpanel.style.display == "none") {
            if(leftbound>bound){leftbound=bound;}
            oMainpanel.style.left = leftbound + 'px';
            oMainpanel.style.top = event.clientY + 'px';
            oMainpanel.style.display = "block";
        }
        ///////不一定需要这一个
        else{
            if(leftbound>bound){leftbound=bound;}
            oMainpanel.style.display = "none" ;
            oMainpanel.style.left = leftbound + 'px';
            oMainpanel.style.top = event.clientY + 'px';
            oMainpanel.style.display = "block";
        }

        content.innerHTML = data.definition;
    }
    else{oMainpanel.style.display = "none";
    }
}

function drag() {
    var oTitle = document.getElementById("title");
    //拖拽功能
    oTitle.onmousedown = fnDown;
    //关闭功能
    var oClose=document.getElementById("ui_boxyClose");
    oClose.onclick=function () {
        document.getElementById("mainpanel").style.display="none";
        event.stopPropagation();

    };
    /* document.body.onclick=function () {
     var oMainpanel=document.getElementById("mainpanel");
     if(oMainpanel.style.display=="none"){
     oMainpanel.style.display="block";
     }
     }*/
}

function fnDown(event) {
    var oDrag = document.getElementById("mainpanel"),
        event = event || window.event,
        disX = event.clientX - oDrag.offsetLeft,
        disY = event.clientY - oDrag.offsetTop;

    document.onmousemove = function (event) {
        event = event || window.event;
        fnMove(event, disX, disY);

    };
    document.onmouseup = function () {
        document.onmousemove = null;
    };

    /*  document.onmousemove=function (event) {
     event=event||window.event;
     //document.title=event.clientX+","+event.clientY;
     oDrag.style.left=event.clientX+'px';
     oDrag.style.top=event.clientY+'px';

     }*/

}




function fnMove(e, posX, posY) {
    var oDrag = document.getElementById("mainpanel");
    var l = e.clientX - posX;
    var t = e.clientY - posY;
    var winW = document.documentElement.clientWidth || document.body.clientWidth;
    var winH = document.documentElement.clientHeight || document.body.clientHeight;
    var maxW = winW - oDrag.offsetWidth-10;
    var maxH = winH - oDrag.offsetHeight;

    if (l < 0) {
        l = 0;
    }
    else if (l > maxW) {
        l = maxW;
    }

    if (t < 0) {
        t = 5;
    }
    else if (t > maxH) {
        t = maxH;
    }

    oDrag.style.left = l + 'px';
    oDrag.style.top = t + 'px';

}
