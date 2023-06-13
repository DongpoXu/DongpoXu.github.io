---
title: JS设计模式-this
abbrlink: c3f573ea
date: 2019-05-17 15:17:06
updated: 2019-05-17 15:17:06
tags:
  - JavaScript
  - 设计模式
categories:
  - 前端
---

<p style="font-size:20px;font-weight:800;">JavaScript的this</p>

在 JS 中，this 的调用完全取决于函数调用时的上下文，而不是像 Java 一样，this 在声明的时候确定。JS 中 this 的指向大概能分为 4 种情况，分别是：

1. 作为对象的方法调用
2. 作为普通函数的调用
3. Function.prototype.call 或 Function.prototype.apply

<!--more-->

## 作为方法

如果作为对象的方法调用，this 是指向该对象：

```javascript
let obj = {
  objName:'obj',
  objThis(){
    alert(this.objName);
  }
  obj.objThis();
}
```

对象 obj 里面的方法 objThis 中的 this 是指向 obj 对象本身。

## 作为函数

作为普通函数调用，this 指向全局对象也就是 window 对象

```javascript
var objName = "window";
function objThis() {
  console.log(this.objName);
}
objThis(); // window
```

此处的 this 默认指向全局 window，其实这种情况也可以理解为作为对象方法的一种特例：这里的对象是全局对象 window，objThis 这个方法是在 window 上调用的，那么 this 自然也就是 window 了。

## 作为构造函数

构造器调用，this 指向实例化对象

```javascript
function Fruit() {
  this.func = function() {
    return this;
  };
}
var apple = new Fruit();
var orange = new Fruit();
apple.func() === apple; //true
orange.func() === orange; // ture
```

创建了一个空对象，将这个空对象作为 this 传给这个构造函数(每一个函数被调用时，都隐式的传入一个 this)，如果没有显示的返回值，新创建的这个对象，就会作为构造函数的返回值进行返回。

```javascript
// ES6 类调用
class Obj {
  constructor(str, number) {
    this.str = str;
    this.number = number;
  }
  num() {
    console.log(this.str, this.number, this);
  }
}

//类实例
let obj = new Obj("hello", 123);
obj.num();
```

此处 this 输出的是类的实例对象，周遭函数或者类中的 this 指向自身实例

**总结**

> 在谁中使用 this，this 指向谁。
