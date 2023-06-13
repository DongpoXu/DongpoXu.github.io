---
title: Hexo使用Valine评论系统
abbrlink: bf41ab23
date: 2019-05-01 16:17:02
updated: 2020-07-20 20:34:55
tags:
  - Valine
  - Hexo
categories:
  - Hexo
---

前几天给博客添加了来必力评论系统，但是加载速度实在是慢的可以，原因是来必力是在页面滑到底部的时候才开始加载，但是通过控制台看，来必力确实时间很久，很影响我自己的使用体验（嗯，没有别人，哭），所以在网上找到了另外的评论系统---Valine。

## Valine 是什么？

欢迎访问 [Valine 官网](https://valine.js.org)

Valine 是一款基于 [Leancloud](https://leancloud.cn) 的快速、简洁且高效的无后端评论系统。

<!--more-->

Valine 的特性如同官网所说：快速、安全、无后端等等。

更重要的是，我在 Valine 官网看到了「<a href="https://valine.js.org/notify.html" target="_blank">邮件提醒</a>」，巧了，这正是我想要很久的功能。想想看，我写了一个文章，有位朋友看到了评论然后提出了异议，我过了十天半个月看到了才回复，这我真的羞愧难当。所以评论提醒是很重要的。点开官方文档一看，讲解的很详细了。

## 配置评论系统

Valine 评论系统依托于 Leancoud，这个大家应该不陌生了把。这个就是我们的阅读量统计，在之前的文章[《Hexo 的那些事儿》](../5b1da34a)中有相关的使用说明，此处就不做过多展开了。

在主题配置文件中，找到 Valine 配置项，具体配置信息如下：

```text
enable: true
  appid: IgXUs8o4trUx8BIt564-gzGzoHsz # your leancloud application appid
  appkey: 5EN3Kw3h7ER24APkfyxQK # your leancloud application appkey
  notify: true # mail notifier , https://github.com/xCss/Valine/wiki
  verify: true # Verification code
  placeholder: Just go go # comment box placeholder
  avatar: mm # gravatar style
  guest_info: nick,mail,link # custom comment header
  pageSize: 10 # pagination size
```

注意：**appid 和 appkey 应该填上你自己 Leancloud 中对应的信息。**

然后我们需要了解一下 Valine 官方提供的邮件提醒功能是基于 Leancloud 的密码重置邮件提醒，操作步骤如下：

登录 [Leancloud](https://leancloud.cn)，进入<code>控制台</code>，点击<code>应用</code>-><code>设置</code>-><code>邮件模版</code>设置重置密码的邮件内容即可，如下图：

![设置重置邮件](设置重置邮件.png)

代码如下：

```html
<p>Hi, {{username}}</p>
<p>
  你在 {{appname}} 的评论收到了新的回复，请点击查看：
</p>
<p>
  <a
    href="你的网址首页链接"
    style="display: inline-block; padding: 10px 20px; border-radius: 4px; background-color: #3090e4; color: #fff; text-decoration: none;"
    >马上查看</a
  >
</p>
```

点击保存即可。

### 注意事项

- 发送次数过多，可能会暂时被 Leancloud 屏蔽邮件发送功能
- 由于邮件提醒功能使用的 Leancloud 的密码重置邮件提醒，只能传递昵称、邮箱两个属性，所以邮件提醒链接无法直达指定文章页。请悉知。
- 开启邮件提醒会默认开启验证码选项。
- 该功能目前还在测试阶段，谨慎使用。

- 目前邮件提醒正处于测试阶段，仅在子级对存在邮件地址的父级发表评论时发送邮件

这时，如果你在博客中评论，站长（也就是我）并不会收到提醒，emmm 但是我给你回复或者其他人给你回复，你会收到邮件提醒（前提是你得留了邮箱）。

但这并不是我想要的效果啊，我想要的是你们评论了，可以及时的提醒我。

这时候就需要其他帮助了，这里感谢第三方支持：[Valine-Admin](https://github.com/zhaojun1998/Valine-Admin) (by @zhaojun1998)

## 第三方支持

利用第三方支持，就可以在访客评论的时候，将提醒消息发给站长。具体步骤如下：

- 1.进入 Leancloud 应用，点击<code>云引擎</code>-><code>设置</code>，在源代码部署下面填写：

```text
https://github.com/zhaojun1998/Valine-Admin
```

![源码部署](源码部署.png)

- 2.设置云引擎环境变量，还是在设置中下拉，找到<code>自定义环境变量</code>，添加如下项目：

| 参数          | 值                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------- |
| SITE_NAME     | 网站名称。                                                                                    |
| SITE_URL      | 网站地址, 最后不要加 / 。                                                                     |
| SMTP_USER     | SMTP 服务用户名，一般为邮箱地址。                                                             |
| SMTP_PASS     | SMTP 密码，一般为授权码，而不是邮箱的登陆密码，请自行查询对应邮件服务商的获取方式             |
| SMTP_SERVICE  | 邮件服务提供商，支持 QQ、163 等等，请查询<https://www.nhtzj.com/高级配置.md#自定义邮件服务器> |
| SENDER_NAME   | 寄件人名称。                                                                                  |
| TO_EMAIL      | 这个是填收邮件提醒的邮箱地址，若没有这个字段，则将邮件发到 SMTP_USER。                        |
| TEMPLATE_NAME | 设置提醒邮件的主题，目前内置了两款主题，分别为 default 与 rainbow。默认为 default。           |

- 3.切换到部署标签页，分支使用 master，点击部署，等待部署完毕即可：

![环境部署](环境部署.png)

注意：部署过程中可能会遇到错误，请根据提示解决，一般都是环境变量设置有问题。

此时我们测试网站评论提醒效果，访客评论，站长可以收到邮件提醒。

### 问题：多封邮件

此时的邮件提醒，会发现都是两封邮件，一封是漂亮的 Rainbow 样式，一封是默认的重置样式，说明，第三方插件和重置邮件均被触发了。

我们进入主题配置文件，将 valine 配置项下面的 notify 和 verify 均置为 false 即可解决邮件重复问题。

### 评论管理

我们现在已经可以收到评论相关的邮件提醒了，但是如何管理评论内容呢？Valine 提供了很方便的评论管理功能～可以在网页端对评论进行查看以及删除。

配置方法如下：

![WEB主机域名](WEB主机域名.png)

在主机域名处随便填上什么，不用关心后缀名和你自己的域名不一样，这个和你自己的域名没关系，就是你设置了这个，访问这个域名，去管理自己的评论内容。

访问这个域名，提示你输入账户密码，具体信息在<code>存储</code>-><code>数据</code>-><code>\_User</code>中，如下图：

![用户信息](用户信息.png)

其中需要填写 email、password、username 这三个字段。

email 为账户，password 为密码。即可进入后台对评论内容进行管理。

> 目前 Web 后台仅有 **查看** 与 **删除** 功能

### 评论管理更新

更新于 2020 年 07 月 20 日：

记得去年，leancloud 好像要求绑定域名，并且备案。之后貌似只有国际版才不需要备案。

我的是国内版本，并且个人有自己的域名。针对这种情况，对文章进行修改。

具体内容如下。邮件的绑定以及评论啥的都同上。主要在于绑定域名。

首先登陆[leancloud](https://leancloud.cn/)，点击**设置**->**域名绑定**。

选中**云引擎域名**，点击**绑定新域名**，此处推荐绑定二级域名，什么意思呢？

举例子：我的域名 **xudongpo.cn** 肯定是绑定在我的 ECS 服务器上的，所以就不能通过 CNAME 解析，会产生冲突，此时就需要我们使用二级域名。

例如 **leancloud.xudongpo.cn** 这样就可以绑定了。根据提示，会要求你绑定在 **id 前八位.cn-n1-cname.leanapp.cn**上。

在域名服务商处(我的是阿里云)绑定二级域名即可。

绑定完毕如图所示：

![ ](绑定完毕.png)

注意：要求域名备案过！备案！备案！备案！

之后在**云引擎** -> **部署**位置重新部署。

重新部署后如下：

![ ](重新部署.png)

访问你的二级域名即可，第一次可能会要求输入管理员信息，如果没有提示输入，在**存储**->**结构化数据**->**\_User**中可以找到用户信息，登录即可访问后台评论数据。
