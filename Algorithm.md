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
