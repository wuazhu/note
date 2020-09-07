# note

note for review

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

```js
var arr = [29, 45, 51, 68, 72, 97]
function quickSort() {
	let left = []
	let right = []
	let middle = arr.splice[Math.floor(arr.length / 2)]
	for (let i = 0; i < arr.length; i++) {}
}
```

## [数组操作](./Array.md)
