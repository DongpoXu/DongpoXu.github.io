---
title: TypeScript入门
abbrlink: 70ab9b93
date: 2019-05-13 17:54:50
updated: 2019-05-13 17:54:50
tags:
  - TypeScript
categories:
  - 前端
---

## TypeScript 入门

### 内容介绍

- 学习 TypeScript 的好处
- TypeScript 概念，语法和特性

#### 前置知识

- 需要理解 ES5，ES6，JavaScript，TypeScript 的概念和关系
  - ES:是 JavaScript 语言的规范，ES5，ES6 是这个规范的两种版本
  - JS 和 TS 是两种客户端脚本语言，JS 是 ES5，TS 是 ES6 规范
- 需要有一定 JS 开发经验
  - 程序控制，变量声明等

<!--more-->

### TypeScript 的优势

- 支持 ES6 规范
- 强大的 IDE 支持
  - 类型检查：减少犯错数量
  - 语法提示：提高开发效率
  - 重构：自动修改引用的变量名称
- Angular 框架支持

### TypeScript Complier

- 在线 Complier
- 本地 Complier
  - 下载 typescript: npm install -g typescript
  - 编译 ts 到 js: tsc 文件名
  - WebStorm 集成功能

## TypeScript - 字符串新特性

### - 多行字符串

用\`\`号来包括字符串，在\`\`号中的字符串可以换行

### - 字符串模版

在多行字符串中用表达式插入变量或者调用方法：

例如：

```javascript
let myName = "Xu Dongpo";

let getName = function() {
  return "Xu Dongpo";
};

console.log(`hello ${myName}`);
console.log(`hello ${getName()}`);
```

而且利用多行字符串开发字符串模版，可以提升开发速度以及可读性。

### - 自动拆分字符串

```javascript
function test(a, b, c) {
  console.log(a, b, c);
}
let name = "Xu Dongpo";
let code = "9527";
test`hello my name is ${name}, my code is ${code}`;
```

运行结果为：

```javascript
Array (3)
0 "hello my name is "
1 ", my code is "
2 ""

“Array”原型
"Xu Dongpo"
```

## TypeScript - 参数新特性

### 参数新特性 - 类型

#### - 参数类型

在参数的名称后面使用**冒号**来指定参数的类型（类型推断机制，来减少错误，可以用**any**）

```javascript
let name: string = "abcd";
let code: any = 13; // 什么类型都行
let tel: number = 13;
let tf: boolen = true;
function test(name: string): void {
  // 不能return
}
```

#### - 自定义类型

允许自定义类型

```javascript
class Person{
  name:string,
  age:number,
}

let person:Person = new Person();
```

就会有语法提示，帮助提高开发效率

### 参数新特性 - 默认值

#### - 参数默认值

在参数的名称后面使用**等号**来指定参数的默认值

```javascript
let name: string = "abcd";
function test(a: string, b: string, c: string = "xudongpo") {
  console.log(a, b, c);
}

test("a", "b");
```

注意带默认值的参数要声明在最后面

### 参数新特性 - 默认值可选参数

#### - 可选参数

在参数的名称后面使用**问号**来指定参数为可选

```javascript
let name: string = "abcd";
function test(a: string, b?: string, c: string = "xudongpo") {
  console.log(a, b, c);
}

test("a", "b");
```

注意：

- 当声明了可选参数时，需要在方法内部处理当可选参数没有传递时候的情况
- 可选参数必须声明在必选参数的后面

## TypeScript - 函数新特性

### 函数新特性 - Rest and Spread 操作符

#### - Rest and Spread 操作符（...）

用来声明任意数量的方法参数

```javascript
function test(...args) {
  args.forEach(function(arg) {
    console.log(arg);
  });
}
test(1, 2, 3);
test(7, 8, 9, 10);
```

#### - 用法二

函数参数固定，变量长度不定

```javascript
function test(a, b, c) {
  console.log(a);
  console.log(b);
  console.log(c);
}

let arg1 = [1, 2];
let arg2 = [4, 5, 6];

test(...arg1);
test(...arg2);
```

缺的空着，多的删掉

### 函数新特性 - generator 函数

#### - generator 函数

控制函数的执行过程，手工暂停和恢复代码执行

```javascript
function* doSomething() {
  console.log("start");
  yield;
  console.log("next");
}

var fun1 = doSomething();
fun1.next();
fun1.next();
```

注意：

- 函数必须由变量才可以使用
- 用.next()方法执行函数，到 yield 之前。

### 函数新特性 - destructuring 析构表达式

#### - 析构表达式对象取值

##### - 方法一

通过表达式讲对象或者数组拆解成任意数量的变量

```javascript
function getStock() {
  return {
    code: "IBM",
    price: 100
  };
}

var { code, price } = getStock(); //注:取出的变量名和函数返回的要一样
console.log(code, price);
var { code: codex, price } = getStock(); //不一样的用法
console.log(codex, price);
```

##### - 方法二

通过表达式讲对象或者数组拆解成任意数量的变量

```javascript
function getStock() {
  return {
    code: "IBM",
    price: {
      price1: 100,
      price2: 200
    },

    xixi: "adfa", //不影响使用
    haha: "ababd"
  };
}
var {
  code: codex,
  price: { price2 }
} = getStock(); //不一样的用法
console.log(codex, price2);
```

#### - 析构表达式数组取值

```javascript
let array1 = [1, 2, 3, 4];
var [number1, number2] = array1;
console.log(number1, number2); //1,2
```

析构其他值

```javascript
let array1 = [1, 2, 3, 4];
var [number1, number2, ...others] = array1;
console.log(number1, number2); //1,2
console.log(others); //[3,4]
```

作为函数参数输入:

```javascript
let array1 = [1, 2, 3, 4];
function doSomething([number1, number, ...others]) {
  console.log(number1, number2); //1,2
  console.log(others); //[3,4]
}
doSomething(array1);
```

## TypeScript - 表达与循环

### 表达与循环 - 箭头表达式

#### - 箭头表达式

用来声明匿名函数，消除传统匿名函数的 this 指针问题

```javascript
var sum = (arg1, arg2) => arg1 + arg2; // 单行
var sum = (arg1, arg2) => {
  // 多行
  return arg1 + arg2;
};
var sum = () => {
  // 无参数
  return;
};
var sum = arg => {
  // 一个参数
  console.log(arg);
};
```

常见举例：

```javascript
var myArray = [1, 2, 3, 4, 5];
console.log(myArray.filter(value => value % 2 === 0));
```

this

```javascript
function getStock(name: string) {
  this.name = name;
  setInterval(function() {
    // 传统方式
    console.log("name is:" + this.name);
  }, 1000);
}
letstock = getStock("IBM"); // 为空
function getStock(name: string) {
  this.name = name;
  setInterval(() => {
    // 剪头函数
    console.log("name is:" + this.name);
  }, 1000);
}
let stock = getStock("IBM"); // name is:IBM
```

### 表达与循环 - for-of 循环

#### 箭头表达式

与 forEach()和 for in 做比较

forEach()：

```javascript
let myArray = [1, 2, 3, 4];
myArray.desc = "this is a array";

myArray.forEach(valye => console.log(value));
// 1,2,3,4
```

for in：

```javascript
let myArray = [1, 2, 3, 4];
myArray.desc = "this is a array";

for (var a in myArray) {
  console.log(a);
} // 0,1,2,3,desc

for (var a in myArray) {
  console.log(myArray[a]);
} // 1,2,3,4,'this is a array'
```

for-of：

```javascript
let myArray = [1, 2, 3, 4];
myArray.desc = "this is a array";

for (var a of myArray) {
  console.log(a);
} // 1,2,3,4
```

for-of 可以 break：

```javascript
let myArray = [1, 2, 3, 4];
myArray.desc = "this is a array";

for (var a of myArray) {
  if (a > 2) break;
  console.log(a);
} // 1,2,3,4
```

## TypeScript - 面向对象特性

### 面向对象特性 - 类

#### - 类

类是 TypeScript 代码的核心，使用 TypeScript 开发时，大部分代码都是写在类里面的。

##### - 类的定义

```javascript
class Person {
  name;
  eat() {
    console.log("img");
  }
}
// 实例化
let person1 = new Person();
```

私有(private)，公有(public)，默认为公有

```javascript
class Person{
    private name;
    eat(){
        console.log("img")
    }
}
// private 只能在类内部访问
// public  可以在外部访问
```

受保护(protected)

```javascript
class Person{
    protected name;
    eat(){
        console.log("eat")
    }
}
```

##### - 类的构造函数

```javascript
class Person {
  constructor() {
    //构造函数，只有在被实例化时调用一次。
    console.log("打印构造函数");
  }
  eat() {
    console.log("eat");
  }
}
// 实例化
let person1 = new Person(); //打印构造函数
```

利用 constructor 使得在实例化时必须有参数

```javascript
/////方法一
class Person{
    name;
    constructor(name:string){
        this.name = name;
    }
    eat(){
        console.log(this.name)
    }
}
/////方法二
class Person{
    constructor(public name:string){
    }
    eat(){
        console.log(this.name)
    }
}
// 实例化
let person1 = new Person("name"); //必须传入参数
```

##### - 类的继承(extends)

```javascript
class Person{
    constructor(public name:string){
    }
    eat(){
        console.log(this.name)
    }
}

class Employee extends Person{
}
```

super 关键字：子类构造函数中必须调用父类的构造函数

```javascript
class Person{
    constructor(public name:string){
    }
    eat(){
        console.log(this.name + 'is eat');
    }
}

class Employee extends Person{
    constructor(name:string,code:string){
        super(name);
        this.code = code;
    }
    work(){
        super.eat();
        this.doWork();
    }
    private doWork(){
    }
}
```
