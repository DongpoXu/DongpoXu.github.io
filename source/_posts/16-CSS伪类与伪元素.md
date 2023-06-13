---
title: CSS伪类与伪元素
abbrlink: df0cb483
date: 2019-05-07 17:19:50
updated: 2019-05-07 19:54:23
tags:
  - CSS
  - 伪类&伪元素
categories:
  - 前端
---

## 伪类/伪元素定义

做前端那必须的要接触到 CSS 的伪类和伪元素。常见的又:focus，:hover，:link，:visited 等等。在 CSS1 和 CSS2 中对伪类和伪选择器没有做出很明显的区别定义，而二者在语法是一样的，都是以:开头，这造成很多人会将某些伪元素误认为是伪类，如:before，:after；而在 CSS3 中，对这两个概念做了较清晰的解释，二者区别更为明显，更容易理解。

<!--more-->

### 伪类定义

CSS3 对与伪类的定义如下：

> The pseudo-class concept is introduced to permit selection based on information that lies outside of the document tree or that cannot be expressed using the other simple selectors.

> 伪类存在的意义是为了通过选择器找到那些不存在与 DOM 树中的信息以及不能被常规 CSS 选择器获取到的信息。

> A pseudo-class always consists of a "colon" (:) followed by the name of the pseudo-class and optionally by a value between parentheses.

> 伪类由一个冒号:开头，冒号后面是伪类的名称和包含在圆括号中的可选参数。

> Pseudo-classes are allowed in all sequences of simple selectors contained in a selector. Pseudo-classes are allowed anywhere in sequences of simple selectors, after the leading type selector or universal selector (possibly omitted). Pseudo-class names are case-insensitive. Some pseudo-classes are mutually exclusive, while others can be applied simultaneously to the same element. Pseudo-classes may be dynamic, in the sense that an element may acquire or lose a pseudo-class while a user interacts with the document.

> 任何常规选择器可以再任何位置使用伪类。伪类语法不区别大小写。一些伪类的作用会互斥，另外一些伪类可以同时被同一个元素使用。并且，为了满足用户在操作 DOM 时产生的 DOM 结构改变，伪类也可以是动态的。

解读：伪类用于选择 DOM 树之外的信息，或是不能用简单选择器进行表示的信息。前者包含那些匹配指定状态的元素，比如:visited，:active；后者包含那些满足一定逻辑条件的 DOM 树中的元素，比如:first-child，:first-of-type，:target。

获取不存在于 DOM 树中的信息。比如<a\>标签的:link，:visited 等，这些信息不存在于 DOM 树结构中，只能通过 CSS 选择器来获取；
获取不能被常规 CSS 选择器获取的信息。比如伪类:target，它的作用是匹配文档(页面)的 URI 中某个标志符的目标元素，例如我们可以通过如下代码来实现页面内的区域跳转：

html 代码

```html
<ul class="tabs">
  <li><a href="#tab1">标签一</a></li>
  <li><a href="#tab2">标签二</a></li>
  <li><a href="#tab3">标签三</a></li>
</ul>
<div id="tab1" class="tab_content">
  <!--tabed content-->
</div>
<div id="tab2" class="tab_content">
  <!--tabed content-->
</div>
<div id="tab3" class="tab_content">
  <!--tabed content-->
</div>
```

css 代码

```css
.tab_content {
  height: 800px;
  background: red;
  margin-bottom: 100px;
}
#tab1:target,
#tab2:target,
#tab3:target {
  background: blue;
}
```

### 伪元素定义

CSS3 对与伪元素的定义如下：

> Pseudo-elements create abstractions about the document tree beyond those specified by the document language. For instance, document languages do not offer mechanisms to access the first letter or first line of an element's content. Pseudo-elements allow authors to refer to this otherwise inaccessible information. Pseudo-elements may also provide authors a way to refer to content that does not exist in the source document (e.g., the ::before and ::after pseudo-elements give access to generated content).

> 伪元素在 DOM 树中创建了一些抽象元素，这些抽象元素是不存在于文档语言里的（可以理解为 html 源码）。比如：documen 接口不提供访问元素内容的第一个字或者第一行的机制，而伪元素可以使开发者可以提取到这些信息。并且，一些伪元素可以使开发者获取到不存在于源文档中的内容（比如常见的::before,::after）。

> A pseudo-element is made of two colons (::) followed by the name of the pseudo-element.

> 伪元素的由两个冒号::开头，然后是伪元素的名称。

> This :: notation is introduced by the current document in order to establish a discrimination between pseudo-classes and pseudo-elements. For compatibility with existing style sheets, user agents must also accept the previous one-colon notation for pseudo-elements introduced in CSS levels 1 and 2 (namely, :first-line, :first-letter, :before and :after). This compatibility is not allowed for the new pseudo-elements introduced in this specification.

> 使用两个冒号::是为了区别伪类和伪元素（CSS2 中并没有区别）。当然，考虑到兼容性，CSS2 中已存的伪元素仍然可以使用一个冒号:的语法，但是 CSS3 中新增的伪元素必须使用两个冒号::。

> Only one pseudo-element may appear per selector, and if present it must appear after the sequence of simple selectors that represents the subjects of the selector.

> 一个选择器只能使用一个伪元素，并且伪元素必须处于选择器语句的最后。

> Note: A future version of this specification may allow multiple pseudo-elements per selector.

> 注：不排除未来会加入同时使用多个伪元素的机制。

解读：伪元素为 DOM 树没有定义的虚拟元素。不同于其他选择器，它不以元素为最小选择单元，它选择的是元素指定内容。比如::before 表示选择元素内容的之前内容，也就是""；::selection 表示选择元素被选中的内容。

第一段话是伪元素的清晰定义，也是伪元素与伪类最大的区别。简单来说，伪元素创建了一个虚拟容器，这个容器不包含任何 DOM 元素，但是可以包含内容。另外，开发者还可以为伪元素定制样式。

以::first-line 为例，它获取了指定元素的第一行内容并且将第一行的内容加入到虚拟容器中。如果通过 JavaScript 来实现这个逻辑，那么要考虑的因素就太多了，比如制定元素的宽度、字体大小，甚至浮动元素的图文混排等等。使用 JS 也可以实现，但是过于繁琐。

举个综合使用伪类和伪元素的栗子：

```css
q:lang(de)::after {
  content: " (German) ";
}
q:lang(en)::after {
  content: " (English) ";
}
q:lang(fr)::after {
  content: " (French) ";
}
q:not(:lang(fr)):not(:lang(de)):not(:lang(en))::after {
  content: " (Unrecognized language) ";
}
```

以上代码通过伪类"lang 获取不同 lang 属性的节点，并为之设置伪元素::after，伪元素的内容是此节点的语言类型。

## 伪类/伪元素一览表

### 伪类一览表

| Selector | Meaning | CSS
| --- | --- | --- |
| :active | 选择正在被激活的元素 | 1
| :hover | 选择被鼠标悬浮着元素 | 1
| :link | 选择未被访问的元素 | 1
| :visited | 选择已被访问的元素 | 1
| :first-child | 选择满足是其父元素的第一个子元素的元素 | 2
| :lang | 选择带有指定 lang 属性的元素 | 2
| :focus | 选择拥有键盘输入焦点的元素 | 2
| :enable | 选择每个已启动的元素 | 3
| :disable | 选择每个已禁止的元素 | 3
| :checked | 选择每个被选中的元素 | 3
| :target | 选择当前的锚点元素 | 3
| :first-of-type | 选择满足是其父元素的第一个某类型子元素的元素 | 3
| :last-of-type | 选择满足是其父元素的最后一个某类型子元素的元素 | 3
| :only-of-type | 选择满足是其父元素的唯一一个某类型子元素的元素 | 3
| :nth-of-type(n) | 选择满足是其父元素的第 n 个某类型子元素的元素 | 3
| :nth-last-of-type(n) | 选择满足是其父元素的倒数第 n 个某类型的元素 | 3
| :only-child | 选择满足是其父元素的唯一一个子元素的元素 | 3
| :last-child | 选择满足是其父元素的最后一个元素的元素 | 3
| :nth-child(n) | 选择满足是其父元素的第 n 个子元素的元素 | 3
| :nth-last-child(n) | 选择满足是其父元素的倒数第 n 个子元素的元素 | 3
| :empty | 选择满足没有子元素的元素 | 3
| :in-range | 选择满足值在指定范围内的元素 | 3
| :out-of-range | 选择值不在指定范围内的元素 | 3
| :invalid | 选择满足值为无效值的元素 | 3
| :valid | 选择满足值为有效值的元素 | 3
| :not(selector) | 选择不满足 selector 的元素 | 3
| :optional | 选择为可选项的表单元素，即没有“required”属性 | 3
| :read-only | 选择有"readonly"的表单元素 | 3
| :read-write | 选择没有"readonly"的表单元素 | 3
| :root | 选择根元素 | 3

注意：p:first-child 表示选择的元素既要是 p 标签，同时要是其父元素的第一个子元素，不要错误认为是表示 p 元素的第一个子元素；同理，p:first-of-type 表示选择的元素要是 p 标签，同时要是其父元素的第一个 p 标签元素；其他类似的伪类含义相似。

### 伪元素一览表

| Selector | Meaning | CSS
| --- | --- | --- |
| ::first-letter | 选择指定元素的第一个单词 | 1
| ::first-line | 选择指定元素的第一行 | 1
| ::after | 在指定元素的内容前面插入内容 | 2
| ::before | 在指定元素的内容后面插入内容 | 2
| ::selection | 选择指定元素中被用户选中的内容 | 3

## 总结

伪类与伪元素的特性及其区别：

- 伪类本质上是为了弥补常规 CSS 选择器的不足，以便获取到更多信息；
- 伪元素本质上是创建了一个有内容的虚拟容器；
- CSS3 中伪类和伪元素的语法不同；
- 可以同时使用多个伪类，而只能同时使用一个伪元素；
