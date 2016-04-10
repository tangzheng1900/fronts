/**
 * Created by john on 2016/4/9.
 */

//document.body.style.backgroundColor="red";
model();

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

var link = document.createElement('link');
document.body.appendChile(link);
link .setAttribute('rel','stylesheet');
link .setAttribute('href','./clean.css');
link .setAttribute('type','text/css');

/////////////////////////////
function getloc() {

    //找到需要修改的节点，类，修改样式

}

