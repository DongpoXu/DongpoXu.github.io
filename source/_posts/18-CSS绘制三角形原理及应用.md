---
title: CSS绘制三角形原理及应用
abbrlink: 4842f834
date: 2019-05-09 17:23:51
updated: 2019-05-09 17:23:51
tags:
  - CSS
  - 绘图
categories:
  - 前端
---

在从 PSD 到 HTML 页面的过程中，免不了要遇到一个问题：“这个小图标，可以用 CSS 效果实现，也可以切图下来，到底该怎么选择呢？？？”

在此我个人的选择一般都是，用 CSS 实现，当然切图然后实现也是聪明人的办法，但是我觉得学好一个技术最关键的不是学习，而是使用。学了不用都是假把式。学了 CSS 有机会让你炫技，不用是大傻。

最常见的一类小图标就是三角形，今天我来总结一下用 CSS 实现三角形的原理。<!--more-->网上相关资料较多，讲的也都很好，个人博客主要还是用于记录分享，毫无商业前景，不喜勿喷。

## 原理

### CSS 盒模型

盒子模型包括了：margin-border-padding-content

<img src="CSS盒模型.png" style="height:150px; border:none;" alt="CSS盒模型"></img>

其中，在上下左右的边框交界处，都形成了斜线，利用这一特性，我们可以通过设置不同的上下左右边框的宽度和颜色，可以得到小三角、小梯形等；调整宽度大小可以调节三角形的形状。

## 应用

### 示例 1

我们首先尝试上下左右颜色区分，并将 border 的宽度给大一点，看看效果。

```css
div {
  height: 30px;
  width: 30px;
  border-width: 30px;
  border-style: solid;
  border-color: #cd1076 #bf3eff #b3ee3a #6495ed;
}
```

<img src="示例1.png" style="height:150px; border:none;" alt="示例1"></img>

### 示例 2

接下来我们把 content 宽度设置为 0

```css
div {
  height: 0;
  width: 0;
  border-width: 30px;
  border-style: solid;
  border-color: #cd1076 #bf3eff #b3ee3a #6495ed;
  overflow: hidden; /* 这里设置overflow, font-size, line-height */
  font-size: 0; /*是因为, 虽然宽高度为0, 但在IE6下会具有默认的 */
  line-height: 0; /* 字体大小和行高, 导致盒子呈现被撑开的长矩形 */
}
```

<img src="示例2.png" style="height:150px; border:none;" alt="示例2"></img>

这时我们可以看到，已经出现了四个颜色不同的三角形了。

### 示例 3

接下来我们把其中三种颜色设置为和背景颜色一样，只保留一种颜色的对比，代码如下：

```css
div {
  height: 0;
  width: 0;
  border-width: 30px;
  border-style: solid;
  border-color: #cd1076 transparent transparent transparent;
  overflow: hidden;
  font-size: 0;
  line-height: 0;
}
```

<img src="示例3.png" style="height:150px; border:none;" alt="示例3"></img>

#### IE6 下

在 IE6 下，不支持透明，需要将余下三条边的 border-style 设置为 dashed 即可。

代码如下：

```css
div {
  height: 0;
  width: 0;
  border-width: 30px;
  border-style: solid dashed dashed dashed;
  border-color: #cd1076 transparent transparent transparent;
  overflow: hidden;
  font-size: 0;
  line-height: 0;
}
```

### 示例 4

同理，我们消去相邻的两个三角形，会得到一个以对角线为斜边的大三角形。

```css
div {
  height: 0;
  width: 0;
  border-width: 30px;
  border-style: solid dashed dashed dashed;
  border-color: #cd1076 #bf3eff transparent transparent;
  overflow: hidden;
  font-size: 0;
  line-height: 0;
}
```

<img src="示例4.png" style="height:150px; border:none;" alt="示例4"></img>

### 示例 5

这样我们设置 border-width 为不同的值：

```css
div {
  height: 0;
  width: 0;
  border-width: 20px 40px 30px 20px;
  border-style: solid;
  border-color: #cd1076 transparent transparent transparent;
  overflow: hidden;
  font-size: 0;
  line-height: 0;
}
```

效果如下：

<img src="示例5.png" style="height:150px; border:none;" alt="示例5"></img>

就是说我们只要设置不同的宽度值，可以得到任意形状的三角形，完美。

**注意**：用来绘制三角形的必须是 block 元素。

## 参考

[CSS 三角形的实现原理及运用](http://caibaojian.com/css-border-triangle.html)
[css3 实现三角形、扇形和特殊的形状等](https://blog.csdn.net/ganyingxie123456/article/details/77934790)
