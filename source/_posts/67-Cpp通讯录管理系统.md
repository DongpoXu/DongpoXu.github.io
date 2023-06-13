---
title: C++通讯录管理系统
tags:
  - C++基础语法
  - 通讯录管理系统
categories:
  - C++
abbrlink: 2c1e930c
date: 2020-07-10 18:54:22
---

前几天刷题，因为我选择用 C++语言来刷题，比较接近底层，但是又不像 C 那样我需要自己造轮子，可以很深入的了解算法的内部结构。但是，我 C++学的并不精通！！这我就很尴尬了，所以我找了 B 站上黑马程序员的课程，然后肝了两天基础语法。

遗憾的是！！！我在刷题过程中遇到的问题，在 C++提高编程部分。基础语法没有，但是我们不能白刷，刷了题那就做一下练习，正好课程里有通讯录管理系统，咱就研究研究，搞一下。

IDE 用的 JetBrains 公司的 Clion，因为之前正好申请了学生免费，再加上 Xcode 学习成本对我来说有点高。话不多说，回归正题。

<!--more-->

首先，我们要做一个系统，肯定要首先知道系统需求，因为不是实际的项目，所以不需要过于精细，只需要知道大概需要完成的模块以及功能即可。

## 系统需求

通讯录是一个可以记录亲人、好友信息的工具。
主要利用 C++来实现一个通讯录管理系统
系统中主要实现以下功能：

- 添加联系人：向通讯录中添加新人，信息包括（姓名、性别、年龄、联系电话、家庭住址），最多记录 1000 人
- 显示联系人：显示通讯录中所有联系人信息
- 删除联系人：按照姓名进行删除指定联系人
- 查找联系人：按照姓名查看指定联系人信息
- 修改联系人：按照姓名重新修改指定联系人
- 清空联系人：清空通讯录中所有信息
- 推出通讯录：退出当前使用的通讯录

### 显示菜单

首先我们要有个菜单显示界面，来满足人机交互的需求。
封装 **showMenu** 函数如下：

```c++
/* 封装菜单显示界面 */
void showMenu() {
  string menu_item[] = {"1.添加联系人", "2.显示联系人", "3.删除联系人",
    "4.查找联系人", "5.修改联系人", "6.清空联系人", "0.退出通讯录"};
  cout << "*****************************" << endl;
  for (auto &i : menu_item) {
    cout << "*****    " << i << "    *****" << endl;
  }
  cout << "*****************************" << endl;
}
```

之后根据用户交互输入的内容依次完成其他功能。

### 添加联系人

添加联系人(**addPerson**)代码如下：

```c++
void addPerson(AddressBooks *abs) {
  // 判断通讯录是否已满，满了不继续加
  if (abs->m_Size == MAX) {
    cout << "通讯录已满，无法继续添加" << endl;
    return;
  } else {
    // 添加具体的联系人
    // 添加姓名
    string name;
    cout << "请输入姓名：";
    cin >> name;
    abs->personArray[abs->m_Size].m_Name = name;
    // 添加性别
    int sex = 0;
    cout << "请输入性别：" << endl;
    while (true) {
      cout << "1---男" << "\t2---女" << endl;
      cout << "您的性别是：";

      cin >> sex;
      /* 此处用于处理c++中cin输入错误问题 */
      if (cin.fail()) {
        cin.clear();    // 将cin的错误状态清除
        cin.ignore();   // 将输入缓冲区的内容忽略掉
      }
      if (sex == 1 || sex == 2) {
        abs->personArray[abs->m_Size].m_Sex = sex;
        break;
      }
      cout << "输入有误，请重新输入。" << endl;
    }
    // 添加年龄
    int age = 0;
    cout << "请输入年龄：";
    while (true) {
      cin >> age;
      if (age >= 1 && age <= 150) {
        abs->personArray[abs->m_Size].m_Age = age;
        break;
      }
      cout << "输入有误，请重新输入。" << endl;
    }
    // 电话
    string phone;
    cout << "请输入电话：";
    cin >> phone;
    abs->personArray[abs->m_Size].m_Phone = phone;
    // 住址
    string address;
    cout << "请输入家庭住址：";
    cin >> address;
    abs->personArray[abs->m_Size].m_Addr = address;
    // 更新通讯录人数
    abs->m_Size++;
    cout << "添加成功！" << endl;
  }
}
```

### 显示联系人

显示联系人(**showPerson**)函数如下：

```c++
void showPerson(AddressBooks *abs) {
  // 如果通讯录中没有人员，提示记录为空
  if (abs->m_Size == 0)
    cout << "当前通讯录为空！" << endl;
  else {
    cout << "当前通讯录有：" << abs->m_Size << " 人" << endl;
    for (int i = 0; i < abs->m_Size; ++i) {
      cout << "姓名：" << abs->personArray[i].m_Name << "\t";
      cout << "性别：" << (abs->personArray[i].m_Sex == 1 ? "男" : "女") << "\t";
      cout << "年龄：" << abs->personArray[i].m_Age << "\t";
      cout << "电话：" << abs->personArray[i].m_Phone << "\t";
      cout << "住址：" << abs->personArray[i].m_Addr << endl;
    }
  }
}
```

### 检测联系人

在删除、查找、修改联系人之前，我们有一个公共步骤，就是检查联系人是否存在。
所以编写公共函数检测联系人(**isExist**)：

```c++
/* 检测联系人是否存在，存在，返回索引，不存在，返回-1 */
int isExist(AddressBooks *abs, const string &name) {
    for (int i = 0; i < abs->m_Size; ++i) {
        // 找到用户输入的姓名
        if (abs->personArray[i].m_Name == name) {
            return i;       // 返回索引
        }
    }
    // 未找到
    return -1;
}
```

### 删除联系人

删除联系人(**deletePerson**)函数如下：

```c++
void deletePerson(AddressBooks *abs) {
  cout << "请输入删除联系人姓名：" << endl;
  string name;
  cin >> name;
  int ret = isExist(abs, name);
  /* 删除逻辑：要删除张三，将张三后面的数据，均前提，做一个逻辑上的覆盖即可。 */
  if (ret != -1) {
    for (int i = ret; i < abs->m_Size; ++i) {
      // 数据前移
      abs->personArray[i] = abs->personArray[i + 1];
    }
    abs->m_Size--;      // 更新人数
    cout << "删除成功" << endl;
  } else
    cout << "查无此人！" << endl;
}
```

### 查找联系人

查找联系人(**findPerson**)函数如下：

```c++
void findPerson(AddressBooks *abs) {
  cout << "请输入您要查找的联系人：";
  string name;
  cin >> name;

  int ret = isExist(abs, name);
  if (ret != -1) {
    cout << "姓名：" << abs->personArray[ret].m_Name << "\t";
    cout << "性别：" << (abs->personArray[ret].m_Sex == 1 ? "男" : "女") << "\t";
    cout << "年龄：" << abs->personArray[ret].m_Age << "\t";
    cout << "电话：" << abs->personArray[ret].m_Phone << "\t";
    cout << "住址：" << abs->personArray[ret].m_Addr << endl;
  } else
    cout << "查无此人！" << endl;
}
```

### 修改联系人

修改联系人(**modifyPerson**)函数如下：

```c++
void modifyPerson(AddressBooks *abs) {
  cout << "请输入您要修改的联系人：";
  string name;
  cin >> name;

  int ret = isExist(abs, name);
  if (ret != -1) {
    cout << "当前信息为：" << "\t";
    cout << "姓名：" << abs->personArray[ret].m_Name << "\t";
    cout << "性别：" << (abs->personArray[ret].m_Sex == 1 ? "男" : "女") << "\t";
    cout << "年龄：" << abs->personArray[ret].m_Age << "\t";
    cout << "电话：" << abs->personArray[ret].m_Phone << "\t";
    cout << "住址：" << abs->personArray[ret].m_Addr << endl;
    cout << "修改信息：" << "\t";
    // 修改姓名
    string newName;
    cout << "请输入姓名：";
    cin >> newName;
    abs->personArray[ret].m_Name = newName;
    // 修改性别
    int newSex = 0;
    cout << "请输入性别：" << endl;
    while (true) {
      cout << "1---男" << "\t2---女" << endl;
      cout << "您的性别是：";

      cin >> newSex;
      if (newSex == 1 || newSex == 2) {
        abs->personArray[ret].m_Sex = newSex;
        break;
      }
      cout << "输入有误，请重新输入。" << endl;
    }
    // 修改年龄
    int newAge = 0;
    cout << "请输入年龄：";
    while (true) {
      cin >> newAge;
      if (newAge >= 1 && newAge <= 150) {
        abs->personArray[ret].m_Age = newAge;
        break;
      }
      cout << "输入有误，请重新输入。" << endl;
    }
    // 修改电话
    string newPhone;
    cout << "请输入电话：";
    cin >> newPhone;
    abs->personArray[ret].m_Phone = newPhone;
    // 修改住址
    string newAddress;
    cout << "请输入家庭住址：";
    cin >> newAddress;
    abs->personArray[ret].m_Addr = newAddress;
    cout << "修改成功！" << endl;
  } else
    cout << "查无此人！" << endl;
}
```

### 清空联系人

清空联系人(**clearPerson**)函数如下：

```c++
void clearPerson(AddressBooks *abs) {
  cout << "您将要清空通讯录！请您再次确认！" << endl;
  cout << "输入 y 回车确认：";
  char makeSure;
  cin >> makeSure;

  if (makeSure == 'y') {
    abs->m_Size = 0;    // 没必要一个个删除，只需要逻辑清零即可
    cout << "通讯录已经清空！" << endl;
  } else
    cout << "通讯录完好！" << endl;
}
```

### 退出通讯录

退出通讯录功能，通过 return 0 来实现，在人际交互过程中，采用 cin int 变量来实现用户输入，所以采用 switch-case 的方式更合理，在用户输入 0 的时候，return 0 即可退出通讯录。

在 win 系统 Visual Studio 中，还可以使用 system 相关命令，可以使得整个系统界面更加美观。
