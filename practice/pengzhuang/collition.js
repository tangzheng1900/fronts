/**
 * Created with JetBrains WebStorm.
 * User: john
 * Date: 16-4-2
 * Time: 下午4:50
 * To change this template use File | Settings | File Templates.
 */
/*
 * 碰撞检测 & 弹幕实例
 * lxrmido@lxrmido.com
 * 2013-8-26
 */

/**
 * 键盘状态
 * @type {Object}
 */
var Keyboard = {
    UP    : 87,
    DOWN  : 83,
    LEFT  : 65,
    RIGHT : 68,

    up    : false,
    down  : false,
    left  : false,
    right : false
}

/**
 * 鼠标状态
 * @type {Object}
 */
var Mouse = {
    downX : 0,
    downY : 0
}

/**
 * 游戏状态
 * @type {Object}
 */
var Game = {
    playing : true
}

/**
 * 工具库
 * @type {Object}
 */
var Util = {
    /**
     * 是否在画板范围内
     * @param  {canvas}   canvas
     * @param  {float}    x
     * @param  {float}    y
     * @return {bool}
     */
    canvasInScope : function(canvas, x, y){
        x = x || Mouse.downX;
        y = y || Mouse.downY;
        return (
            x > canvas.offsetLeft &&
                x < canvas.offsetLeft + canvas.clientWidth &&
                y > canvas.offsetTop &&
                y < canvas.offsetTop + canvas.clientHeight
            );
    },
    /**
     * 位置在画板上的坐标偏移
     * @param  {canvas} canvas
     * @param  {float}  x
     * @param  {float}  y
     * @return {Vect}
     */
    offsetOnCanvas : function(canvas, x, y){
        x = x || Mouse.downX;
        y = y || Mouse.downY;
        var ratioX = canvas.width  / canvas.clientWidth;
        var ratioY = canvas.height / canvas.clientHeight;
        var offsetX = (x - canvas.offsetLeft) * ratioX;
        var offsetY = (y - canvas.offsetTop)  * ratioY;
        return new Vect(offsetX, offsetY);
    }
}

/**
 * 自机
 * @type {Object}
 */
var plane = {
    x : 0,
    y : 0,

    speed : 2,

    map_data : []
}

/**
 * 绘制队列
 * @type {Object}
 */
var Queue = {
    ammo : [],
    initAmmo : function(maxAmmoCount){
        maxAmmoCount = maxAmmoCount || 512;
        for(var i = 0; i < maxAmmoCount; i ++){
            Queue.ammo[i] = null;
        }
    },
    init : function(){
        Queue.initAmmo();
    }
}
Queue.init();

/**
 * 碰撞检测矩阵
 * @type {Object}
 */
var Matrix = {
    /**
     * 自机形状
     * @type {Array}
     */
    plane : [],
    /**
     * 子弹形状
     * @type {Array}
     */
    ammo  : [],
    /**
     * 舞台MAP
     * @type {Array}
     */
    stage : [],
    /**
     * 碰撞位置
     * @type {Array}
     */
    hited : [],
    /**
     * 重置舞台
     */
    init : function(){
        var i,
            n = 800 * 600;
        for(i = 0; i < n; i ++){
            Matrix.stage[i] = 0;
        }
    },
    /**
     * 绘制子弹
     * @param  {float} x
     * @param  {float} y
     * @param  {int}   w
     * @param  {int}   h
     */
    drawAmmo : function(x, y, w, h){
        w = w || 12;
        h = h || 12;
        x = parseInt(x);
        y = parseInt(y);
        var i = 0,
            j = 0,
            k = 0,
            l = 0,
            m = 0,
            n = 0;
        for(i = 0; i < w; i ++){
            for(j = 0; j < h; j ++){
                m = parseInt(j * w + i);
                if(Matrix.ammo[m] > 0){
                    n = parseInt((j + y) * 800 + (i + x));
                    Matrix.stage[n] = 1;
                }
            }
        }
    },
    /**
     * 绘制自机
     * @param  {float} x
     * @param  {float} y
     * @param  {int}   w
     * @param  {int}   h
     */
    drawPlane : function(x, y, w, h){
        w = w || 48;
        h = h || 48;
        x = parseInt(x);
        y = parseInt(y);
        var i = 0,
            j = 0,
            k = 0,
            l = 0,
            m = 0,
            n = 0,
            hit = false;
        Matrix.hited.length = 0;
        for(i = 0; i < w; i ++){
            for(j = 0; j < h; j ++){
                m = parseInt(j * w + i);
                if(Matrix.plane[m] > 0){
                    n = parseInt((j + y) * 800 + (i + x));
                    if(Matrix.stage[n] == 1){
                        Matrix.stage[n] = 2;
                        hit = true;
                        Matrix.hited.push(n);
                    }else{
                        Matrix.stage[n] = 3;
                    }
                }
            }
        }
        return hit;
    }
}
Matrix.init();

Vect = function(x, y){
    this.x = x || 0;
    this.y = y || 0;
}

/**
 * 加速度恒定的子弹
 * @param {float} x
 * @param {float} y
 * @param {float} vx
 * @param {float} vy
 * @param {float} ax
 * @param {float} ay
 */
DirectAmmo = function(x, y, vx, vy, ax, ay){
    this.x   = x  || 400;
    this.y   = y  || 300;
    this.vx  = vx || 2;
    this.vy  = vy || 2;
    this.ax  = ax || 0;
    this.ay  = ay || 0;
    this.die = false;
    this.sx  = x;
    this.sy  = y;
}
/**
 * 加入到绘制队列
 * @return {bool}
 */
DirectAmmo.prototype.queue = function(){
    var i = 0;
    while(i < Queue.ammo.length){
        if(Queue.ammo[i] == null || Queue.ammo[i].die){
            Queue.ammo[i] = this;
            return true;
        }
        i ++;
    }
    return false;
}
/**
 * 移动
 * @return {DirectAmmo}
 */
DirectAmmo.prototype.move = function(){
    this.vx += this.ax;
    this.vy += this.ay;
    this.x  += this.vx;
    this.y  += this.vy;

    if(this.x < 0){
        this.die = true;
    }
    if(this.y < 0){
        this.die = true;
    }
    if(this.x > 800){
        this.die = true;
    }
    if(this.y > 600){
        this.die = true;
    }
    if(this.vx == 0 && this.vy == 0 && this.ax == 0 && this.ay == 0){
        this.die = true;
    }
    return this;
}
/**
 * 一组环状散开的DirectAmmo
 * @param {float} x
 * @param {float} y
 * @param {int}   count
 * @param {float} speed
 * @param {float} ax
 * @param {float} ay
 */
RoundDirectAmmo = function(x, y, count, speed, ax, ay){
    x          = x || 400;
    y          = y || 300;
    count      = count || 32;
    speed      = speed || 2;
    ax         = ax || 0;
    ay         = ay || 0;
    var offset = 0.00001;
    var step   = Math.PI * 2 / count;
    var ammos  = [];
    var i, vx, vy, da;
    for(i = 0; i < count; i++){
        vx = speed * Math.cos(offset);
        vy = speed * Math.sin(offset);
        da = new DirectAmmo(x, y, vx, vy, ax, ay);
        offset += step;

        ammos[ammos.length] = da;
    }
    this.ammos = ammos;
}
/**
 * 加入绘制队列
 * @return {RoundDirectAmmo}
 */
RoundDirectAmmo.prototype.queue = function(){
    var i = 0,
        j = 0;
    while(i < Queue.ammo.length && j < this.ammos.length){
        if(Queue.ammo[i] == null || Queue.ammo[i].die){
            Queue.ammo[i] = this.ammos[j];
            j ++;
        }
        i ++;
    }
    return this;
}
/**
 * 次第加入绘制队列
 * @param  {int} n 加入延时
 * @param  {int} i
 * @return {RoundDirectAmmo}
 */
RoundDirectAmmo.prototype.queue_delay = function(n, i){
    n = n || 10;
    i = i || 0;
    if(this.ammos[i]){
        this.ammos[i].queue();
        var qr = this;
        setTimeout(function(){qr.queue_delay(n, i + 1)}, n);
    }
    return this;
}
/**
 * 圆周运动的子弹
 * @param {float} ox    圆心x
 * @param {float} oy    圆心y
 * @param {float} ow    初始角度
 * @param {float} speed 速度
 * @param {float} r     半径
 * @param {float} a     半径增长加速度
 */
CircleAmmo = function(ox, oy, ow, speed, r, a){
    this.ox  = ox || 400;
    this.oy  = oy || 300;
    this.r   = r  || 5;
    this.a   = a  || 2;
    this.v   = speed || 0.2;
    this.w   = ow || 0.000001;
    this.x   = this.ox + this.r * Math.cos(this.w);
    this.y   = this.oy + this.r * Math.sin(this.w);
    this.die = false;
}
/**
 * 加入绘制队列
 * @return {bool}
 */
CircleAmmo.prototype.queue = function(){
    var i = 0;
    while(i < Queue.ammo.length){
        if(Queue.ammo[i] == null || Queue.ammo[i].die){
            Queue.ammo[i] = this;
            return true;
        }
        i ++;
    }
    return false;
}
/**
 * 移动
 */
CircleAmmo.prototype.move = function(){
    this.w += this.v;
    this.r += this.a;
    this.x  = this.ox + this.r * Math.cos(this.w);
    this.y  = this.oy + this.r * Math.sin(this.w);
    if(this.x < 0){
        this.die = true;
    }
    if(this.y < 0){
        this.die = true;
    }
    if(this.x > 800){
        this.die = true;
    }
    if(this.y > 600){
        this.die = true;
    }
    return this;
}
/**
 * 一组环状的CircleAmmo
 * @param {float} ox
 * @param {float} oy
 * @param {int}   count
 * @param {float} speed
 * @param {float} r
 * @param {float} a
 */
RoundCircleAmmo = function(ox, oy, count, speed, r, a){
    count = count || 32;
    var i,
        ca,
        ammos = [],
        w = 0.00001,
        step = Math.PI * 2 / count;
    for(i = 0; i < count; i ++){
        ca = new CircleAmmo(ox, oy, w, speed, r, a);
        w += step;
        ammos[ammos.length] = ca;
    }
    this.ammos = ammos;
    return this;
}
/**
 * 加入绘制队列
 * @return {RoundCircleAmmo}
 */
RoundCircleAmmo.prototype.queue = function(){
    var i = 0,
        j = 0;
    while(i < Queue.ammo.length && j < this.ammos.length){
        if(Queue.ammo[i] == null || Queue.ammo[i].die){
            Queue.ammo[i] = this.ammos[j];
            j ++;
        }
        i ++;
    }
    return this;
}
/**
 * 次第加入绘制队列
 * @param  {int} n 加入延时
 * @param  {int} i
 * @return {RoundDirectAmmo}
 */
RoundCircleAmmo.prototype.queue_delay = function(n, i){
    n = n || 10;
    i = i || 0;
    if(this.ammos[i]){
        this.ammos[i].queue();
        var qr = this;
        setTimeout(function(){qr.queue_delay(n, i + 1)}, n);
    }
    return this;
}


function test_ammo(){
    var rca = new RoundCircleAmmo(Math.random() * 400 + 100, Math.random() * 300 + 100, 512);
    rca.queue_delay(10);
    setTimeout(function(){test_ammo()}, 8000);
}
test_ammo();

var cvs_plane,	// 自机
    ctx_plane,

    cvs_ammo,	// 子弹
    ctx_ammo,

    cvs,		// 舞台
    ctx,

    cvs_ck,		// 碰撞演示
    ctx_ck;

cvs_plane = document.getElementById('plane');
cvs_plane.height = 48;
cvs_plane.width  = 48;
ctx_plane = cvs_plane.getContext('2d');
ctx_plane.fillStyle = 'rgba(0, 192, 248, 1)';
ctx_plane.beginPath();
ctx_plane.arc(24,24,24,0,Math.PI*2,true);
ctx_plane.closePath();
ctx_plane.fill();
var plane_data = ctx_plane.getImageData(0, 0, 48, 48).data;
for(var i = 0; i < 48 * 48; i ++){
    var dot = i * 4;
    if(plane_data[dot] > 0 || plane_data[dot + 1] > 0 || plane_data[dot + 2] > 0){
        Matrix.plane[i] = 1;
    }else{
        Matrix.plane[i] = 0;
    }
}

cvs_ammo = document.getElementById('ammo');
cvs_ammo.height = 12;
cvs_ammo.width  = 12;
ctx_ammo = cvs_ammo.getContext('2d');
ctx_ammo.fillStyle = 'rgba(255, 255, 255, 0.5)';
ctx_ammo.beginPath();
ctx_ammo.arc(6,6,6,0,Math.PI*2,true);
ctx_ammo.closePath();
ctx_ammo.fill();
var ammo_data = ctx_ammo.getImageData(0, 0, 12, 12).data;
for(var i = 0; i < 12 * 12; i ++){
    var dot = i * 4;
    if(ammo_data[dot] > 0 || ammo_data[dot + 1] > 0 || ammo_data[dot + 2] > 0){
        Matrix.ammo[i] = 1;
    }else{
        Matrix.ammo[i] = 0;
    }
}

cvs = document.getElementById('stage');
cvs.height = 600;
cvs.width  = 800;
ctx = cvs.getContext('2d');
ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, 800, 600);

cvs_ck = document.getElementById('hitck');
cvs_ck.height = 600;
cvs_ck.width  = 800;
ctx_ck = cvs_ck.getContext('2d');
ctx_ck.fillStyle = '#000000';
ctx_ck.fillRect(0, 0, 800, 600);

run();

window.onkeydown = function(e){
    switch(e.keyCode){
        case Keyboard.UP:
            Keyboard.up    = true;
            break;
        case Keyboard.DOWN:
            Keyboard.down  = true;
            break;
        case Keyboard.LEFT:
            Keyboard.left  = true
            break;
        case Keyboard.RIGHT:
            Keyboard.right = true;
            break;
        default:
            break;
    }
}

window.onkeyup = function(e){
    switch(e.keyCode){
        case Keyboard.UP:
            Keyboard.up    = false;
            break;
        case Keyboard.DOWN:
            Keyboard.down  = false;
            break;
        case Keyboard.LEFT:
            Keyboard.left  = false;
            break;
        case Keyboard.RIGHT:
            Keyboard.right = false;
            break;
        default:
            break;
    }
}

window.onclick = function(e){
    Game.playing = true;

    Mouse.downX = e.x || e.clientX;
    Mouse.downY = e.y || e.clientY;

    if(Util.canvasInScope(cvs)){
        var ammo2v = Util.offsetOnCanvas(cvs);
        new RoundDirectAmmo(ammo2v.x, ammo2v.y).queue();
    }

    if(Util.canvasInScope(cvs_ck)){
        var ammo2v = Util.offsetOnCanvas(cvs_ck);
        new RoundDirectAmmo(ammo2v.x, ammo2v.y).queue();
    }
}

function run(){

    if(!Game.playing){
        setTimeout(function(){run()}, 20);
        return;
    }

    if(Keyboard.up    && plane.y > 0){
        plane.y -= plane.speed;
    }
    if(Keyboard.down  && plane.y < 600){
        plane.y += plane.speed;
    }
    if(Keyboard.left  && plane.x > 0){
        plane.x -= plane.speed;
    }
    if(Keyboard.right && plane.x < 800){
        plane.x += plane.speed;
    }

    Matrix.init();

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 800, 600);
    ctx.fillStyle = '#00ff00';
    ctx.drawImage(cvs_plane, plane.x, plane.y);
    var i, j;
    for(i = 0; i < Queue.ammo.length; i ++){
        if(Queue.ammo[i] != null && !Queue.ammo[i].die){
            Queue.ammo[i].move();
            ctx.drawImage(cvs_ammo, Queue.ammo[i].x, Queue.ammo[i].y);
            Matrix.drawAmmo(Queue.ammo[i].x, Queue.ammo[i].y);
        }
    }

    if(Matrix.drawPlane(plane.x, plane.y)){
        //碰撞发生时执行
        // Game.playing = false;
    }

    // 绘制碰撞演示内容
    var ck_data = ctx_ck.createImageData(800, 600);
    for(i = 0, j = 0; i < 480000; i++, j += 4){
        switch(Matrix.stage[i]){
            case 1:
                ck_data.data[j] = 255;
                ck_data.data[j + 1] = 0;
                ck_data.data[j + 2] = 0;
                ck_data.data[j + 3] = 255;
                break;
            case 2:
                ck_data.data[j] = 0;
                ck_data.data[j + 1] = 0;
                ck_data.data[j + 2] = 255;
                ck_data.data[j + 3] = 255;
                break;
            case 3:
                ck_data.data[j] = 0;
                ck_data.data[j + 1] = 255;
                ck_data.data[j + 2] = 0;
                ck_data.data[j + 3] = 255;
                break;
            default:
                ck_data.data[j] = 0;
                ck_data.data[j + 1] = 0;
                ck_data.data[j + 2] = 0;
                ck_data.data[j + 3] = 255;
                break;
        }
    }
    ctx_ck.putImageData(ck_data, 0, 0);

    setTimeout(function(){run()}, 20);
}