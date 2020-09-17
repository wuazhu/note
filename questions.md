# 面试题

- false+false

答案: 0

在 `js`中, 布尔值会被直接转换为数字, `true` 为 1, `false` 为 0

- 判断是否在当前可视区

查了很多还在说用 `getBoundingClientRect` 方法去获取各个位置的值再去判断, 其实已经有了新的接口来判断`IntersectionObserver`, 具体的使用方法如下. 官方的对新接口的说法是 **异步观察目标元素与其祖先元素或顶级文档视窗(viewport)交叉状态的方法**

```js
var intersectionObserver = new IntersectionObserver(function (entries) {
	// If intersectionRatio is 0, the target is out of view
	// and we do not need to do anything.
	if (entries[0].intersectionRatio <= 0) return

	loadItems(10)
	console.log('Loaded new items')
})
// start observing
intersectionObserver.observe(document.querySelector('.scrollerFooter'))
```

- 闭包

> 函数嵌套子函数, 子函数可以访问父函数的局部作用域, 生成局部的空间 每个空间内胡不影响
> 好处:

> 1.变量长期驻扎内存, 可以一直使用

> 2.避免全局变量的污染

> 3.私有成员的存在(把闭包内的变量通过 json 传出,作为私有成员

> 问题:

> 有可能会引起内存泄漏

- 函数声明, 函数表达式

> 函数声明: function aaa() {}
>
> 函数表达式:
>
> ​ var a = function a() {} 命名函数表达式
>
> ​ var a = function () {} 匿名函数表达式
>
> ​ ~function a() {}
>
> ​ -function a() {}
>
> ​ +function a() {}
>
> ​ !function a() {}
>
> 区别:
>
> 1.函数声明不能直接加()执行, 函数表达式可以
>
> 2.

- DOM 操作-列表节点替换

```js
function swap(aNode, bNode) {
	var aParent = aNode.parentNode
	var bParent = bNode.parentNode
	if (aNode && bNode) {
		var aNode2 = aNode.cloneNode(true) //aNode 没有父节点
		bParent.replaceChild(aNode2, bNode)
		aParent.replaceChild(bNode, aNode)
	}
}
window.onload = function () {
	var bjNode = document.getElementById('bj')
	var rlNode = document.getElementById('rl')
	swap(bjNode, rlNode)
}
// 2
//交换dom内容
function swapDom(from, to) {
	let temp = a.innerHTML
	a.innerHTML = b.innerHTML
	b.innerHTML = temp
}
```

- sass less stylus 区别
- [输入一个 url 到页面之间发生了什么](https://juejin.im/post/6844903592177074183)
- webpack 优化, loader,plugin 是干什么的, webpack 如何构建
- 链表,树
- xss, sql 注入
- 计算在当前可视区 新 api **(IntersectionObserver)** [案例](http://www.qiutianaimeili.com/html/page/2018/08/yhxjx3vx9y.html)
- 网页直接通过 canvas 生成图片分享 (html2canvas, webview 生成)
- service woker
- js 的垃圾回收机制

> 标记清楚法, 变量在使用的时候会进入标记, 变量不再使用会标记不在使用. 当变量不在使用 js gc 会自动回收.

- vue $attr $listeners

```js
// components abc
<template>
	<div>
		123
	</div>
</template>
<script>
export {
	prop: {
		a: string,
		b: string
	},
	created() {
		// 包含所有未声明的属性, 不包含 style 及 class
		console.log(this.$attrs)
	}
}
</script>
// 在外部使用
<abc a="a" b="b" c="c"/>
```

- Promise
- 组件循环调用自身

- class new 的时候有那几步骤
- 什么时候会进入堆什么进入栈
- vue dep watcher
- vue 虚拟 DOM 与 react 虚拟 DOM 的区别
- find 方法与 some 方法
- 快速排序(算法)
- require 与 import 区别, require 是同步异步
- webpack 常用的一些插件
- 防抖与节流
- web worker 是什么可以做什么
