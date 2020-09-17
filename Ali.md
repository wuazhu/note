//评测题目: 无
题目二

请实现 find 函数，使下列的代码调用正确。

约定：

- title 数据类型为 String
- userId 为主键，数据类型为 Number

```
Array.prototype.where = function (cond) {
    return this.filter((item) => {
        for (let i in cond) {
            return cond[i].test(item[i])
        }
    })
}
Array.prototype.orderBy = function (cond, method) {
    return this.sort((a, b) => {
        console.log(method === 'desc')
        return method === 'desc' ? b[cond] - a[cond] : a[cond] - b[cond]
    })
}
var data = [
    {userId: 8, title: 'title1'},
    {userId: 11, title: 'other'},
    {userId: 15, title: null},
    {userId: 19, title: 'title2'}
];

var find = function(origin) {
    //your code are here...
	return origin
}

//查找data中，符合条件的数据，并进行排序
var result = find(data).where({
    "title": /\d$/
}).orderBy('userId', 'desc');

console.log(result); // [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];
```

**题目三：**

为 Function 扩展一个通用的方法 bindX，可以实现如下功能

```
Function.prototype.bindX = function (obj) {
    const args = Array.prototype.slice.call(arguments, 1)
    const that = this
    return function () {
        const params = Array.prototype.slice.call(arguments)
        that.apply(obj, args.concat(params))
    }
}
  function add(num1, num2) {
      return this.value + num1 + num2;
  }

  var data = {
      value: 1
  };

  var addEx = add.bindX(data, 2);

  addEx(3);    // 6
```

**题目四：**

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

示例:

给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

```
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
	let arr = []
    for (let i=0; i<nums.length; i++) {
      for (let j=i+1; j<nums.length; j++) {
        if (nums[i]+nums[j] === target) {
          arr.push(i, j)
        }
      }
    }
	return arr
};
```

**题目五：**

有一个数组，里面只存在 _ 和 字母，比如 [‘**’, ‘d’, ‘c’, ‘**’, ‘e’, ‘_’, ‘a’, ‘\*‘]。现在需要把这个数组中的所有星号移动到左边，所有的字母移动到右边，所有字母的顺序不能改变。

```
var arr = ['*', 'd', 'c', '*', 'e', '*', 'a', '*'];

 function parse(arr){
     return arr.sort((a, b) => {
        return a === '*' ? -1 : 1
    })
 }

 console.log(parse(arr));
```
