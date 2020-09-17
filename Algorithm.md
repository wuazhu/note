## 算法

- 冒泡排序

```js
var arr = [29, 45, 51, 68, 72, 97]
//外层循环，控制趟数，每一次找到一个最大值
for (var i = 0; i < arr.length - 1; i++) {
	// 内层循环,控制比较的次数，并且判断两个数的大小
	for (var j = 0; j < arr.length - 1 - i; j++) {
		// 白话解释：如果前面的数大，放到后面(当然是从小到大的冒泡排序)
		if (arr[j] > arr[j + 1]) {
			var temp = arr[j]
			arr[j] = arr[j + 1]
			arr[j + 1] = temp
		}
	}
}
console.log(arr) //[2, 4, 5, 12, 31, 32, 45, 52, 78, 89]
```

- 快速排序

> 找到中位数, 原数组中截取出中位数, 大的放右边,小的放左边, 返回出调用左边+中位数+调用右边的合集

```js
var arr = [29, 45, 51, 68, 72, 97]
function quickSort() {
	let left = []
	let right = []
	let middle = arr.splice[Math.floor(arr.length / 2)]
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] < middle) {
			left.push(arr[i])
		} else {
			right.push(arr[i])
		}
	}
	return quickSort(left).concat(middle, quickSort(right))
}
```

- 二分算法

> 找到中位数, 定义最大最小及中间值, 每次输入与最大最小值判断, 重新定义最大最小值,直到找出输入值

```js
var arr = [29, 45, 51, 68, 72, 97]
function quickSort() {
	let left = []
	let right = []
	let middle = arr.splice[Math.floor(arr.length / 2)]
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] < middle) {
			left.push(arr[i])
		} else {
			right.push(arr[i])
		}
	}
	return quickSort(left).concat(middle, quickSort(right))
}
```

- 枚举算法

> `abcde * a = eeeeee`

```js
for (let i = 0; i < 9; i++) {
	for (let j = 0; j < 9; j++) {
		for (let k = 0; k < 9; k++) {
			for (let m = 0; m < 9; m++) {
				for (let n = 0; n < 9; n++) {
					let a = i * 10000 + j * 1000 + k * 100 + m * 10 + n
					let b = i
					let c = n * 111111
					if (a * b == c) {
						console.log(i, j, k, m, n)
					}
				}
			}
		}
	}
}
```

- 链表

```js
class Node {
	constructor(element) {
		this.element = element
		this.next = null
	}
}
class LinkList {
	constructor() {
		this.head = null
		this.length = 0
	}
	append(element) {
		let node = new Node(element)
		let current = null
		if (!this.head) {
			this.head = node
		} else {
			let current = this.head
			console.log('current', current)

			while (current.next) {
				console.log('current.next', current.next)
				current = current.next
			}
			current.next = node
			console.log('current.next node', node)
		}
		this.length += 1
	}
	insert(pos, element) {
		if (pos >= 0 && pos < this.length) {
			let node = new Node(element)
			let current = this.head
			let index = 0
			let prev = null

			if (pos === 0) {
				this.head = node
			} else {
				while (index++ < pos) {
					console.log('insert index ', index)
					console.log('insert pos ', pos)
					prev = current
					current = current.next
					console.log('insert prev ', prev)
					console.log('insert current ', current)
				}
				node.next = current
				prev.next = node
				console.log('insert node', node)
			}
			this.length += 1
		}
		console.log('this', this)
	}
	removeAt(pos) {
		let current = this.head
		let prev = null
		let index = 0
		if (pos === 0) {
			this.head = current.next
		} else {
			if (pos < this.length) {
				while (index++ < pos) {
					console.log(index)
					prev = current
					current = current.next
					console.log(current)
				}
				prev.next = current.next
			}
		}
		this.length -= 1
		return this
	}
	findIndex(element) {
		console.log(element)
		let index = -1
		let current = this.head
		while (current) {
			console.log('--', element, current.element)
			if (element === current.element) {
				return index + 1
			}
			index++
			current = current.next
		}
		return -1
	}
}
let l = new LinkList()
let a1 = { a: 1 }
let a2 = { a: 2 }
let a3 = { a: 3 }
let a4 = { a: 4 }
l.append(a1)
l.append(a2)
l.append(a3)
l.insert(1, a4)

console.log('findIndex', l.findIndex(a2))
console.log(l)
```

- hashTable
  > 缺点: 无序,空间复杂度提高(比如下标有可能是 30,但是存入的数据可能只有 3 条)

```js
class HashTable {
	constructor() {
		this.table = []
	}
	static hash(key) {
		let h = 0
		for (let k of key) {
			h += k.charCodeAt()
		}
		return h % 37
	}
	put(key, val) {
		const position = this.hash(key)
		this.table[position] = val
	}
}
```
