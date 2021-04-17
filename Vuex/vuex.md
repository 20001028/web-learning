# Vuex

### Vuex是什么

Vuex是一个专为Vue.js应用程序开发的状态管理模式

采用集中式存储管理应用的所有组件状态，并以相应的规则保证状态以一种可预测的方式发生变化

**什么是状态管理模式**

```javascript
new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})
```

这个应用包含三个部分：

- state，驱动应用的数据源
- view，以声明方式将state映射到视图
- actions，响应在view上的用户输入导致的状态变化

单向数据流理念示意

<img src="https://vuex.vuejs.org/flow.png" alt="img" style="zoom: 25%;" />

当应用遇到多个组件共享状态时，单向数据流的简洁性很容易被破坏

- 多个视图依赖于统一状态

  传参的方法对于多层嵌套的组件非常繁琐，对于兄弟组件间的状态传递无能为力

- 来自不同视图的行为需要变更同一状态

  经常采用父子组件直接引用或者通过事件来变更和同步字太多多份拷贝

### 安装

**直接下载/CDN引用**

```shell
npm install vuex --save

yarn add vuex

# CDN引用
<script src="https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js"></script>
```

### 开始

每一个Vuex应用的核心就是store（仓库）。store基本上是一个容器，它包含着你的应用中大部分的状态。Vuex和单纯的全局对象有两点不同：

- Vuex的状态存储是响应式的，当Vue组件从store中读取状态时，若store中的状态发生变化，

  那么相应的组件也会得到高效更新

- 不能直接改变store中的状态。改变store中的状态的唯一途径就是显示的提交mutation。使得我们可以方便的跟踪每个状态的变化

**最简单的Store**

```javascript
Vue.use(Vuex);
const store=new Vuex.Store({
    state:{
        count:0,
    },
    mutations:{
        increment(state){
            state.count++;
        },
    }
})
//store.state获取状态对象
console.log(store.state.count);//0
//但输出的如果是store.state会显示里面的count为1
//store.commit触发状态变更
store.commit('increment');
console.log(store.state.count);//1

Vue.use(Vuex);
const store=new Vuex.Store({
    state:{
        count:0,
    },
    mutations:{
        increment(state){
            state.count++;
        },
    }
})

var vm=new Vue({
    el:'#box',
    store:store,//向Vue实例中注入store
    methods:{
        increment:function(){//定义方法提交一个变更
            this.$store.commit('increment');
            console.log(this.$store.state.count);
        }
    }
})
```

### State

**单一状态树**

Vuex使用单一状态树，用一个对象就包含了全部的应用层级状态

它作为一个唯一数据源存在

每个应用仅仅包含一个store实例，单一状态树能够直接的定位任一特定的状态片段

**在Vue组件中获得Vuex状态**

```javascript
// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {//在计算属性中返回某个状态
      //这种模式导致组件依赖全局状态单例
      //每个需要使用state的组件中需要频繁的导入
    count () {
      return store.state.count;//当store.state.count变化时，都会重新求取计算属性，触发更新相关联的DOM
    }
  }
}

//Vuex通过store选项，提供将状态从根组件注入到每一个子组件中的机制
Vue.use(Vuex);

// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}

const store=new Vuex.Store({
    state:{
        count:0,
    },
    mutations:{
        increment(state){
            state.count++;
        },
    }
})

var vm=new Vue({
    el:'#box',
    store:store,//在根实例中注册store选项，该store实例会注入到根组件下的所有子组件中
    //且子组件能通过this.$store访问到
    components:{
        Counter
    }
})
```

**mapState辅助函数**

当一个组件需要获取多个状态时，使用mapState辅助函数帮助生成计算属性

```javascript
const Counter = {
  template: `<div>{{ countPlus }}</div>`,
  data:function(){
      return {
          count:2,
      }
  },
  computed: Vuex.mapState({
      //传字符串参数
    //count:'count'
      //箭头函数
    //count:state=>state.count
      //函数
    countPlus(state){
        return state.count+this.count;
    }
  }),
    computed:Vuex.mapState(['count'])//字符串数组，保证计算属性名称与state子节点名称相同
}
```

**对象展开运算符**

mapState函数返回的是一个对象，使用一个工具函数将多个对象合并为一个

```javascript
const Counter = {
  template: `<div>{{ count }}{{name}}</div>`,
  data:function(){
      return {
      }
  },
  computed: {
      name(){
          return 'zzg';
      },
      ...Vuex.mapState({//对象展开混入外部对象
          count:state=>state.count,
      })
  }
}
```

**组件仍然保留局部状态**

使用Vuex不一定要把所有状态放入Vuex，如果某些状态严格属于单个组件，最好还是作为组件的局部状态

### Getters

有时候我们需要从store中的state中派生出一些状态，例如对列表进行过滤并计数

```javascript
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

如果有多个组件需要用到此属性，无论复制这个函数还是抽取到一个共享函数然后多处导入都不理想

Vuex中允许在store中定义getter（相当于store的计算属性）

getter的返回值会根据它的依赖被缓存起来，只有它的依赖值发生改变才会被重新计算

Getter接受state作为第一个参数

```javascript
Vue.use(Vuex);

// 创建一个 Counter 组件
const Counter = {
  template: `<div>{{ doneTodosCount }}</div>`,
  data:function(){
      return {
      }
  },
  computed: {
      doneTodos(){
          return this.$store.getters.doneTodos;//通过store.getters访问getter
      },
      doneTodosCount(){
          return this.$store.getters.doneTodosCount;
      },
      getTodoById(){
          return this.$store.getters.getTodoById(2);
      }
  },
    computed: {
        //mapGetters映射
      ...Vuex.mapGetters([
          'doneTodos',
          'doneTodosCount'
      ]),
      ...Vuex.mapGetters({
          //修改属性名
          doneCount:'doneTodosCount'
      })
  }
}

const store=new Vuex.Store({
    state:{
        todos: [
                { id: 1, text: '...', done: true },
                { id: 2, text: '...', done: false }
            ]
    },
    getters:{
        doneTodos:state=>{//接受第一个参数state
            return state.todos.filter(todo=>todo.done);
        },
        doneTodosCount:(state,getters)=>{//接受第二参数getters
            return getters.doneTodos.length;
        },
        getTodoById:(state)=>(id)=>{//返回一个函数实现给getter传参
            //getter在通过方法访问时，每次都会调用，不会缓存结果
            return state.todos.find(todo=>todo.id===id);
        }
    }
})

var vm=new Vue({
    el:'#box',
    store:store,
    components:{
        Counter
    }
})
```

### Mutations

更改Vuex的store中的状态唯一的方法是提交mutation

Vuex中的mutation类似于事件，每个mutation都有一个字符串的事件类型和回调函数

这个回调函数就是实际进行状态更改的地方，并且会接受state作为第一个参数

```javascript
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})

store.commit('increment');//调用
```

不能直接调用一个mutation handler

当触发一个类型为increment的mutation时调用此函数

要唤醒一个mutation handler，需要以相应的type调用store.commit方法

**提交载荷**

可以向store.commit传入额外的参数，即mutation的载荷

```javascript
const Counter = {
  template: `<div>{{ this.$store.state.count }}</div>`,
}

const store=new Vuex.Store({
    state:{
        count:0,
    },
    mutations:{
        increment:function(state,payload){//载荷大多数情况下是一个对象
            //这样可以包含多个字段
            //state.count+=payload;
            state.count+=payload.amount;
        }
    }
});

var vm=new Vue({
    el:'#box',
    store:store,
    components:{
        Counter
    }
})
```

**对象风格的提交方式**

```javascript
store.commit({//mutation对应的handler保持不变
  type: 'increment',
  amount: 10
})
```

**Mutation需遵守Vue的响应规则**

- 最好提前在store中初始化好所有需要的属性
- 需要在对象上添加属性时
  - 使用Vue.set
  - 用新对象替换老对象，利用...对象展开运算符添加

**使用常量替代Mutation事件类型**

**Mutation必须是同步函数**

异步函数中的回调函数让调试工具devtools无法捕捉到前状态和后一状态的快照

当mutation触发时，回调函数没有被调用，devtools不知道什么时候被调用

任何在回调函数中进行的状态改变都是不可追踪的

**在组件上提交Mutation**

```javascript
const Counter = {
  template: `<div>{{ this.$store.state.count }}</div>`,
  methods:{
      ...Vuex.mapMutations([
          'increment'
      ]),
      ...Vuex.mapMutations({
          add:'increment'
      })
  }
}
```

### Actions

Action类似于mutation，不同在于：

- Action提交的是mutation，而不是直接变更状态
- Action可以包含任意异步操作

```javascript
const store=new Vuex.Store({
    state:{
        count:0,
    },
    mutations:{
        increment:function(state,payload){
            //state.count+=payload;
            state.count+=payload.amount;
        }
    },
    actions:{
        increment(context){//Action函数接受一个与store实例具有相同方法和属性的context对象
            //可以调用context.commit提交一个mutation
            //通过context.state和context.getters获取state和getters
            //context并不是store实例本身
            context.commit('increment');
        }
       //参数解构
        ,increment({{commit}}){
            commit('increment');
        }
    }
});
```

**分发Action**

Action通过store.dispatch方法触发

```javascript
store.dispatch('increment');

actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {//可以在action内部执行异步操作
      commit('increment')
    }, 1000)
  }
}

//action支持同样的载荷方式和对象方式分发
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})

//购物车
actions: {
  checkout ({ commit, state }, products) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 发出结账请求，然后乐观地清空购物车
    commit(types.CHECKOUT_REQUEST)
    // 购物 API 接受一个成功回调和一个失败回调
    shop.buyProducts(
      products,
      // 成功操作
      () => commit(types.CHECKOUT_SUCCESS),
      // 失败操作
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```

**在组件中分发Action**

使用this.$store.dispatch('')或如下mapActions

```javascript
const Counter = {
  template: `<div>{{ this.$store.state.count }}</div>`,
  methods:{
      ...Vuex.mapActions([
          'increment'
      ]),
      ...Vuex.mapActions({
          add:'increment'
      })
  }
}
```

**组合Action**

store.dispatch可以处理被触发的action的处理函数返回的Promise，并且仍旧返回Promise

```javascript
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}

//async/await
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

### Modules

### **项目结构**

### 插件

### 严格模式

### 表单处理

### 测试

### 热重载