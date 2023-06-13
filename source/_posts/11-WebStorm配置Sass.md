---
title: WebStorm配置Sass
abbrlink: 40ea6dbe
date: 2019-04-25 17:53:18
updated: 2019-04-25 17:53:18
tags:
  - WebStorm
  - Sass
categories:
  - 编程软件
---

最近有些软件重装了一下，很多插件配置都需要再来一次，发现有些之前的配置问题还是会遇到，就做一些总结，方便自己也方便大家。

我个人比较喜欢 JetBrains 的 IDE，用起来蛮舒服，很省心的感觉。

本文主要将 WebStorm 下配置 Sass，以及 Sass 的自动编译。

## Sass

什么是 Sass，我引用官网的一句话

<!--more-->

> Sass 是对 CSS 的扩展，让 CSS 语言更强大、优雅。 它允许你使用变量、嵌套规则、 mixins、导入等众多功能， 并且完全兼容 CSS 语法。 Sass 有助于保持大型样式表结构良好， 同时也让你能够快速开始小型项目， 特别是在搭配 Compass 样式库一同使用时。

更多 Sass 的使用请阅读[Sass 中文文档](http://sass.bootcss.com)

Sass 现在常见的编译方法有两种，一种是直接用命令行编译；另一种就是利用一些编译工具；例如：腾讯的 koala。上网查询后，发现 WebStorm 中集成了 Sass 的编译。

## Ruby

Sass 是用 Ruby 语言写的，但是两者的语法没有关系，所以学 Sass 不用学 Ruby，只是必须先安装 Ruby，然后再安装 Sass。

Linux 和 Mac 已自带 Ruby，不用再安装。Windows 用户可以从[这里](https://rubyinstaller.org/downloads/)下载 Ruby 的安装程序。

安装过程没什么麻烦的，安装指引安装即可。完成后，在命令行中输入 ruby -v 查看 ruby 版本号，如果可以正确显示版本号，说明安装成功。

```text
➜  ~ ruby -v
ruby 2.3.7p456 (2018-03-28 revision 63024) [universal.x86_64-darwin18]
```

Ruby 安装完毕后，我们要安装 Sass，在命令行中输入 gem install Sass，安装完毕输入 sass -v，如果显示正确版本号，说明 Saaa 安装成功。

```text
➜  ~ sass -v
Ruby Sass 3.7.2
```

## WebStorm

打开 WebStorm 设置界面，在顶部搜索 File Watchers，在右边新建 SCSS 项，过程如下。

![FileWatchers设置](FileWatchers设置.png)

弹出 SASS 设置界面：

![SASS设置](SASS设置.png)

### Program

Program 为你所安装的 Sass 的路径，路径为自己系统对应的 Ruby/bin/sass，例如我的 MAC 系统对应路径为 /usr/local/bin/sass。

### Arguments

Arguments 为配置参数，常见的配置参数如下：

- --style 表示解析后的 css 是什么格式，如：--style compressed，有四种取值分别为：nested，expanded，compact，compressed.
- --sourcemap 表示开启 sourcemap 调试。开启 sourcemap 调试后，会生成一个后缀名为.css.map 文件。 webstorm 是默认开启 sourcemap 的，所以可以不填写
- --debug-info 表示开启 debug 信息，升级到 3.3.0 之后因为 sourcemap 更高级，这个 debug-info 就不太用了。

四种 --style 对应的编译后的样式如下：

```text
// SCSS
a {
  color: #ccc;
  &:hover {
    color: #fff;
  }
}
li {
  float: left;
}

// nested 嵌套型
a {
  color: #ccc; }
  a:hover {
    color: #fff; }

li {
  float: left; }

// expanded 展开型
a {
  color: #ccc;
}
a:hover {
  color: #fff;
}

li {
  float: left;
}

// compact 紧凑型
a { color: #ccc; }
a:hover { color: #fff; }

li { float: left; }

// compressed 压缩型
a{color:#ccc}a:hover{color:#fff}li{float:left}
```

### Output Path

Output Path 是输出文件对应的路径，你想将 SCSS 编译后的 CSS 文件放在什么地方是由这个决定的。

至此新建 SCSS 样式文件，编辑完毕，每次更改保存，都会自动的编译出对应的 CSS 样式文件，WebStorm 配置 Sass 完成。
