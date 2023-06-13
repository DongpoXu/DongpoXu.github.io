---
title: Hexo图片相关
tags:
  - Hexo
  - asset-image
  - fancybox
categories:
  - Hexo
abbrlink: 2200ffc8
date: 2020-07-14 20:38:54
---

这篇文章是我在写博客的过程中遇到的关于**图片显示**的问题总结。

本来还有其他文章需要整理，但是又担心在写作过程中把刚解决的问题忘记了，所以先行记录。

主要围绕：**如何在博客中显示图片**？**asset-image**以及**fancybox**。

1. 原生引用在文章中显示图片
2. asset-image在主页中显示图片
3. 修改 fancybox

<!--more-->

### 在文章中显示图片

首先，第一点，如何在文章中显示图片？

网上基本上都可以查到相关的资料，一般是安装 **asset-image** 插件，然后修改 **post_asset_folder** 值为 true 即可。

如果说，只是在文章页面中显示图片，那么采用 markdown 的原生引用方式即可。
例如：**\!\[图片描述\]\(测试图片\)**

采用这种原生的引用方式，必须在文章所在文件夹中，对应每个文章，都需要一个同名的文件夹用来存放图片。这时候，在系统的配置选项中修改 **post_asset_folder** 值为 true，hexo 在 new 一篇文章时，会自动新建一个同名文件夹。

如果 hexo 打开了 fancybox，就可以做到，显示图片，和点击放大图片。

### 在主页中显示图片

第二点，如何在主页显示图片？

用 hexo 的小伙伴都知道，主页显示的是所有文章，为了更好的对文章进行展示，我们都会用到

\<!--more--\>

这个标签，来使得每篇文章显示缩略部分。

这样，有些图片我们想要显示在缩略部分，但是主页的索引路径是 hostname://port，所以我们在文章页面通过原生引用方式显示的图片是无法显示在主页的。

此时，我们需要安装一个 asset-image 的插件，输入：

```text
npm install https://github.com/CodeFalling/hexo-asset-image --save
```

由于本身的 asset-image 有 bug ，我们需要在 node_modules 中寻找到 hexo-asset-image 插件，修改 index.js 内容为以下：

```js
"use strict";
var cheerio = require("cheerio");

// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
function getPosition(str, m, i) {
  return str.split(m, i).join(m).length;
}

var version = String(hexo.version).split(".");
hexo.extend.filter.register("after_post_render", function (data) {
  var config = hexo.config;
  if (config.post_asset_folder) {
    var link = data.permalink;
    if (version.length > 0 && Number(version[0]) == 3)
      var beginPos = getPosition(link, "/", 1) + 1;
    else var beginPos = getPosition(link, "/", 3) + 1;
    // In hexo 3.1.1, the permalink of "about" page is like ".../about/index.html".
    var endPos = link.lastIndexOf("/") + 1;
    link = link.substring(beginPos, endPos);

    var toprocess = ["excerpt", "more", "content"];
    for (var i = 0; i < toprocess.length; i++) {
      var key = toprocess[i];

      var $ = cheerio.load(data[key], {
        ignoreWhitespace: false,
        xmlMode: false,
        lowerCaseTags: false,
        decodeEntities: false,
      });

      $("img").each(function () {
        if ($(this).attr("src")) {
          // For windows style path, we replace '\' to '/'.
          var src = $(this).attr("src").replace("\\", "/");
          if (!/http[s]*.*|\/\/.*/.test(src) && !/^\s*\//.test(src)) {
            // For "about" page, the first part of "src" can't be removed.
            // In addition, to support multi-level local directory.
            var linkArray = link.split("/").filter(function (elem) {
              return elem != "";
            });
            var srcArray = src.split("/").filter(function (elem) {
              return elem != "" && elem != ".";
            });
            if (srcArray.length > 1) srcArray.shift();
            src = srcArray.join("/");
            $(this).attr("src", config.root + link + src);
            console.info &&
              console.info("update link as:-->" + config.root + link + src);
          }
        } else {
          console.info && console.info("no src attr, skipped...");
          console.info && console.info($(this));
        }
      });
      data[key] = $.html();
    }
  }
});
```

这时，引用图片的方式，就可以采用 asset_img 的引用方式了，这种引用方式，可以实现在主页文章缩略中显示图片。
引用格式如下：

```text
{% asset_img 单链表图例.png %}
```

如果你的 hexo 安装了 fancybox，或者说一些压缩的插件，可能在编辑文章的过程中，出现 **no src attr, skipped...**这种情况，不要慌，应该是图片链接没有 src 导致的，不碍事。将 hexo-asset-image 的 index.js 中的两段 console 注释掉即可。

```js
//console.info && console.info("no src attr, skipped...");
//console.info && console.info($(this));
```

### 修改 fancybox

还有 fancybox 和 Hexo-NexT 的关系，我这个版本应该是 NexT7，也有可能是别人改过的，其中 theme/next/source/lib 中没有 fancybox，所以在开启 fancybox 后，会导致在本地调试过程中，没有网络的情况下，localhost 无法访问。
同理还有 lazyload。因为我个人爱去书店写东西，经常没有网络，所以我把 fancybox 和 lazyload 关闭，问题留待之后解决。

问题解决，通过查找 theme.fancybox 所在位置，定位到 head.swig 和 vendors.swig 两个文件，在设置 fancybox 为 true 时，会引用外部 cdn，我们将外部 cdn 改为本地文件。

我们首先下载 fancybox 的库，点击[**这里:fancybox 库**](https://github.com/fancyapps/fancybox/releases/tag/v3.5.7)将内容解压缩到 theme/theme-name/source/lib/文件夹下，然后在**fancybox_css_uri**后面修改

```text
**//cdn.jsdelivr.net/npm...**
```

为

```text
**fancybox/dist/jquery.fancybox.min.css**
```

至此，就可以解决 fancybox 本地加载的问题了。
