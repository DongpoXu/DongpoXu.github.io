---
title: Python爬取淘宝商品
tags:
  - Python
  - 爬虫
categories:
  - Python
abbrlink: 8f666c53
date: 2019-04-11 12:24:06
updated: 2019-04-13 09:32:14
---

在学习 python 爬虫时，定向爬取淘宝的搜索界面，并没有爬取到数据，让我们来看看发生了什么？

## 课程来源

**慕课大学** 北京理工大学国家精品课程 [《Python 网络爬虫与信息提取》](https://www.icourse163.org/course/BIT-1001870001) 第三章

<!--more-->

## 淘宝商品比价定向爬虫

### 功能描述

- 目标：获取淘宝搜索页面的信息，提取其中的商品名称和价格
- 理解：淘宝的搜索接口以及翻页的处理

### 程序的结构设计

1. 提交商品搜索请求，循环获取页面
2. 对于每个页面，提取商品名称和价格信息
3. 将信息输出

## 遇到问题

### 爬取成功，数据有问题

打印 html 文件，返回如下

```html
<script type="text/javascript">
  TRLang = {
    ERROR_NICK_BLANK: "请填写账户名",
    ERROR_PASSWORD_BLANK: "请输入密码",
    ERROR_NICK_PASSWORD_BLANK: "请输入账户名和密码",
    ERROR_CHECKCODE_BLANK: "请输入验证码",
    TIPS_REMEMBER_PASSWORD: "记住密码",
    TIPS_NOT_REMEMBER_PSW_ON_PUBLIC: "不要在公共计算机记住密码，防止账户被盗"
  };
</script>
```

觉得应该是用户并未登陆问题，应该是淘宝的反爬虫机制导致。

---

## 处理方法

1. 登陆淘宝，打开开发者模式，例如 Chrome 右键检查
2. 点选 NetWork，DOC，然后刷新页面，在 network 中选择 doc，在请求的 headers 中搜索 cookie
3. 获取对应的 cookie 以及 user-agent
4. 在代码中添加到 headers 里面

![查询cookie](查询cookie.png)

```js
def getHTMLText(url):
  kv = {
    'cookie': 'adsgadfafegadsgadsfaefasdfaewfadsfag'
    'uaer-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
  }
    try:
    r = requests.get(url, headers=kv, timeout=30)
    r.raise_for_status()
    r.encoding = r.apparent_encoding
    return r.text
  except:
    return "gg"
```

## 补充问题

**2019-05-06 更新**：还遇到了一种问题，就是在 url 为 http 时，即使添加了 cookie 和 user-agent 也无法获取信息。

猜测是因为重定向导致的问题。

首先简单介绍一下 requests 库的一个高级用法 Session 会话对象

**会话对象**让你能够跨请求保持某些参数。它也会在同一个 Session 实例发出的所有请求之间保持 cookie。所以如果你向同一主机发送多个请求，底层的 TCP 连接将会被重用，从而带来显著的性能提升。(参见 [HTTP persistent connection](https://en.wikipedia.org/wiki/HTTP_persistent_connection)).

这个问题经过观察发现，重定向之后 cookie 信息并没有被保存下来（返回的 html 还是让用户登陆），我们就需要用使用 Session 保存 cookie 信息。使用 Session 后，更新 cookie 并没有成功。

然后将矛头转向 cookie 去哪里了，发现问题是因为 requests 的 session 方法保持 cookie 只能保持 cookiejar 类型的 cookie，而我们手动构建的 cookie 是 dict 类型的，所以需要将 dict 转化为 cookiejar 类型。

查阅得方法如下：

```python
#将CookieJar转为字典：
cookies = requests.utils.dict_from_cookiejar(r.cookies)

#将字典转为CookieJar：
cookies = requests.utils.cookiejar_from_dict(cookie_dict, cookiejar=None, overwrite=True)

#其中cookie_dict是要转换字典
转换完之后就可以把它赋给cookies 并传入到session中了：
s = requests.Session()
s.cookies = cookies
```

具体代码很简单，如下：

```python
cookie_dict = {'cookie': 'adgfadsgadsgasf'}
cookies = requests.utils.cookiejar_from_dict(cookie_dict, cookiejar=None, overwrite=True)
S = requests.Session()
S.cookies = cookies;
try:
    r = S.get(url, headers=headers, timeout=30)
```

**补充**：其实只要用 cookies 属性的 update 方法更新 cookie 就行了，如下：

```text
cookie_dict = {"a":1}
s = requests.Session()
s.cookies.update(cookie_dict)
s.get(url)
...
```

具体代码：

```python
cookie_dict = {'cookie': 'adsgadsgasd'}
S = requests.Session()
S.cookies.update(cookie_dict)
try:
    r = S.get(url, headers=headers, timeout=30)
```

之前的方法虽然也可以用，但相对比较繁琐。

感谢：[关于 requests 的 session 方法保持不了 cookie 的问题](https://blog.csdn.net/a583179/article/details/78904645)
