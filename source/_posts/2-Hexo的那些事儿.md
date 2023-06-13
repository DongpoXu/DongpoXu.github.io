---
title: Hexo的那些事儿
tags:
  - Hexo
categories:
  - Hexo
abbrlink: 5b1da34a
date: 2019-04-10 21:51:58
updated: 2019-04-10 21:51:58
---

本文记录作者在使用 Hexo 写博客的过程中遇到的种种问题，做成 Hexo 的那些事儿集合，不定时更新

## 配置问题

先将常用的配置项总结一下

重要的配置文件有两个\_config.yml，一个是主题配置文件，一个是系统配置文件。分别在根目录和 themes 目录下

<!--more-->

- 系统配置文件:
  - title: 主题设置
  - subtitle: 小标题设置
  - author: 作者信息设置
  - language: 语言设置
- 主题配置文件:
  - favicon: 图标设置
  - footer: 页脚设置
  - menu: 菜单设置
  - scheme: 主题设置
  - sidebar: 侧边栏设置
  - auto_excerpt: 预览设置
  - baidu_analytics: 百度收录

这基本上就是常用的一些设置了。

### 怎么修改模版主题内部的信息？

例如：标题，页脚信息，图标，语言等

我们首先要去查看对应主题的官方文档，文档一般都会有详细的介绍。

### 怎么让文章只显示预览，不全文显示？

两种方法：

1. 主题设置文件\_config.yml 中 auto_excerpt 将其使能即可
2. 使用<!--more--\>作为文章分隔即可

这两种方法在使用效果上是有不同的...

- 第一种方法，会把所有的文本集中，不考虑内部换行结构等，全部作为预览显示。
- 第二种方法较好，会保留当前文本的内部结构，看起来更加整洁，并且预览内容可控制。

### 移动端怎么显示侧边栏？

在 sidebar 配置项下，onmobile 配置为 true 即可

**注意**：遇到问题，我设置了但是手机端显示不了，估计是分辨率导致的问题，留待解决。Chrome 调试下可以显示。

## 功能扩展

### 使用 LeanCloud 统计页面访问次数

```text
本文环境：
Hexo + Next v5.1.4
```

在 Hexo 博客中，借助 LeanCloud 第三方服务来实现统计页数访问次数的功能。

#### 配置 LeanCloud

- 进入 LeanCloud 官网<https://leancloud.cn/>并注册账号，验证邮箱
- 创建应用：**控制台 -> 创建应用(开发版)**
  - 应用名称可以随意输入，后面还可以修改，我用的是 test；
- 创建 Class：点击刚创建的 test 应用，创建一个 Class 表用来保存我们的博客访问数据。
  - 此处创建的 Class 名字必须为 **Counter**，用来保证与 NexT 主题的修改相兼容；
  - ACL 权限选择 **无限制**，避免后续因为权限的问题导致次数统计显示不正常。

![创建Class](创建Class.png)

创建 Class 完成之后，新创建的 Counter 表会显示在左侧，这时再切换到 test 应用的 **设置 -> 应用 Key** 界面：

![复制AppKey](复制AppKey.png)

#### 配置文件

把你的 AppID 和 AppKey 复制出来。

```text
leancloud_visitors:
  enable: true # 这里要设置成 true
  app_id: joaeddf4hsqudUUwx4gIvGF6-gzGzoHsz
  app_key: E9UJsJpw1omCHuS22PdSpKoh
```

这时再重新部署博客，就可以正常使用文章阅读量统计的功能了。

需要特别说明的是：**记录文章访问量的唯一标识符是文章的发布日期和文章的标题，因此要确保这两个数值组合的唯一性，如果你更改了这两个数值，会造成文章阅读数值的清零重计。**

### 添加 Fork me on Github 图标～

偶然看到别人的博客角落有个彩带，写着 Fork me on Github，长这个样子。

#### 效果图

![ForkMe彩带](ForkMe彩带.png)

灰常羡慕，那我能怂嘛，当然要搞一个了～

于是乎，我找到了这俩网站，**[彩带](https://github.blog/2008-12-19-github-ribbons/)** 以及 **[章鱼猫](http://tholman.com/github-corners/)**，需要大家自取哦～

#### 配置样式

然后找一个自己喜欢的样式，复制代码到 themes/next/layout/\_layout.swig 文件中，放在**<div class="headband"\>**的下面，样式啥的需要自己调整位置哦，吼猴～然后就大功告成了。

![Fork完成图](Fork完成图.png)

#### 当当当，注意啦！！！

我发现一件尴尬的事情，这样设置完，在移动端，这个图标还是在，然后和下拉菜单冲突拉，好丑的。

所以，我们需要设置，在移动端不显示。

修改文件/themes/next/layout/\_layout.swig 找到如下代码

```html
<html class="{{ html_class | lower }}" lang="{{ config.language }}">
  <head>
    {% include '_partials/head.swig' %}
    <title>{% block title %}{% endblock %}</title>
    {% include '_third-party/analytics/index.swig' %}
  </head>
</html>
```

在 head 标签里面添加样式

```html
<style>
  .github-corner {
    display: none;
  }
  @media (min-width: 768px) {
    .github-corner {
      display: inline;
    }
  }
</style>
```

然后重启就好啦～

### 添加站内搜索功能～

诶诶，咋添加来着？？？emmmm...

![站内搜索](站内搜索.png)

好像 npm 装个 插件就好了好像是～

#### 当当当当～安装插件

```text
npm install hexo-generator-search
npm install hexo-generator-searchdb
```

#### 修改配置

在你的 Hexo 目录下的\_config.yml 中增加如下配置：

#### 打开 local_search

local_search 下的 enable 设置为 true 即可

### 短地址以及永久地址

每次从博客分享文章给别人都很苦恼，Hexo 默认生成的链接太长了，而且一旦文章名字改变，链接也跟着改变。有没有什么方法让地址尽量短小精悍，同时永久化呢？
感谢 **[rozbo/hexo-abbrlink](https://github.com/rozbo/hexo-abbrlink)**，完美解决。
使用方法也很简单：

npm install hexo-abbrlink --save

在 \_config.yml 配置文件写入

```text
# 更改 permalink 值
permalink: posts/:abbrlink/
# abbrlink config
abbrlink:
  alg: crc32  #support crc16(default) and crc32
  rep: hex    #support dec(default) and hex
```

![短地址before](短地址before.png)
![短地址after](短地址after.png)

**注意啦～**刚改完后，你的所有图片链接啥的都挂掉了，但是不要慌，先 hexo clean，然后重新部署一下就好啦

### 封面模式

推荐插件 hexo-less 类似于预览效果。

但是这个预览效果不影响章内䆟。只需在文章中写 <!--less--\> 作为分割线，less 前的内容会作为摘要，但不作为文章内容的一部分。

如果你想让这篇文章在主页列表中，只显示一张美图，那这个方法就很完美了。
