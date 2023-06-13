---
title: Hexo搜索引擎收录
abbrlink: 74300b65
date: 2019-04-27 17:33:50
updated: 2019-04-27 19:33:50
tags:
  - Hexo
  - 搜索引擎收录
categories:
  - Hexo
---

写博客的目的是为了记录自己的学习和生活。记录自己的同时也分享给别人，但是我们的博客怎么才能被搜索到呢？举例子，我的网站是<https://xudongpo.cn/>，不是有名的网站，不是每个人都知道，那别人通过什么来进入到我的网站呢？

> 通过推广，比如说我**自己**给朋友介绍：“诶哥们，我有个好东西给你，来看看～”(๑•ั็ω•็ั๑)

博客不是为了让别人来访问才写的，而是为了知识的共享。<!--more-->那就一定要博客的内容足够好，可以先被搜索引擎的爬虫抓去的到，别人可以通过百度搜索：XXXX 方法，然后诶～我的页面展示在词条中了。这才是目的。

下面进入正题：

---

## 站点地图

站点地图即 sitemap，是一个页面，上面放置了网站上需要搜索引擎抓取的所有页面的链接。站点地图可以告诉搜索引擎网站上有哪些可供抓取的网页，以便搜索引擎可以更加智能地抓取网站。

### 安装插件：

首先安装 Baidu 和 Google 的站点地图生成插件：

```text
npm install hexo-generator-baidu-sitemap --save
npm install hexo-generator-sitemap --save
```

### 修改配置文件

修改站点配置文件\_config.yml，添加以下内容：

```text
# 自动生成sitemap
sitemap:
  path: sitemap.xml
baidusitemap:
  path: baidusitemap.xml
```

### 生成和部署

hexo g && hexo d

此时，进入 public 目录，你会发现里面有 sitemap.xml 和 baidusitemap.xml 两个文件，这就是生成的站点地图。里面包含了网站上所有页面的链接，搜索引擎通过这两个文件来抓取网站页面。

- sitemap.xml --- 用来提交给 Google
- baidusitemap.xml --- 用来提交给百度

---

## 百度收录

接下来我们看看自己的站点有没有被百度收录？在百度搜索中输入 site:xxx.com 回车，例如我的 site:xudongpo.cn，结果如下：

![site网站成功](site网站成功.png)

能搜索到结果表示被收录了，没有收录的结果如下：

![site网站失败](site网站失败.png)

可以点击提交网址，将网址提交。

我的百度搜索结果如下：

![百度搜索结果](百度搜索结果.png)

### 百度站长平台

然后我们需要先注册并登录百度站长平台：<https://ziyuan.baidu.com/>

1. 添加站点（省略）
2. 验证站点
   - 这里推荐选择 CNAME 验证，更简单，域名解析以下子就好啦
     ![百度CNAME解析](百度CNAME解析.png)
3. 链接提交
   - 百度站长平台的链接提交方式分为自动提交和手动提交两种，当然是推荐自动提交啦～～
     ![自动提交图片](自动提交图片.png)

### 主动推送（实时）

主动推送最为快速的提交方式，是被百度收录最快的推送方式。主动推送需要安装以下插件实现：

```text
npm install hexo-baidu-url-submit --save
```

- 1.修改站点配置文件\_config.yml，添加以下内容：

```text
baidu_url_submit:
  count: 1000 ## 提交最新的一个链接
  host: www.xudongpo.cn ## 在百度站长平台中注册的域名
  token: 6Txxxx # 请注意这是您的秘钥， 所以请不要把博客源代码发布在公众仓库里!
  path: baidu_urls.txt ## 文本文档的地址， 新链接会保存在此文本文档里
```

- 2.其次，记得查看\_config.yml 文件中 url 的值， 必须包含是百度站长平台注册的域名， 比如:

```text
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: https://xudongpo.cn
root: /
# permalink: :year/:month/:day/:title/
permalink: posts/:abbrlink/
```

- 3.最后，加入新的 deployer:

```text
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  - type: git
    repository:
      github: git@github.com:DongpoXu/DongpoXu.github.io.git
      coging: git@git.dev.tencent.com:DongpoXu/DongpoXu.git
    branch: master
  - type: baidu_url_submitter
```

其主动推送的实现原理如下：

> 新链接的产生，hexo generate 会产生一个文本文件，里面包含最新的链接
> 新链接的提交，hexo deploy 会从上述文件中读取链接，提交至百度搜索引擎

### 自动推送

我们需要给博客添加自动推送页面的 JS 代码，在每次页面被访问时，页面 URL 将立即被推送给百度。

修改主题配置文件中 baidu_push 为 true

在 theme/next/source/js 文件夹下新建 baidu.js，代码如下：

```js
(function() {
  var bp = document.createElement("script");
  var curProtocol = window.location.protocol.split(":")[0];
  if (curProtocol === "https") {
    bp.src = "https://zz.bdstatic.com/linksubmit/push.js";
  } else {
    bp.src = "http://push.zhanzhang.baidu.com/push.js";
  }
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bp, s);
})();
```

然后我们需要在每个博文页面中添加 baidu.js 的脚本引用，所以在根目录 scaffolds/post.md 中添加

```text
<script type="text/javascript" src="/js/src/baidu.js"></script>
```

这样我们之后的每个博文页面都会添加自动推送的这个脚本在内。

### sitemap 提交

关于博客的设置已经完毕了，接下来我们需要将生成的站点地图(sitemap)提交给百度了。

- 1.在提交 sitemap 之前，我们先访问以下我们之前生成的 sitemap 文件测试是否成功

在浏览器输入<https://www.xudongpo.cn/baidusitemap.xml>

![sitemap网页](sitemap网页.png)

- 2.提交 sitemap

![sitemap提交](sitemap提交.png)

- 3.输入验证码后提交即可，一般情况下，百度会在一小时内处理该文件

### 添加 robots 协议

在./source/下添加 robots.txt 文件，内容如下：

```text
User-agent: *
Allow: /
Allow: /home/
Allow: /archives/
Allow: /about/
Disallow: /vendors/
Disallow: /js/
Disallow: /css/
Disallow: /fonts/
Disallow: /vendors/
Disallow: /fancybox/

Sitemap: https://xudongpo.cn/sitemap.xml
Sitemap: https://xudongpo.cn/baidusitemap.xml
```

百度收录到这里就完事了，接下来看 Google。

---

## Google 收录

Google 收录相比百度收录要简单一些，进入[Goole 站长平台](https://www.google.com/webmasters/)，需要翻墙。

点击你的站点，如果没有请先添加站点；

然后点击控制台-->抓取-->站点地图，点击右上角添加/测试站点地图按钮，将你的 sitemap.xml 提交测试，测试成功之后重复该步骤进行添加！

---

## 关于优化

SEO 优化具体再说～

如果在过程中遇到什么问题，您可以在评论区提问，也可以在关于页面联系我。
