---
title: Hexo升级NexT
abbrlink: 6b13abeb
date: 2019-05-29 20:00:08
updated: 2019-05-29 20:00:08
tags:
  - Hexo
  - Next
categories:
  - Hexo
---

很久没有登录 NexT 官网了，这几天去官网查看，发现 NexT 已经升级到 NexT7 了。便想到了升级主题的方法。一查资料发现好像升级还可以提升访问速度。那就必须得大干一番了。

## 升级 Hexo

首先进行 Hexo 版本升级

Hexo 版本升级可以通过 npm 实现，相关命令如下：

<!--more-->

```text
npm i hexo-cli -g
npm update
```

再输入<code>hexo vesion</code>查看当前版本，发现版本已经更新成功了。

## 升级 NexT

接下来升级 NexT 主题版本

事关软件，凡事都要先查资料，github，官方文档等等。我们按照官方文档链接[从 NexT v5.1.x 更新](https://github.com/theme-next/hexo-theme-next/tree/master/docs/zh-CN)一步步来，从 NexT5 升级到 6 并没有太大的变动，而且不需要对原本的主题进行修改，只需要把新主题下载下来引入即可。然后按照官方文档所说的，将各种自己的配置文件引入到新主题中即可。

### 移动配置文件

1.将之前的主题配置文件 config.yml 对照修改到新的主题配置文件。注意不要直接复制过来。**文件都不一样，里面很多配置内容也不同，不推荐直接复制。**

2.移动自定义的 CSS 配置，NexT5 的 next/source/css/\_custom/\* 和 NexT6 的 next/source/css/\_variables/\* 中。**注意要同时在 NexT6 的 next/source/css/\_custom/\_中也复制一份。**

3.自定义的排布配置，它们应在 next/layout/\_custom/\* 中。

4.任何其它可能的附加自定义内容；为了定位它们，你可以通过某些工具在仓库间比较。**比如自定义的百度推广，百度分享文件修改，页面崩溃欺骗等等自定义的文件。**

### Clone 仓库

克隆新的 v6.x 仓库到任一异于 next 的目录（如 next-reloaded）：

```text
git clone https://github.com/theme-next/hexo-theme-next themes/next-reloaded
```

如此，你可以在不修改原有的 NexT v5.1.x 目录的同时使用 next-reloaded 目录中的新版本主题。

### 配置 Hexo

将主题文件夹名称改为你想要的，比如我改为 next7(发现具体版本为 7.1.x)，然后在 Hexo 的 config.yml 文件中修改如下：

```text
theme: next7
```

如此，你的 next7 主题将在生成站点时被加载。这时，你也可以随时和之前的老版本做切换。

### 配置语言

从 v6.0.3 版本起，zh-Hans 改名为 zh-CN：<https://github.com/theme-next/hexo-theme-next/releases/tag/v6.0.3>

升级到 v6.0.3 及以后版本的用户，需要显式修改\_config.xml 里的 language 配置，否则语言显示不正确。

## 遇到问题

配置完毕之后，本地运行，发现只有侧边栏，文章内容位置没有显示。打开控制台调试。

> 在控制台中显示，fancybox 没有找到。

于是我们定位到<code>主题</code>><code>source</code>><code>lib</code>中，没有找到 fancybox 文件，看来需要下载。

在主题配置文件中，查找 fancybox，将 fancybox 配置为 true，可以看到有下载链接。

```text
# Fancybox. There is support for old version 2 and new version 3.
# Please, choose only any one variant, do not need to install both.
# For install 2.x: https://github.com/theme-next/theme-next-fancybox
# For install 3.x: https://github.com/theme-next/theme-next-fancybox3
fancybox: true
```

告诉你要下载这个 fancybox，那就下载吧。

1.命令行定位到 next7 主题文件夹下

```text
cd next7
```

2.下载 fancybox 文件

```text
git clone https://github.com/theme-next/theme-next-fancybox3 source/lib/fancybox
```

再次重新开启本地服务，发现页面完美运行，剩下的就自己修修补补吧。其实官网也给出了怎么按照 fancybox 文件，放出链接[fancyBox 2 for NexT](https://github.com/theme-next/theme-next-fancybox)
