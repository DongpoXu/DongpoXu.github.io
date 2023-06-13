---
title: Python书籍借阅系统
tags:
  - Python
categories:
  - Python
abbrlink: ee5e73e7
date: 2019-06-02 09:52:37
updated: 2019-06-05 11:40:44
---

持续一周的出差在今天结束了，忙忙碌碌的工作，零零散散的时间，出差前我留了个小练习给实验室小朋友，自己当然也要完成一下，出差第二天我就写完了这个系统，一直没时间整理，今天上飞机前抽点时间写一写。

前几个月给实验室买了几本书，本来说用 LabVIEW 写个实验室书籍借阅系统来着，但是一是懒、二也是懒，一直拖着没做，正好赶着这个机会，用 Python 弄个出来。GUI 界面我就不弄了，时间太紧迫，也不立 Flag 说之后完善什么的，等回去再用 LabVIEW 弄一个吧。

<!--more-->

今天正式回来上班了，把之前没弄完的整理完吧。

## 需求分析

首先我要对自己的需求进行分析。

1. 书籍数据需要存储下来（文本格式即可）
2. 可以增加新书籍，删除旧书籍
3. 可以借阅书籍，归还书籍
4. 可以查阅书籍信息，列出所有书籍
5. 借阅时候记录下借阅人姓名，借阅时间，方便管理员查询
6. 设定用户账户和管理员账户，权限分开
7. 用户账号可以借阅&归还&查询，管理员账号可以额外对书籍信息进行修改

需求我列出来了，归根结底无非最基础的 CURD(create,update,retrieve,delete)，所以我建立了三个 py 文件，一个是 main.py 用于放最上层的交互逻辑，然后是中间层 func.py 用户放功能函数，以及最底层的 file.py 用于封装文件操作。

## main.py

在 main.py 中我们定义的函数有如下几个：

- main 函数 ------ 系统主函数
- register 函数 ------ 用户注册函数
- login 函数 ------ 用户登录函数
- admin 函数 ------ 管理员登录函数
- CURD 函数 ------ 增删改查

main.py 主要用于最顶层和用户交互的逻辑，如用户登录、用户注册、管理员登录等等，再将具体的功能封装再下一层中。

代码如下：

```python
import os
import func

# mock数据
# 书籍格式 [书名, 作者]
# 用户格式 [用户名, 密码]
# books = [['1', '1'], ['2', '2'], ['3', '3']]
# # users = [['user1', 'psw1'], ['user2', 'psw2']]

# 增删改查
def CURD(user, username):
    while True:
        if (user == 'admin'):
            print('\n' + '-------------------------------')
            print('******** 增加书籍 --- 1 ********')
            print('******** 删除书籍 --- 2 ********')
            print('******** 查询书籍 --- 3 ********')
            print('******** 查看所有 --- 4 ********')
            print('******** 修改信息 --- 5 ********')
            print('******** 查看用户 --- 6 ********')
            print('******** 添加用户 --- 7 ********')
            print('******** 删除用户 --- 8 ********')
            print('******** 返回菜单 --- 9 ********')
            print('******** 退出系统 --- 0 ********')
            print('-------------------------------')
            try:
                iNum = int(input('请您输入操作对应的数字并按下回车键：'))
            except:
                print('------- 请您输入对应的数字 -------')
            else:
                if iNum == 1:
                    func.create()
                elif iNum == 2:
                    func.delete()
                elif iNum == 3:
                    func.retrieve()
                elif iNum == 4:
                    func.showAll()
                elif iNum == 5:
                    func.update()
                elif iNum == 6:
                    func.showAllUser()
                elif iNum == 7:
                    register()
                elif iNum == 8:
                    func.deleteUser()
                elif iNum == 9:
                    main()
                elif iNum == 0:
                    os._exit(0)
        elif (user == 'user'):
            print('\n' + '-------------------------------')
            print('******** 归还书籍 --- 1 ********')
            print('******** 借阅书籍 --- 2 ********')
            print('******** 查询书籍 --- 3 ********')
            print('******** 查看所有 --- 4 ********')
            print('******** 返回菜单 --- 9 ********')
            print('******** 退出系统 --- 0 ********')
            print('-------------------------------')
            try:
                iNum = int(input('请您输入操作对应的数字并按下回车键：'))
            except:
                print('------- 请您输入对应的数字 -------')
            else:
                if iNum == 1:
                    func.giveBack()
                elif iNum == 2:
                    func.borrowBook(username)
                elif iNum == 3:
                    func.retrieve()
                elif iNum == 4:
                    func.showAll()
                elif iNum == 5:
                    func.update()
                elif iNum == 9:
                    main()
                elif iNum == 0:
                    os._exit(0)
        else:
            print('CURD---error')
            return False
    return True

def login():
    users = func.findUsers()
    print('\n' + '----------- 用户登录 -----------')
    data = func.inputData('user')
    if data in users:
        print('----------- 登录成功 -----------')
        flag = True
        CURD('user', data[0])
    else:
        print('----------- 登录失败 -----------')
        print('---- 用户名不存在 或 密码错误 ----')
        print('----- 请重新登录 或 注册账户 -----')
    return True

def admin():
    users = func.findAdmins()
    print('\n' + '---------- 管理员登录 -----------')
    data = func.inputData('user')
    if data in users:
        print('----------- 登录成功 -----------')
        flag = True
        CURD('admin', data[0])
    else:
        print('----------- 登录失败 -----------')
        print('---- 管理员不存在 或 密码错误 ----')
        print('----- 请重新登录 或 联系主管 -----')
    return True

def register():
    print('\n' + '----------- 用户注册 -----------')
    data = func.inputData('user')
    func.addUser(data)
    print('----------- 注册完毕 -----------')
    return True

def main():
    print('\n' + '-------------------------------')
    print('            欢迎使用            ')
    print('        实验室书籍借阅系统        ')
    print('-------------------------------')
    while (1):
        print('\n' + '-------------------------------')
        print('********** 登录 --- 1 **********')
        print('********** 注册 --- 2 **********')
        print('********** 管理 --- 3 **********')
        print('********** 退出 --- 0 **********')
        print('-------------------------------')
        try:
            iNum = int(input('请您输入操作对应的数字并按下回车键：'))
        except:
            print('------- 请您输入对应的数字 -------')
        else:
            if iNum == 1:
                login()
            elif iNum == 2:
                register()
            elif iNum == 3:
                admin()
            elif iNum == 0:
                os._exit(0)
            else:
                print('------- 请您输入对应的数字 -------')
                continue

if __name__ == "__main__":
    main()
```

## func.py

在 func.py 中我们定义的函数有如下几个：

- inputData('user') ------ 输入信息提取
- create() ------ 增加书籍
- delete() ------ 删除书籍
- update() ------ 更新书籍
- retrieve() ------ 查询书籍
- giveBack() ------ 归还书籍
- borrowBook('username') ------ 借阅书籍
- showAllUser() ------ 显示所有用户
- deleteUser() ------ 删除用户
- showAll() ------ 显示所有书籍
- findUsers() ------ 查询用户
- findAdmins() ------ 查询管理员
- addUser(['username','password']) ------ 添加用户

func.py 中主要封装了 CURD 操作所对应的一系列函数，将每个函数功能封装起来，方便上层调用，数据的读写再由底层实现。

代码如下：

```python
# -*- coding:utf-8 -*-

# 功能函数
import file
import datetime

books = 'books.txt'  # 书籍仓库
borrow = 'borrow.txt'  # 借出书籍
users = 'users.txt'  # 用户信息
admins = 'admins.bin'  # 管理员
title = ['书名:', '作者：', '借阅人：', '  时间：']
userTitle = ['用户名：', '密码：']

# 输入信息提取
def inputData(keywords):
    if keywords == 'book':
        key = input('请输入书名：   \t')
        value = input('请输入作者名：\t')
    elif keywords == 'user':
        key = input('请输入用户名：\t')
        value = input('请输入密码：   \t')
    return [key, value]

# 增加书籍
def create():
    print('\n' + '----------- 添加书籍 -----------')
    data = inputData('book')
    file.writeData(books, data, 'a')
    print('----------- 添加成功 -----------')
    return True

# 删除书籍
def delete():
    print('\n' + '----------- 删除书籍 -----------')
    data = inputData('book')
    new = []  # 定义一个空列表，用来存储结果
    new = file.splitData(books)
    if data in new:
        new.remove(data)
        fobj = open(books, 'w')
        for item in new:
            file.writeData(books, item, 'a')
        fobj.close()  # 特别注意文件操作完毕后要close
        print('----------- 删除成功 -----------')
    else:
        print('------ 书籍不存在，自动返回 ------')
    return True

# 更新书籍
def update():
    print('\n' + '----------- 修改书籍 -----------')
    data = inputData('book')
    new = []
    new = file.splitData(books)
    if data in new:
        new.remove(data)
        bookname = input('请输入修改后的书名：')
        author = input('请输入修改后的作者：')
        data = [bookname, author]
        new.append(data)
        fobj = open(books, 'w')
        for item in new:
            file.writeData(books, item, 'a')
        fobj.close()  # 特别注意文件操作完毕后要close
        print('----------- 修改成功 -----------')
    else:
        print('------ 书籍不存在，自动返回 ------')
    return True

# 查询书籍
def retrieve():
    print('\n' + '----------- 查找书籍 -----------')
    bookname = input('请输入书名：')
    new = file.splitData(books)
    flag = 0
    for book in new:
        if book[0] == bookname:
            print('书名：', book[0], ' 作者：', book[1])
            flag = flag + 1
    if flag == 0:
        print('----- 没有找到该书，自动返回 -----')
    print('----------- 查找结束 -----------')
    return True

# 归还书籍
def giveBack():
    print('\n' + '----------- 归还书籍 -----------')
    data = inputData('book')
    new = []  # 定义一个空列表，用来存储结果
    new = file.splitData(borrow)
    flag = 0
    for item in new:
        if data == [item[0], item[1]]:
            new.remove(item)
            fborrow = open(borrow, 'w')
            for item in new:
                file.writeData(borrow, item, 'a')
            fborrow.close()
            fbooks = open(books, 'a')
            file.writeData(books, [data[0], data[1]], 'a')
            fbooks.close()
            flag = flag + 1
            print('----------- 归还成功 -----------')
        else:
            continue
    if flag == 0:
        print('------ 书本未借出，归还失败 ------')
    return True

# 借阅书籍
def borrowBook(username):
    print('\n' + '----------- 借阅书籍 -----------')
    data = inputData('book')
    new = []  # 定义一个空列表，用来存储结果
    new = file.splitData(books)
    if data in new:
        new.remove(data)
        fbooks = open(books, 'w')
        for item in new:
            file.writeData(books, [item[0], item[1]], 'a')
        fbooks.close()
        fborrow = open(borrow, 'a')
        data.append(username)
        data.append(datetime.datetime.now().strftime('%Y-%m-%d'))
        file.writeData(borrow, data, 'a')
        fborrow.close()
        print('----------- 借书成功 -----------')
    else:
        print('------ 书籍不存在，自动返回 ------')
    return True

# 显示所有用户
def showAllUser():
    print('\n' + '----------- 所有用户 -----------')
    new = file.splitData(users)
    for item in new:
        print('')
        for i in range(2):
            print('{} {} \t'.format(userTitle[i], item[i], chr(12288)), end='')  # format格式化字符串
    return True

# 删除用户
def deleteUser():
    print('\n' + '----------- 删除用户 -----------')
    data = inputData('user')
    new = []  # 定义一个空列表，用来存储结果
    new = file.splitData(users)
    if data in new:
        new.remove(data)
        fobj = open(users, 'w')
        for item in new:
            file.writeData(users, item, 'a')
        fobj.close()  # 特别注意文件操作完毕后要close
        print('----------- 删除成功 -----------')
    else:
        print('------ 用户不存在，自动返回 ------')
    return True

# 显示所有书籍
def showAll():
    print('\n' + '----------- 所有书籍 -----------')
    print('\n' + '---******** 在库书籍 ********---', end='')
    new = file.splitData(books)
    for item in new:
        print('')
        for i in range(2):
            print('{} {} \t'.format(title[i], item[i], chr(12288)), end='')  # format格式化字符串
    print('')
    print('\n' + '---******** 借出书籍 ********---', end='')
    new = file.splitData(borrow)
    for item in new:
        print('')
        for i in range(4):
            print('{} {}   \t'.format(title[i], item[i], chr(12288)), end='')  # format格式化字符串
    print('')
    return True

# 查询用户
def findUsers():
    new = []
    new = file.splitData(users)
    return new

# 查询管理员
def findAdmins():
    new = []
    new = file.splitData(admins)
    if (len(new) == 0):
        new = [['XDP', 'Admin'], ]
    print("管理员账号：XDP 密码：Admin")
    return new

# 添加用户
def addUser(data):
    file.writeData(users, data, 'a')
    return True
```

## file.py

在 file.py 中我们定义的函数有如下几个：

- readData('books.txt') ------ 读取信息
- writeData('books.txt', ['测试书籍 1', '作者 1'], 'a') ------ 写入信息
- splitData('books.txt') ------ 处理读取的信息

file.py 中，封装了最底层的文件读写函数，将数据读取出来交给上层的功能函数处理。

代码如下：

```python
# -*- coding:utf-8 -*-
# 文件读写底层
title = ['', ',', ',', ',']

# 读取信息
def readData(fName):
    try:
        fobj = open(fName, 'a')  # 读取
        fobj.close()
        fobj = open(fName, 'r')  # 读取
    except IOError:
        print('--- 数据获取失败，请联系管理员。 --')
    else:  # else中处理正常情况
        return fobj
        fobj.close()  # 特别注意文件操作完毕后要close

# 写入信息
def writeData(fName, data, way):
    try:
        fobj = open(fName, way)  # 这里的a意思是追加，这样在加了之后就不会覆盖掉源文件中的内容，如果是w则会覆盖。
    except IOError:
        print('--- 数据获取失败，请联系管理员。 --')
    else:
        i = 0
        for value in data:
            fobj.write(title[i] + str(value))
            i = i + 1
        fobj.write('\n')
        fobj.close()

# 处理读取的信息
def splitData(fName):
    fobj = readData(fName)
    sourceInLines = fobj.readlines()
    new = []  # 定义一个空列表，用来存储结果
    for line in sourceInLines:
        temp1 = line.strip('\n')  # 去掉每行最后的换行符'\n'
        temp2 = temp1.split(',')  # 以','为标志，将每行分割成列表
        new.append(temp2)  # 将上一步得到的列表添加到new中
    return new
```

## 生成可执行文件

最终通过 pyinstaller 来将代码包装起来成为可执行文件，最终命令行版本的书籍借阅系统成型。

- pip install pyinstaller ------ 安装 pyinstaller
- pyinstaller -F main.py ------ 生成可执行文件
