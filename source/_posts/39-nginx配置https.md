---
title: nginx配置https
tags:
  - Nginx
  - https
categories:
  - 服务器
abbrlink: a4734f
date: 2020-06-16 22:16:49
---

今天域名备案完毕，现在阿里云备案比以前方便许多，不需要幕布拍照，直接移动端备案，一周左右就差不多OVER。

备案完毕，当然是要把自己的域名和自己的服务器连起来啦，之后就可以愉快的码字了。

购买和搭建服务器我就不说了，如果有需要可以留言联系我。

BTW：很推荐[阿里云 ECS](https://www.aliyun.com)，至少个人博客用起来真的很 happy，学生也不贵。

<!--more-->

## DNS 解析

首先是 DNS 解析，要求我们有自己的域名。在阿里云控制台，点击解析。

分别添加以下两条记录：

| 主机记录 | 记录类型 | 记录值 |
| --- | --- | --- |
| www | A | 服务器 IP |
| @ | A | 服务器 IP |

**注意** www 这一条不能省略，如果没有这一条，之后访问会出现加上 www 找不到 服务器的情况。

## 申请 SSL

在阿里云安全证书位置申请免费的 SSL 证书，需要自己选一下。然后支付 0 元即可。在证书页面下载自己服务器对应的证书文件。有两个文件，一个 key 一个 pem。推荐远程控制在服务器那边下载，好操作一些。

## 配置 nginx

ssh 到自己的服务器，或者 vnc 连接，在 nginx 中建立 cert 文件夹，放入下载的 SSL 证书文件。
接下来打开 nginx 的 config 文件，在 http 中添加如下内容；

```text
server{
  listen 80;
  server_name  自己的域名;
}
server{
  listen 443 ssl;
  server_name 自己的域名;
  ##
  # SSL Settings
  ##
  ssl on;
  ssl_certificate         cert/自己SSL的.pem;
  ssl_certificate_key     cert/自己SSL的.key;
  ssl_session_cache       shared:SSL:1m;
  ssl_session_timeout     5m;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # Dropping SSLv3, ref: POODLE
  ssl_prefer_server_ciphers on;

  location /{
    root index页面路径;
    index index.html index.htm;
  }
}
```

此时就可以通过 http 和 https 顺利访问网站了。

## http 重定向到 https

网上很多方法是以前的 rewrite 方法，现在可以直接用 301 重定向即可。修改 server 80:

```text
server{
  listen 80 default;
  server_name  自己的域名;
  return   301 https://$server_name$request_uri;
}
```

注意：**listen 80 default**是为了**阻止 IP 访问**。

## 自定义 404 页面

觉得 nginx 的 404 不好看，我们修改服务器的 404 页面，在 nginx 中新建 error 文件夹，自己做或者网上找一个好看的 404 页面，放在 error 文件夹中。修改 location 如下：

```text
location /{
  root 代码仓库;
  index index.html index.htm;
  error_page 404 403 500 502 503 504 /404.html;
  location /404.html{
    root /etc/nginx/error;
  }
}
```

注意：**必须要在 http 内，server 外配置 fastcgi_intercept_errors on;**不然自定义 404.html 不会生效。

## 总结

至此，网站正常访问，欢迎大家来看。（欢迎个寂寞么=￣ω￣=）
