# Typescript

## 类型断言

```typescript
interface List {
	id: number
	name: string
	age?: number // 表示可选属性
	readonly sex: string // 表示只读属性,不允许修改
}

interface Result {
	data: List[]
}

function render(result: Result) {
	result.data.forEach((item) => {
		console.log(item.id, item.name)
	})
}
let result = {
	data: [
		{ id: 1, name: 'a', sex: 'male' },
		{ id: 2, name: 'b' },
	],
}

// 这样执行是 ok 的
render(result)
// 如果多了一个 sex 属性, 需要断言他为某个类型
// 方法一
render({
	data: [
		{ id: 1, name: 'a', sex: 'male' },
		{ id: 2, name: 'b' },
	],
} as Result)
// 方法二
render(<Result>{
	data: [
		{ id: 1, name: 'a', sex: 'male' },
		{ id: 2, name: 'b' },
	],
})
// 方法 3修改接口
interface List {
	id: number
	name: string
	[x: string]: any // 表示还有属性为 any 类型
}
```

## 函数定义

```typescript
// 方式一
let add = (x: number, y: number) => number
// 方式二
interface List {
	(x: number, y: number): number
}
// 方式三
type Add = (x: number, y: number) => number
```

## 函数定义

```typescript
// 方式一
let add = (x: number, y: number) => number
// 方式二
interface List {
	(x: number, y: number): number
}
// 方式三
type Add = (x: number, y: number) => number
// 方式4
function add1(x: number, y: number, z?: number) {
	return z ? x + y + z : x + y
}
// 剩余参数, 默认参数
function add1(x: number, y = 0, ...rest) {
	return x + y + rest.reduce((a, b) => a + b)
}

// 实现
let add: Add = (x, y) => x + y

// 混合实现
interface Lib {
	(): void
	version: string
	doSometing(): void
}
// 实现
function getLib() {
	let lib: Lib = (() => {}) as Lib
	lib.version = '1.0.0'
	lib.doSomething = () => {}
	return lib
}
let lib1 = getLib()
lib1()
lib1.doSomething()
let lib2 = getLib()
lib2.doSomething()
```

## 函数重载

```ts
// 定义
function add(...rest: number[]): number
function add(...rest: string[]): string
function add(...rest: any[]): any {
	let first = rest[0]
	if (typeof first === 'string') {
		return rest.join('')
	}
	if (typeof first === 'number') {
		return rest.reduce((a, b) => a + b)
	}
}
add(1, 2, 3)
add('a', 'b', 'c')
```

## 类

> 修饰符:
>
> 类中默认都是公有成员 public,
>
> 私有成员 private 只能在类本身中调用, 不能再实例及子类中调用, 如果给构造函数 constructor 加上私有 private 属性, 那么这个类不能被实例化,也不能被继承,
>
> protected 受保护成员, 只能在类或子类中访问, 如果构造函数被声明为受保护成员, 那么这个类只能被继承, 不能被实例化, 相当于一个基类
>
> readonly: 只读属性, 一定要被初始化
>
> static: 静态修饰符, 只能通过类名来调用, 不能通过实例来调用, 静态成员也可以被继承 Dog.staticMethods

```ts
class Dog {
	constructor(name: string) {
		this.name = name
	}
	name: string
	run() {}
	private pri() {}
	protected pro() {}
	readonly legs: bumber = 4
	static wang() {}
}
console.log(Dog.prototype)
let dog = new Dog('www')
console.log(dog)
// 静态成员调用
console.log(Dog.wang)

// 继承
class Husky extends Dog {
	constructor(name: string, color: string) {
		super(name)
		this.color = color
		// 调用父类的受保护成员
		this.pro()
	}
	color: string
}
// 子类调用父类静态成员
Dog.wang()
```

## 抽象类

> 抽象类只能被继承, 不能实例化, 抽象类中可以有方法的具体实现, 这样子类就不用去实现了, 也可以不指定方法的具体实现, (多态), 抽象类指定方法, 但是没有具体实现

```ts
abstract class Animal {
	eat() {
		console.log('eat')
	}
	abstract sleep(): void
}
// 报错, 不能被实例化
let animal = new Animal()

class Dog extends Animal {
	constructor(name: string) {
		super()
		this.name = name
	}
	name: string
	// 实现抽象类的方法
	sleep() {
		console.log('dog sleep')
	}
}
let dog = new Dog('wangwang')
dog.eat()

class Cat extends Animal {
	// 多态实现
	sleep() {
		console.log('cat sleep')
	}
}
let cat = new Cat()

let animals: Animal[] = [dog, cat]
animals.forEach((animal) => {
	animal.sleep()
})
```

## 类的 this 类型

> 返回 this, 这样可以实现链式调用

```ts
class WorkFlow {
	step1() {
		return this
	}
	step2() {
		return this
	}
}
new WorkFLow().step1().step2()

class MyFlow extends WorkFlow {
	next() {
		return this
	}
}
// 实现 this 的多态, 既可以是父类,也可以是子类
new MyFlow().next().step1().next().step2()
```

## 类的接口定义

> 类实现接口用 implements 关键字实现, 必须实现接口中定义过的方法,类中可以定义自己的方法(没有在接口声明过的), 接口只能约定类的公有成员, 不能约束类的构造函数

```ts
interface Human {
	eat(): void
	name: string
}
class Asian implements Human {
	constructor(name: string) {
		this.name = name
	}
	name: string
	eat() {}
}
```

## 接口的继承

> 接口可以继承接口, 也可以继承多个接口, 也可以继承类, 继承类的话就是类的成员都抽象出来, 只有类的成员机构,没有实现
>
> 接口在抽离类的成员的时候, 不仅抽离了公共成员也抽离了私有成员及受保护成员

```ts
interface Human {
	eat(): void
	name: string
}
interface Man extends Human {
	run(): void
}
interface Child {
	cry(): void
}
//接口继承
interface Boy extends Man, Child {}
let boy: Boy = {
	name: '',
	run() {},
	eat() {},
	cry() {},
}
class Auto {
	state = 1
	private state2 = 2
}
interface AutoINterface extends Auto {}
class Abc implements AutoInterface {
	state = 1
}
class Bus extends Auto implements AutoInterface {}
```

## 泛型函数

```ts
// 方式一
function log<T>(value: T): T {
	console.log(value)
	return value
}
log<string[]>(['a', 'b'])
log(['a', 'b'])
// 方式二
type Log = <T>(value: T) => T
let myLog: Log = log
// 泛型接口 (只约束了其中一个函数)
interface Log {
	<T>(value: T): T
}
// 约束整个接口
interface Log<T> {
	(value: T): T
}
let myLog: Log<number> = log
myLog(1)
// 默认泛型
interface Log<T = string> {
	(value: T): T
}
let myLog: Log = log
myLog('abc')
```

## 泛型类

```ts
class Log<T> {
	run(value: T) {
		console.log(value)
		return value
	}
}
// 实例化时候定义具体的泛型类型
let log1 = new Log<number>()
log1.run(1)
// 实例化时候不定义泛型类型
let log2 = new Log()
let2.run('aaa')
// let2.run({a:1})

// 泛型约束
interface Length {
	length: number
}
function log<T extends Length>(value: T): T {
	// 传入类型必须要有 length 属性
	console.log(value, value.length)
	return value
}
log([1])
log('2123')
log({ length: 2 })
```

## 类型保护

```ts
emum Type {
  Week, Strong
}
class Java{
  java() {}
  isjava = 1
}
class Javascript {
  javascript(){}
  isjs = 1
}
// 方式 4
function isJava(lang: Java | Javascript): lang is Java {
  return (lang as Java).java !== undefined
}
function getLang(type: Type, x: string | number) {
  let lang = type == Type.Strong ? new Java() : new Javascript()
  // 方式一 instanceof
  if (lang instanceof java) {
    lang.java()
  } else {
    lang.javascript()
  }
  // 方式二 in
  if ('js' in lang) {
    lang.javascript()
  } else {
    lang.java()
  }
  // 方式三 typeof
  if (typeof x === 'string') {
    x.length
  } else {
    // number 类型的方法
    x.toFixed(2)
  }
  // 方式四, 使用定义的判定是否是 java 的方法
  if (isJava(lang)) {
    lang.java()
  } else {
    lang.javascript()
  }

  return lang
}
```
