---
title: canvas绘图写字
abbrlink: d95146f2
date: 2019-06-24 10:55:49
updated: 2019-06-25 14:22:01
tags:
  - canvas
  - 设计模式
categories:
  - 前端
---

内容借鉴慕课网 [学写一个字](https://www.imooc.com/learn/284)，老师[@liuyubobobo](https://www.imooc.com/t/108955)讲的不错，值得学习。

学一个技术，最重要的就是练。我自己还是个没啥想法的人，那就借鉴别人的想法，跟着老师学习，模仿大神。

本练习目标是在 PC 和移动端完成一个手写板，以此来练习 canvas 的基础知识。

<!--more-->

## 绘制米字格

首先要绘制米字格，第一步当然是在 html 中添加 canvas：

```html
<canvas id="canvas">您的浏览器不支持canvas</canvas>
```

然后定义相应的样式。

注意不推荐在 CSS 中定义 canvas 的大小，因为 CSS 定义的 canvas 大小只是它在 html 文档中显示的大小，而不是具体的 canvas 的分辨率。如果想要定义分辨率的话，通常要定义 width 和 height，在 JS 中定义会更好。

进行一段绘制的时候，可以将代码进行封装，另外，如果进行了状态设置，为了不然设置的状态影响到我们其他部分的绘制，要使用 **context.save();** 和 **context.restore();** 这样就不会影响其他部分的状态。

代码如下：

```javascript
let canvasWidth;
let canvasHeight = (canvasWidth = 800);
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeight;
// 绘制米字格：
function drawGrid() {
  context.save();
  context.strokeStyle = "rgb(230,11,9)";
  // 绘制外框
  context.beginPath();
  context.moveTo(3, 3);
  context.lineTo(canvasWidth - 3, 3);
  context.lineTo(canvasWidth - 3, canvasHeight - 3);
  context.lineTo(3, canvasHeight - 3);
  context.closePath();
  context.lineWidth = 6;
  context.stroke();

  // 绘制米字
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(canvasWidth, canvasHeight);
  context.moveTo(canvasWidth, 0);
  context.lineTo(0, canvasHeight);
  context.moveTo(canvasWidth / 2, 0);
  context.lineTo(canvasWidth / 2, canvasHeight);
  context.moveTo(0, canvasHeight / 2);
  context.lineTo(canvasWidth, canvasHeight / 2);
  context.lineWidth = 1;
  context.stroke();
  context.restore();
}
```

## 鼠标响应

我们的目的是要在 PC 端用鼠标来写字，那我们就需要对鼠标的时间做一个响应。

分别有 onmousedown, onmouseup, onmouseout, onmousemove。我们对每一个事件做响应的操作。

注： e.preventDefault(); 组织浏览器默认动作。（虽然在这个练习的鼠标事件处并没有什么用，但是为了规范写上好一些）

## 坐标转换

画布位置的屏幕和鼠标点击的屏幕位置需要调整。
我们获取鼠标给回来的文档坐标，然后减去 canvas 的 left 和 top 即可。

使用 **canvas.getBoundingClientRect()** 获取 canvas 距离上边缘和左边缘的距离即可。

通过对象进行数据传递

## 鼠标绘制实现

在鼠标移动的时候，利用循环在短时间绘从上一次的位置到当前位置绘制直线。

粗线条问题：如果线条过粗，绘制的直线就变成了一个个矩形，会导致绘制的线条有毛边。

利用 **context.lineCap = 'round'** 以及 **context.lineJoin = 'round'** 使得线条更加自然。

## 运笔速度对画笔影响

类似一条线的绘制，从初始到终止位置有距离 S 和时间 T，我们通过计算出速度 V 来改变笔画的速度。速度越快画笔越细。

由于速度的变化其实很快，带来的数值变化也非常的大，所以我们需要记录 lastLineWidth 来使得画笔的宽度变化变得更平滑一些。

代码如下：

```javascript
// 鼠标速度太快导致不平滑，利用之前的信息做过度
if (lastLineWidth === -1) {
  return resultLineWidth;
} else {
  return lastLineWidth * (7 / 10) + resultLineWidth * (1 - 7 / 10);
}
```

## 完整代码

如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>学写一个字</title>
    <meta
      name="viewport"
      content="width=device-width,height = device-height,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"
    />
    <script src="../../jquery-3.3.1/jquery-3.3.1.min.js"></script>
    <link rel="stylesheet" href="css/main.css" />
  </head>
  <body>
    <canvas id="canvas">
      您的浏览器不支持canvas
    </canvas>
    <div id="controller">
      <div id="black_btn" class="color_btn color_btn_selected"></div>
      <div id="blue_btn" class="color_btn"></div>
      <div id="green_btn" class="color_btn"></div>
      <div id="red_btn" class="color_btn"></div>
      <div id="orange_btn" class="color_btn"></div>
      <div id="yellow_btn" class="color_btn"></div>
      <div id="clear_btn" class="op_btn">清除</div>
      <div class="clearFix"></div>
    </div>
    <script src="js/main.js"></script>
  </body>
</html>
```

```css
#canvas {
  display: block;
  margin: 0 auto;
  border: 1px solid #aaa;
}

#controller {
  margin: 0 auto;
}

.op_btn {
  float: right;
  margin: 10px 0 0 10px;
  border: 2px solid #aaa;
  width: 80px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  text-align: center;
  -webkit-border-radius: 5px 5px;
  -moz-border-radius: 5px 5px;
  border-radius: 5px 5px;
  cursor: pointer;
  background-color: white;
  font-weight: bold;
  font-family: "Microsoft Sans Serif";
}

.op_btn:hover {
  background-color: #def;
}

.clearFix {
  clear: both;
}

.color_btn {
  float: left;
  margin: 10px 10px 0 0;
  border: 5px solid white;
  width: 40px;
  height: 40px;
  border-radius: 5px 5px;
  cursor: pointer;
}

.color_btn:hover {
  border: 5px solid violet;
}

.color_btn_selected {
  border: 5px solid blueviolet;
}

#black_btn {
  background-color: black;
}

#blue_btn {
  background-color: blue;
}

#green_btn {
  background-color: green;
}

#red_btn {
  background-color: red;
}

#orange_btn {
  background-color: orange;
}

#yellow_btn {
  background-color: yellow;
}
```

```javascript
let canvasWidth;
let canvasHeight = (canvasWidth = Math.min(800, $(window).width() - 20));

let strokeColor = "black";
let isMouseDown = false;
let lastLoc = { x: 0, y: 0 };
let lastTimeStamp = 0;
let lastLineWidth = -1;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;

function windowToCanvas(x, y) {
  // 窗口坐标系转换为canvas坐标系
  let bbox = canvas.getBoundingClientRect();
  return { x: Math.round(x - bbox.left), y: Math.round(y - bbox.top) };
}

// 适配底部宽度
$("#controller").css("width", canvasWidth + "px");

drawGrid();

$("#clear_btn").click(function() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  drawGrid();
});

$(".color_btn").click(function(e) {
  $(".color_btn").removeClass("color_btn_selected");
  $(this).addClass("color_btn_selected");
  strokeColor = $(this).css("background-color");
});

function beginStroke(point) {
  isMouseDown = true;
  lastLoc = windowToCanvas(point.x, point.y);
  lastTimeStamp = new Date().getTime();
}

function endStroke() {
  isMouseDown = false;
}

function moveStroke(point) {
  // console.log('mouse move')
  let curLoc = windowToCanvas(point.x, point.y);
  let curTimeStamp = new Date().getTime();
  let s = calcDistance(curLoc, lastLoc); // 路程
  let t = curTimeStamp - lastTimeStamp; // 时间

  let lineWidth = calcLineWidth(t, s);

  // TODO: draw
  context.beginPath();
  context.moveTo(lastLoc.x, lastLoc.y);
  context.lineTo(curLoc.x, curLoc.y);
  context.strokeStyle = strokeColor;
  context.lineWidth = lineWidth;
  context.lineCap = "round"; // 解决线变粗导致的线条衔接问题
  context.lineJoin = "round"; // 线条衔接问题
  context.stroke();

  lastLoc = curLoc;
  lastTimeStamp = curTimeStamp;
  lastLineWidth = lineWidth;
}

canvas.onmousedown = function(e) {
  e.preventDefault();
  beginStroke({ x: e.clientX, y: e.clientY });
};
canvas.onmousemove = function(e) {
  e.preventDefault();
  if (isMouseDown) {
    moveStroke({ x: e.clientX, y: e.clientY });
  }
};
canvas.onmouseup = function(e) {
  e.preventDefault();
  endStroke();
};
canvas.onmouseout = function(e) {
  e.preventDefault();
  endStroke();
};

canvas.addEventListener("touchstart", function(e) {
  e.preventDefault();
  touch = e.touches[0];
  beginStroke({ x: touch.pageX, y: touch.pageY });
});
canvas.addEventListener("touchmove", function(e) {
  e.preventDefault();
  if (isMouseDown) {
    touch = e.touches[0];
    moveStroke({ x: touch.pageX, y: touch.pageY });
  }
});
canvas.addEventListener("touchend", function(e) {
  e.preventDefault();
  endStroke();
});

let maxLineWidth = 30;
let minLineWidth = 1;
let maxStrokeV = 10;
let minStrokeV = 0.1;

function calcLineWidth(t, s) {
  let v = s / t;
  let resultLineWidth;
  if (v <= minStrokeV) {
    resultLineWidth = maxLineWidth;
  } else if (v >= maxStrokeV) {
    resultLineWidth = minLineWidth;
  } else {
    resultLineWidth =
      maxLineWidth -
      ((v - minStrokeV) / (maxStrokeV - minStrokeV)) *
        (maxLineWidth - minLineWidth);
  }
  console.log(resultLineWidth);
  // 鼠标速度太快导致不平滑，利用之前的信息做过度
  if (lastLineWidth === -1) {
    return resultLineWidth;
  } else {
    return lastLineWidth * (7 / 10) + resultLineWidth * (1 - 7 / 10);
  }
}

function calcDistance(loc1, loc2) {
  // 计算两点距离
  return Math.sqrt(
    (loc1.x - loc2.x) * (loc1.x - loc2.x) +
      (loc1.y - loc2.y) * (loc1.y - loc2.y)
  );
}

function drawGrid() {
  context.save();
  context.strokeStyle = "rgb(230,11,9)";
  // 绘制外框
  context.beginPath();
  context.moveTo(3, 3);
  context.lineTo(canvasWidth - 3, 3);
  context.lineTo(canvasWidth - 3, canvasHeight - 3);
  context.lineTo(3, canvasHeight - 3);
  context.closePath();
  context.lineWidth = 6;
  context.stroke();

  // 绘制米字
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(canvasWidth, canvasHeight);
  context.moveTo(canvasWidth, 0);
  context.lineTo(0, canvasHeight);
  context.moveTo(canvasWidth / 2, 0);
  context.lineTo(canvasWidth / 2, canvasHeight);
  context.moveTo(0, canvasHeight / 2);
  context.lineTo(canvasWidth, canvasHeight / 2);
  context.lineWidth = 1;
  context.stroke();
  context.restore();
}
```
