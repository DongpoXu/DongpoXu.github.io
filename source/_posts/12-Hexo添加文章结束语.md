---
title: Hexo添加文章结束语
abbrlink: 7b48a044
date: 2019-04-26 17:39:34
updated: 2019-04-26 17:39:34
tags:
  - Hexo
categories:
  - Hexo
---

每次文章写完后，在末尾我都喜欢加上：**完结～撒花～** 一类的标识，每个文章都手动去加的话显得很傻～所以考虑利用 Hexo 的模版自动为每个文章添加结束语。

## 新建模版

首先新建我们的结束语模版文件

在/themes/next/layout/\_macro 中新建 passage-end-tag.swig 文件，添加代码至该文件中：

<!--more-->

```swig
<div>
  {% if not is_index %}
    <div style="text-align:center;color: #555;font-size:18px;">End~~ <i class="fa fa-paw"></i> 撒花ฅ&gt;ω&lt;*ฅ花撒</div>
  {% endif %}
</div>
```

## 修改模版

修改 post.swig
打开/themes/next/layout_macro/post.swig 文件，在 post-body 后找一个合适的位置，添加下面内容：

```swig
<div>
  {% if theme.passage_end_tag.enabled and not is_index %}
    {% include 'passage-end-tag.swig' %}
  {% endif %}
</div>
```

## 修改 \_config

打开主题配置文件\_config.yml,在末尾添加：

```text
# 文章结束语
passage_end_tag:
  enabled: true
```

之后效果如下所示～

![完成效果](完成效果.png)
