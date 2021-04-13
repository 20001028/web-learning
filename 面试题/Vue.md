# Vue

### **Vue双向绑定**

**原理**

数据劫持（Object.defineProperty()或Vue3的Proxy）结合发布订阅模式（观察者模式）实现

**发布订阅模式**

**Object.defineProperty()**

**Proxy**

### **Vue的keep-alive**

props：  include（字符串或正则表达式，只有name匹配的组件会被缓存）

​				exclude（字符串或正则表达式，任何name匹配的组件都不会被缓存）

​				max（最多可以缓存多少组件）

```vue
<keep-alive include="test-keep-alive">
//缓存name为test-keep-alive的组件
    <component></component>
</keep-alive>
```

也可以结合router-view使用，具体使用见：https://blog.csdn.net/titoni_yunruohan/article/details/83785039

keep-alive的生命周期：

- activated：第一次进入该页面，钩子函数触发顺序created->mounted->activated
- deactivated：页面退出时会触发deactivated，当再次前进或者后退时只触发activated

被缓存过的组件切换的时候还会执行created钩子函数吗：不会，只会触发activated钩子函数，不会从created开始

监听组件的激活和失活状态：使用钩子函数activated和deactivated函数

### **Vue-Router钩子函数**

- **全局钩子函数**

  - 全局前置守卫：router.beforeEach()，可以创建多个，按照创建顺序调用，异步解析执行

    ```javascript
    const router = new VueRouter({ ... })
    
    router.beforeEach((to, from, next) => {
        //to:即将进入的目标路由，from:即将离开的路由对象
        //next:函数，一定要调用这个方法才能导航，参数有：无参、false、新地址、error
      // ...
    })
    ```

  - 全局后置钩子函数：router.afterEach()，

    ```javascript
    router.afterEach((to, from) => {//不接收next参数，不会改变导航本身
      // ...
    })
    ```

- **路由独享钩子函数**

  - beforeEnter()：可以在路由配置时直接定义

    ```javascript
    const router = new VueRouter({
      routes: [
        {
          path: '/foo',
          component: Foo,
          beforeEnter: (to, from, next) => {
            // ...
          }
        }
      ]
    })
    ```

- **组件内钩子函数**

  - beforeRouteEnter()

  - beforeRouteUpdate()

  - beforeRouteLeave()

    ```javascript
    const Foo = {
      template: `...`,
      beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`，但是可以在路由被confirm的时候通过回调函数调用
        // 因为当守卫执行前，组件实例还没被创建
          next(vm=>{
              //通过vm访问组件实例this
          })
      },
      beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
      },
      beforeRouteLeave (to, from, next) {//禁止用户在未保存修改前离开，可以用next(false)来取消导航
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
      }
    }
    ```

### **Vue生命周期函数**

- beforeCreate：el和data都没有初始化
- created：完成data的初始化，el没有
- beforeMount：完成了data和el的初始化
- mounted：完成挂载
- beforeUpdate
- updated
- activated
- deactivated
- beforeDestory
- destoryed
- created和mounted的区别：created时dom还没有渲染，只是初始化属性值；mounted时dom树已经渲染，初始化页面完成后。

### **Vue3.0 Composition API**

### **Vue2.0和Vue3.0的区别**

- 重构数据监听Proxy
- 新增Composition API
- 重构虚拟DOM

### vue两种路由模式

1. hash：地址栏中的#符号，#/index，hash虽然在url中，但不会包含在url请求中，对后端没有影响，改变hash不会重新加载页面
2. history：基于H5增加的pushState和replaceState方法，应用于浏览器的历史记录站，在当前已有的back、forward、go的基础上提供对历史记录修改单功能，虽然改变了当前的url但不会立即向后端发送请求，可能会出现404错误，需要后台配置

### v-show和v-if的区别

- 实现方法

  

- 编译

- 性能