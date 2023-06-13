---
title: Github&Coding分流
tags:
  - Hexo
  - Github&Coding
categories:
  - Hexo
abbrlink: 6c7c1a97
date: 2019-04-12 17:36:31
updated: 2019-04-12 17:36:31
---

我的博客搭建起来了，嗯，搭建博客的目的在于可以在自己解决问题的同时可以帮助到其他人，所以我百度搜索了一下自己的博客，然鹅，啥都没有，我就纳了闷了，当年那个博客咋就可以搜到的呢？？当时可把我牛逼坏了。这就是不做笔记的弊端啊～～其实当年的博客是在阿里云买的服务器，所以要方便的多，这个是在 Github 上托管的，就比较复杂了。

## 分流部署

因为 Github 是国外的，访问速度还是有些慢的，所以呢，想起之前朋友推荐的码云 Page，然后就也想在国内部署一套托管平台。查了些资料，发现 Coding 这个腾讯云开发平台不错，那就部署在这里吧。

<!--more-->

### 建设 Coding 仓库

在**[Coding 官网](https://coding.net)**注册账号，然后验证啥的，创建自己的仓库（注意和自己用户名一样），然后上传你的公钥，打开 Pages

![Coding打开Pages](Coding打开Pages.png)

在设置中绑定域名，打开 HTTPS 访问，添加 SSL 证书。

![CodingPages设置](CodingPages设置.png)

### 配置 Hexo

在项目配置文件\_config.yml 下配置 repo，我的如下所示，注意：**冒号后面有空格！**

```text
deploy:
  - type: git
    repository:
      github: git@github.com:DongpoXu/DongpoXu.github.io.git
      coging: git@git.dev.tencent.com:DongpoXu/DongpoXu.git
    branch: master
```

然后 hexo g -d 部署一下～

这时候你会发现俩都可以访问了，但是！！！

### 分流

注意！！！有可能会**被欺骗**，打开调试页面。选择网络，然后刷新。

![未配置DNS访问页面](未配置DNS访问页面.png)

注意右边的 server: Coding Pages，问题来了，你访问的时候到底是访问了 Github 还是 Coding 呢？？

这就需要我们再去做 DNS 解析了。需要配置默认 Coding，境外 Github。

打开域名解析界面，我的配置如下：

![域名解析](域名解析.png)

其中两个 IP 分别为 Coding 和 Github 的 IP。

### 大功告成

到此境内境外访问就分流了，通过开关 VPN 测试成功。

ฅ>ω<\*ฅ
撒花~ ^\_^ ~花撒

啪唧～～撒个屁，╭(°A°`)╮

百度收录了嘛，Google 收录了嘛，你能搜到了嘛！！！不能，详情就，且看下文吧。

## 搜索引擎收录

哦，百度不要我，完结

撒花~ ^\_^ ~花撒

╭(°A°`)╮

哈哈哈，就是速度慢了点，耐性等一礼拜的，就 ok 了～+～+

详情见 [Hexo搜索引擎收录](../74300b65/)
