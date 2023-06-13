---
title: Hexo添加各种功能
tags:
  - Hexo
  - 插件
categories:
  - Hexo
abbrlink: 515a5aad
date: 2019-04-18 17:50:08
updated: 2019-04-21 12:34:55
---

为自己的博客添加以下功能：

- 评论、打赏
- 动态玩偶
- 点击红心
- 网易云音乐
- 分享功能

## 目的

美化自己的博客，给博客添加评论、打赏、玩偶、红心、分享以及网易云音乐功能，让博客变得精彩，让生活变得精彩。

<!--more-->

## 评论功能

hexo 支持很多外部评论插件:

- HyperComments: **<https://www.hypercomments.com>** （来自俄罗斯的评论系统，使用谷歌账号注册。有墙，有时不太方便）
- 来必力: **<https://livere.com>** （来自韩国，使用邮箱注册）
- 畅言: **<http://changyan.kuaizhan.com>** （安装需要备案号，不太好用）
- Gitment: **<https://github.com/imsun/gitment>** （据说有些小 bug，比如说每次需要手动初始化，登录时会跳到主页）
- Valine: **<https://github.com/xCss/Valine>** (基于 Leancloud 的极简风评论系统）

我选用了 **[来必力](https://www.livere.com)**，因为 **[NexT 官方文档](http://theme-next.iissnan.com)** 中这个比较简单。

### 第一步：注册账号

在来必力官网：**<https://www.livere.com>** 注册账号。

### 第二步：安装

点击最上方的安装，选择 City 免费版本。

![来必力安装](来必力安装.png)

点击现在安装。出现如下界面

![来必力代码](来必力代码.png)

选中 **uid** 并复制。

### 第三步：配置

打开主题配置文件 **\_config.yml**，定位到 livere_uid 字段，粘贴上刚刚复制的 UID。完成。

## 打赏功能

### 基本

打赏功能，不需要太复杂花哨的功能的话，就直接在配置文件中写入图片就好。

```text
# Reward
reward_comment: 如果您读文章后有收获，可以打赏我喝咖啡哦～
wechatpay: /images/wechat.png
alipay: /images/alipay.png
```

### 扩展版本

自己创建 swig 文件，以及 css 文件。

如下步骤： 1.在/themes/random/source/css 新建 donate.css

```css
.donate_bar {
  text-align: center;
  margin-top: 5%;
}

.donate_bar a.btn_donate {
  display: inline-block;
  width: 82px;
  height: 82px;
  margin-left: auto;
  margin-right: auto;
  background: url(img.gif) no-repeat;
  -webkit-transition: background 0s;
  -moz-transition: background 0s;
  -o-transition: background 0s;
  -ms-transition: background 0s;
  transition: background 0s;
}

.donate_bar a.btn_donate:hover {
  background-position: 0 -82px;
}

.donate_bar .donate_txt {
  display: block;
  color: #9d9d9d;
  font: 14px/2 "Microsoft Yahei";
}

.donate_bar.hidden {
  display: none;
}

.post-donate {
  margin-top: 45px;
}

#donate_guide {
  height: 310px;
  width: 500px;
  margin: 0 auto;
}

#donate_guide img {
  height: 350px;
  height: 350px;
}
```

2.在 themes/random/layout/includes 下新建 donate.swig

```swig
<! -- 添加捐赠图标 -->
<div class ="post-donate">
    <div id="donate_board" class="donate_bar center">
        <a id="btn_donate" class="btn_donate" href="javascript:;" title="打赏"></a>
        <span class="donate_txt">
           ↑<br>
           喜欢文章就打赏一包辣条吧！
        </span>
        <br>
      </div>
    <div id="donate_guide" class="donate_bar center hidden" >
        <!-- 方式一：
            ![](img.png)
            ![](img.png)
         -->
        <!-- 方式二；
            step1：在_config.yml中添加配置
                Alipay: /img/Alipay.jpg
                WeChatpay: /img/WeChatpay.jpg
            step2：此处两张图片的路径分别设置为如下
                <img src="<%- theme.root_url %><%=theme.Alipay%>"
                <img src="<%- theme.root_url %><%=theme.WeChatpay%>"
        -->
        <!-- 支付宝打赏图案
        <img src="alipay.png" alt="支付宝打赏"> -->
        <!-- 微信打赏图案 -->
        <img src="wechat.png" alt="微信打赏">
    </div>
    <script type="text/javascript">
        document.getElementById('btn_donate').onclick = function(){
            $('#donate_board').addClass('hidden');
            $('#donate_guide').removeClass('hidden');
        }
    </script>
</div>
<! -- 添加捐赠图标 -->
```

3.在 post.swig 合适位置中添加(想在那个页面放都可以)，不知道放那的话，在后添加

```yml
{% if theme.donate %}
  {% include 'includes/donate.swig' %}
{% endif %}
```

4.打开主题配置文件\_config.yml，在里面最后写下：

```text
#是否开启打赏功能
donate: true
```

## 玩偶功能

### 第一步：获取插件

npm install --save hexo-helper-live2d

### 步骤二：选择自己喜欢的萌妹子

可以到 github 中查看，选择喜欢的妹子造型

```text
live2d-widget-model-chitose
live2d-widget-model-epsilon2_1
live2d-widget-model-gf
live2d-widget-model-haru/01 (use npm install --save live2d-widget-model-haru)
live2d-widget-model-haru/02 (use npm install --save live2d-widget-model-haru)
live2d-widget-model-haruto
live2d-widget-model-hibiki
live2d-widget-model-hijiki
live2d-widget-model-izumi
live2d-widget-model-koharu
live2d-widget-model-miku
live2d-widget-model-ni-j
live2d-widget-model-nico
live2d-widget-model-nietzsche
live2d-widget-model-nipsilon
live2d-widget-model-nito
live2d-widget-model-shizuku
live2d-widget-model-tororo
live2d-widget-model-tsumiki
live2d-widget-model-unitychan
live2d-widget-model-wanko
live2d-widget-model-z16
```

例如我选择： live2d-widget-model-wanko

### 步骤三：安装

```js
npm install live2d-widget-model-miku
```

在主题配置文件 \_config.yml 下配置

```text
live2d:
  enable: true
  scriptFrom: local
  pluginRootPath: live2dw/
  pluginJsPath: lib/
  pluginModelPath: assets/
  tagMode: false
  debug: false
  model:
    use: live2d-widget-model-wanko
    scale: 1
    hHeadPos: 0.5
    vHeadPos: 0.618
  display:
    position: right
    width: 150
    height: 300
  mobile:
    show: true
    scale: 0.5
  react:
    opacityDefault: 0.7
    opacityOnHover: 0.2
```

然而我试了，这个 plug 现在还不是很稳定，配置很多不生效。
比如我把配置文件放在系统配置，我的玩偶就变成狗狗了。

## 红心功能

类似页面崩溃欺骗，利用 js 实现即可。

在/themes/next/source/js/src 下新建文件 clicklove.js ，接着把如下代码粘贴到 clicklove.js 文件中。

```text
!function(e,t,a){function n(){c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),o(),r()}function r(){for(var e=0;e<d.length;e++)d[e].alpha<=0?(t.body.removeChild(d[e].el),d.splice(e,1)):(d[e].y--,d[e].scale+=.004,d[e].alpha-=.013,d[e].el.style.cssText="left:"+d[e].x+"px;top:"+d[e].y+"px;opacity:"+d[e].alpha+";transform:scale("+d[e].scale+","+d[e].scale+") rotate(45deg);background:"+d[e].color+";z-index:99999");requestAnimationFrame(r)}function o(){var t="function"==typeof e.onclick&&e.onclick;e.onclick=function(e){t&&t(),i(e)}}function i(e){var a=t.createElement("div");a.className="heart",d.push({el:a,x:e.clientX-5,y:e.clientY-5,scale:1,alpha:1,color:s()}),t.body.appendChild(a)}function c(e){var a=t.createElement("style");a.type="text/css";try{a.appendChild(t.createTextNode(e))}catch(t){a.styleSheet.cssText=e}t.getElementsByTagName("head")[0].appendChild(a)}function s(){return"rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"}var d=[];e.requestAnimationFrame=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,1e3/60)}}(),n()}(window,document);
```

在/themes/next/layout/\_layout.swig 文件末尾添加：

```swig
<!-- 页面点击小红心 -->
<script type="text/javascript" src="/js/src/clicklove.js"></script>
```

## 网易云音乐

### 生成外链

登陆网易云音乐 **<http://music.163.com>** 搜索自己喜欢的音乐，然后点击生成外链

![网易云生成外链](网易云生成外链.png)

外链内容如下：

![外链内容](外链内容.png)

### 放置外链

复制 HTML 代码部分放入自己想要放入的页面位置即可。

我这里放入了 layout/\_macro/sidebar.swig 中。

```swig
{% if theme.background_music %}
  <div>
    <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=36921126&auto=1&height=66"></iframe>
  </div>
{% endif %}
```

位置自己调整一下就好啦，最终效果图如下：

![ ](网易云效果图.png)

## 分享功能

### 百度分享

hexo 已经集成了 baidushare，只需要在主题配置文件中打开配置即可
在配置百度分享功能时需指定其 type，type 可以为 button 活着 slide

```text
baidushare:
  type: slide
  baidushare: true
```

有一点需要特别注意，baidushare 不支持 https。所以我们需要手动解决这个问题。解决方法就是把这个文件放在我们自己的目录下。

### 解决 https 分享

访问链接：[static 文件夹](https://github.com/hrwhisper/baiduShare)

将压缩包下载到本地，解压后，将 static 文件夹保存至博客项目 themes/next/source 目录下。

### 修改百度分享模板

打开 themes/next/layout_partials/share/baidushare.swig，修改 **末尾** 代码

将

```swig
.src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
```

改为

```swig
.src='/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
```

最后重新生成下，就能展示分享功能了。

参考链接：
[百度分享不支持 Https 的解决方案](https://github.com/hrwhisper/baiduShare)
[Hexo+Github 搭建个人博客(三)——百度分享集成](https://blog.csdn.net/cl534854121/article/details/76121105?locationNum=6&fps=1)
