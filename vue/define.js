
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  // 遍历每一个属性并添加observe实例
  new Observer(obj)
}

function defineReactive(obj, key, val) {
  // 递归如果是个对象
  observe(val)
  // 依赖手机, 和 key 一一对应
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key, val)
      Dep.target && dep.addDep(Dep.target) // 手机 watcher
      return val
    },
    set(newValue) {
      if (newValue !== val) {
        // 如果传入的 val 是新对象也要 observe 一下
        observe(newValue)
        console.log('set', key, val, newValue)
        val = newValue
        dep.notify()
        // 粗暴把所有的 watcher 函数都更新
        // watchers.forEach(w => {
        // console.log('kkkkkkkk', w.vm[key], newValue)
        // if (w.vm[key] = newValue) {
        //   w.update()
        // }
        // })
      }
    }
  })
}

function proxy(vm, prop) {
  Object.keys(vm[prop]).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm[prop][key]
      },
      set(newVal) {
        vm[prop][key] = newVal
      }
    })
  })
}

class Vue {
  constructor(options) {
    this.$options = options
    this.$data = options.data
    // 响应处理
    observe(this.$data)

    // 属性代理到 this 上让在调用的时候可以直接访问 this.xxx 而不是this.$data.xxx
    proxy(this, '$data')
    // 编译
    new Compile(this.$options.el, this)
  }
}

class Observer {
  constructor(value) {
    this.value = value
    this.walk(value)
  }
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

class Compile {
  // el 是选择器
  // vm 是 vue 的实例, 为了拿到里面的 data 做交互
  constructor(el, vm) {
    this.$el = document.querySelector(el)
    this.$vm = vm
    this.compile(this.$el)
  }
  compile(el) {
    const childs = el.childNodes
    Array.from(childs).forEach(node => {
      // 元素类型判断
      if (this.isElement(node)) {
        console.log('编译元素', node.nodeName)
        this.compileElement(node)
      } else if (this.isInter(node)) {
        console.log('编译差值', node.textContent)
        this.compileText(node)
      }
      // 递归解析元素
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }
  update(node, prop, dir) {

    console.log('------------update', node, prop, dir)
    const fn = this[dir + 'Updater']
    // 初始化
    fn && fn(node, this.$vm[prop])
    // 更新, 页面中一但有绑定,就创建 watcher
    new Watcher(this.$vm, prop, function (val) {
      console.log('新 val', val)
      fn && fn(node, val)
    })
  }
  textUpdater(node, val) {
    node.textContent = val
  }
  isElement(node) {
    return node.nodeType === 1
  }
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  // 编译插值文本,初始化
  compileText(node) {
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }
  isDir(name) {
    return name.indexOf('v-') > -1
  }
  isEvent(name) {
    return name.indexOf('@') > -1
  }
  compileElement(node) {
    let attrs = node.attributes
    console.log(attrs)
    Array.from(attrs).forEach(attr => {
      //attr 对象{name: 'v-text', value: 'counter'}
      const attrName = attr.name
      const attrValue = attr.value
      // 判断是否是指令
      if (this.isDir(attrName)) {
        let dir = attrName.substring(2) // text
        this[dir] && this[dir](node, attrValue)
      }
      // 判断是否是事件
      if (this.isEvent(attrName)) {
        let dir = attrName.substring(1) // text
        this[dir] && this[dir](node, attrValue)
      }
    })
  }
  text(node, prop) {
    // 把对应的节点里的 text 填充为 this.$vm 对象下的对应属性的值
    // node.textContent = this.$vm[prop]
    this.update(node, prop, 'text')
  }
  html(node, prop) {
    // node.innerHTML = this.$vm[prop]
    this.update(node, prop, 'html')
  }
  htmlUpdater(node, val) {
    node.innerHTML = val
  }
  click(node, prop) {
    console.log('-----------', this.$vm)
    // node.addEventListener('click', this.$vm.methods[prop])
  }
}

// 创建
class Dep {
  constructor() {
    this.watchers = []
  }
  addDep(watcher) {
    this.watchers.push(watcher)
  }
  notify() {
    this.watchers.forEach(w => {
      w.update()
    })
  }
}


class Watcher {
  constructor(vm, key, updater) {
    this.vm = vm
    this.key = key
    this.updater = updater
    // 和 dep 建立关系
    Dep.target = this
    this.vm[this.key] // 去读取属性, 在读的时候在 defineReactive 里去判断是否有 target, 有的话就调用 Dep 的 addDep
    Dep.target = null
  }
  // 让 Dep 来调用的
  update() {
    this.updater.call(this.vm, this.vm[this.key])
  }
}