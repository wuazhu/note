## vue

- 为什么 vue 组件的 data 必须是一个函数而根实例却没有限制

> 组件如果是传入对象而不是一个函数返回对象,多个地方调用该组件就会共用一份数据, 如果传入参数就会隔离变量(闭包), 而根组件是一个单例, 不存在该问题

- vue 中的 key 是干嘛用的

> 1. key 的主要作用是为了高效的更新 dom,其原理是 vue 在 patch 过程中通过 key 可以更精确的判断两个节点是否是同一个,从而避免频繁更新不同元素,使得整个 patch 过程更加高效减少 dom 操作,提高性能
> 2. 不设置 key 会引发一些隐藏 bug
> 3. 在元素过度切换时也会用到 key

- vue 组件化

> 1. 组件是可复用的代码单元的组成, 使开发者可以用小型的, 可复用的去构建复杂的应用
> 2. 分类: 页面组件, 业务组件, 功能组件
> 3. 合理划分组件有利于提高性能
> 4. 高内聚低耦合
> 5. 单项数据流原则
