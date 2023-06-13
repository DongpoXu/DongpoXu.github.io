---
title: Hexo添加页面崩溃欺骗
tags:
  - Hexo
  - JavaScript
categories:
  - Hexo
abbrlink: f4d63b4
date: 2019-04-11 17:11:12
updated: 2019-04-11 17:11:12
---

偶然看到崩溃欺骗是从友链 **[Water Sister](http://www.cduyzh.com/)** 那里看到的，觉得这个页面好好玩，就想搞一个一样的。

## Just Have Fun ～

想法还是可以有的，检测页面是否被隐藏，然后修改 document.title 的值就好，但是！重要是但是，不是借口哈，实在是没摸清楚 Hexo 的结构，我想着说，你不能二话不说直接程序怼人家 js 里面吧。太过分了那就。

<!--more-->

于是乎我去 **Water Sister** 的 Github 上 emmm 表示直接搜索，诶。。好像还真的是怼 js 里面了。

然后陷入了沉思。。。果然最开始想到的就是最直观的。

然后看到一个大神的页面也有这个效果 [asdfv1929 's Home](https://asdfv1929.github.io/)，于是乎，把他的方法扒下来了。

吼吼吼机智懒惰的我～

其实就两个步骤

### 创建 JS 代码

在 next/source/js/src 文件夹下创建 crash_cheat.js，添加代码：

```js
var OriginTitle = document.title
var titleTime
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    $('[rel="icon"]').attr('href', '/images/favicon-error.png')
    document.title = '╭(°A°`)╮页面崩溃啦 ~'
    clearTimeout(titleTime)
  } else {
    $('[rel="icon"]').attr('href', '/images/favicon.png')
    document.title = '(ฅ>ω<*ฅ) 嗨~你好呀~' + OriginTitle
    titleTime = setTimeout(function() {
      document.title = OriginTitle
    }, 2000)
  }
})
```

### 引用 JS 代码

在 next/layout_layout.swig 文件中，添加引用（**注：在 swig 末尾添加**）

```html
<!--崩溃欺骗-->
<script type="text/javascript" src="/js/src/crash_cheat.js"></script>
```
