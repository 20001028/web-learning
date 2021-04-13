# Vue

### 安装

- 直接用<script>引入

  ```html
  <html>
      <head>
          <script src="https://unpkg.com/vue/dist/vue.js"></script>
      </head>
      <body>
          <div id="app">
              {{name}}
      </div>
      </body>
  </html>
  
  <script>
  let app = new Vue({
          el: "#app",
          data:{
              name:'zzg',
          },
          methods:{},
      });
  </script>
  ```

- CDN

  ```html
  //适用于制作原型或学习
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  ```

- NPM

  ```shell
  npm install vue
  ```

### 介绍

**Vue.js是什么**

**起步**

**声明式渲染**

```html
<html>
    <head>
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            {{name}}//文本插值
            <p v-bind:title='message'>pdd</p>//动态绑定
        </div>
    </body>
</html>

<script>
let myApp = new Vue({
        el: "#app",
        data:{
            name:'zzg',
            message:'this is pdd',
        },
        methods:{},
    });
</script>
```

v-bind:attribute称为指令，指令带有前缀v-，将p节点的titile attribute与Vue实例的message 属性保持一致

**条件与循环**

```html
<html>
    <head>
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            <!-- 条件 -->
            <a v-if="seen">你能看到我</a>
            <ol>
                <!-- 循环 -->
                <li v-for="todo in todos">
                    {{todo.text}}
                </li>
            </ol>
        </div>
    </body>
</html>

<script>
let myApp = new Vue({
        el: "#app",
        data:{
            seen:true,
            todos:[
                {
                    text:'abd',
                },
                {
                    text:'dsdsd',
                }
            ]
        },
        methods:{},
    });
</script>
```

**处理用户输入**

```html
<html>
    <head>
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            {{message}}
            <!-- v-on添加事件监听器 -->
            <button v-on:click='reverseMessage'>click</button>
            <!-- 绑定输入框和message属性 -->
            <input v-model='message'>
        </div>
    </body>
</html>

<script>
let myApp = new Vue({
        el: "#app",
        data:{
            message:'china',
        },
        methods:{
            reverseMessage(){
                //只更新了message属性的值，没有触碰dom，dom操作由Vue完成
                this.message=this.message.split('').reverse().join('');
            }
        },
    });
</script>
```

**组件化应用构建**

```html
<html>
    <head>
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            <ol>
                <!-- 为每个todo-item提供todo对象，因为todo对象是变量(内容是动态的),
                父组件中grocery的变化会导致todo-item组件中todo的变化 -->
                <todo-item v-for="grocery in groceryList" v-bind:todo='grocery' v-bind:key="grocery.id">
                </todo-item>
            </ol>
        </div>
    </body>
</html>

<script>
//定义一个名为todo-item的新组件
Vue.component('todo-item',{
    //todo-item组件接受一个prop，类似一个自定义属性名为todo
    props:['todo'],
    template:'<li>{{todo.text}}</li>'
});

let myApp = new Vue({
        el: "#app",
        data:{
            groceryList: [
                { id: 0, text: '蔬菜' },
                { id: 1, text: '奶酪' },
                { id: 2, text: '随便其它什么人吃的东西' },
            ],
        },
        methods:{
        },
    });
</script>
```

### Vue实例

**创建一个Vue实例**

每一个应用都是通过用Vue函数创建一个新的Vue实例开始的

```javascript
var  vm=new Vue({
	//选项
})
```

一个应用由一个通过new Vue创建的根Vue实例，以及可选的、嵌套的、可复用的组件树组成

**数据与方法**

当一个Vue实例被创建时，它将data对象中的所有property加入到Vue的响应式系统中

当property值发生改变，视图也会发生响应，匹配更新为新的值

```javascript
var data={a:1}

let app = new Vue({
        el: "#app",
        data:data,
        methods:{
        },
    });

console.log(vm.a===data.a);//true
//vm改变，data改变
vm.a=2;
console.log(data.a);//2
//data改变，vm中的data也改变
data.a=3;
console.log(vm.a);//3

//数据改变时，视图会重新渲染
//只有当实例被创建时就已经存在与data中的property才是响应式的
//如果添加一个新的property，此时b新property的改变不会触发视图的更新

//阻止修改现有的property，响应式系统将无法追踪变化，无法对视图进行更新
Object.freeze(data);

//其他有用的实例与方法
//前缀$与用户定义的property区分开
console.log(vm.$data===data);//true
console.log(vm.$el===document.getElementById('app'));//true

vm.$watch('a',function(newValue,oldValue){
    //a属性改变时调用
    console.log(newValue,oldValue);
})
```

**实例生命周期钩子**

每个Vue实例被创建时都要经过一系列的初始化过程（设置数据监听、编译模板、将实例挂载到DOM并在数据变化时更新DOM）

```javascript
let app = new Vue({
        el: "#app",
        data:{
            a:1,
        },
        //更新钩子
        updated:function(){
            console.log('updated');
        },
        //挂载完成的钩子
        mounted:function(){
            console.log('mounted');
        },
        //销毁钩子
        destroyed:function(){
            console.log('destroyed');
        },
        //创建完成钩子
        created:function(){
            console.log('created');
        },
        methods:{
            
        },
    });
```

***不要在在选项property或回调上使用箭头函数***

因为箭头函数没有this，this会作为变量一直向上级词法作用域查找

<img src="https://cn.vuejs.org/images/lifecycle.png" alt="Vue 实例生命周期" style="zoom:50%;" />

### 模板语法

基于HTML的模板语法，声明式的将DOM绑定至低层Vue实例的数据

在底层实现上，Vue将模板编译成虚拟DOM渲染函数

Vue能够智能计算出最少需要重新渲染多少组件，并将DOM操作次数减到最少

**插值**

- 文本插值

  使用Mustache语法（双大括号），msg发生改变时，插值处的内容都会更新

  ```html
  <span>Message:{{ msg }}</span>
  //v-once指令一次性的插值，数据改变时，插值处的内容不会更新
  <span v-once>这个将不会改变:{{ msg }}</span>
  ```

- 原始HTML

  rawHtml的属性值被作为HTML解析，会忽略解析property值中的数据绑定

  ```html
  <p>Using mustaches:{{rawHtml}}</p>
  <p>Using v-html directive: <span v-html="rawHtml"></span></p>
  ```

  只对可信内容使用HTML插值，不对用户提供的内容使用插值

- Attribute

  v-bind指令

  ```html
  <button v-bind:disabled="isButtonDisabled"></button>
  ```

  只要属性存在就为true，如果disabled attribute为null、undefined或false，则disabled attribute不会被包含在button元素中

- JS表达式

  所有的数据绑定，Vue都提供完全的JS表达式支持

  每个绑定都只能包含单个表达式

**指令**

- 参数

  一些指令能接受一个参数，在指令名后用冒号表示

  ```html
  <a v-bind:href="url"></a>
  <a v-on:click="doSomething"></a>
  ```

- 动态参数

  ```html
  <a v-bind:[attributeName]="url"></a>
  <a v-on:[eventName]='doSomething'></a>
  ```

- 修饰符

  以半角句号.指明的特殊后缀，指出一个指令应该以特殊方式绑定

  ```javascript
  <form v-on:submit.prevent="onSubmit"></form>
  ```

  .prevent告诉v-on指令对于触发的事件调用event.preventDefault()

**缩写**

- v-bind缩写

  ```html
  <a v-bind:href="url"></a>
  //缩写
  <a :href="url"></a>
  //动态参数
  <a :[key]="url"></a>
  ```

- v-on缩写

  ```html
  <a v-on:click="doSomething"></a>
  //缩写
  <a @click="doSomething"></a>
  //动态参数
  <a @[event]="doSomething"></a>
  ```

### 计算属性和侦听器

**计算属性**

模板内放入太多的逻辑会让模板过重难以维护

- 基础例子

  ```html
  <html>
      <head>
          <script src="https://unpkg.com/vue/dist/vue.js"></script>
      </head>
      <body>
          <div id="app">
              {{message}}
              {{reversedMessage}}
          </div>
      </body>
  </html>
  
  <script>
  
  let app = new Vue({
          el: "#app",
          data:{
              message:'china',
          },
          computed:{
              //计算属性的getter
              //vm.reversedMessage依赖于message
              reversedMessage:function(){
                  return this.message.split('').reverse().join('');
              }
          },
      });
  </script>
  ```

- 计算属性缓存与方法

  可以将同一函数定义为一个方法而不是计算属性，两种方式的最终结果相同。

  不同的是计算属性是基于响应式依赖进行缓存的。只在相关的响应式依赖发生改变时才会重新求值

  只要message没有发生改变，多次访问reversedMessage计算属性会立即返回之前的计算结果，而不必再次执行函数

  ```javascript
  computed: {
    now: function () {
      return Date.now()
    }
  }
  ```

  now属性将不会更新

- 计算属性 VS 侦听属性

- 计算属性的setter

  计算属性默认只有getter，不过需要时可以提供getter

  ```javascript
  computed: {
    fullName: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  }
  ```

**侦听器**

```html
<html>
    <head>
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            <P>
                Ask a yes/no question:
                <input v-model="question">
            </P>
            <p>{{answer}}</p>
        </div>
    </body>
</html>

<script>
let app = new Vue({
        el: "#app",
        data:{
            question:'',
            answer:'',
        },
        watch:{
            question:function(newQuestion,oldQuestion){
                this.answer='Waiting for you to stop typing';
                this.debounce(this.getAnswer,1000)();
            }
        },
        created:function(){
            this.debouncedGetAnswer=this.debounce(this.getAnswer,500);
        },
        computed:{
            //计算属性的getter
            reversedMessage:function(){
                return this.message.split('').reverse().join('');
            }
        },
        methods:{
            getAnswer:function(){
                this.answer='ok';
            },
            debounce:function(fn,delay){//防抖函数
                let timer=null;
                return function(){
                    if(timer)
                        clearTimeout(timer);
                    timer=setTimeout(fn,delay);
                }
            },
        }
    });
</script>
```

### Class与Style绑定

**绑定HTML Class**

```html
<div v-bind:class="{active:isActive}">
    active这个class是否存在取决于数据property isActive为true还是false
</div>
<div class="static" v-bind:class="{active:isActive,'text-danger':hasError}">
    v-bind:class可以与普通的class attribute共存
</div>
<div v-bind:class="classObject">
    绑定的数据对象classObject可以定义在data中，不必内联
</div>
<div v-bind:class="[activeClass,errorClass]">
    传一个数组，一个class列表
</div>
<div v-bind:class="[isActive ? activeClass: '', errorClass]">
    使用三元表达式
</div>
<div v-bind:class="[{active:isActive},errorClass]">
    在数组中也可以用对象
</div>
//当在一个自定义组件上使用class property时，这些class会被添加到组件的根元素上
//元素上已经存在的class不会被覆盖
```

**绑定内联样式**

```html
<div v-bind:style="{color:activeColor,fontSize:fontSize+'px'}">
    
</div>
<div v-bind:style="styleObject">
    直接绑定到样式对象上
</div>
<div v-bind:style="[baseStyles,overridingStyles]">
    数组语法将多个样式对象应用到同一个元素上
</div>
//当v-bind:style使用需要添加浏览器引擎前缀的CSS property时，自动侦测并添加相应的前缀
//Google -webkit-,Firefox -moz-,Opera -o-,IE -ms

//为style绑定中的property提供一个包含多个值的数组，常用于提供多个带前缀的值
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

### 条件渲染

**v-if**

用于条件性的渲染一块内容，内容只会在指令的表达式返回true时被渲染

```html
<h1 v-if="aweson">
    Vue is awesome
</h1>
<h1 v-else>Oh no</h1>
<template v-else>//v-else必须紧跟在v-if或v-else-if的元素后面，否则不会被识别
    <h1>Title</h1>
    <p把一个template元素当做不可见的包裹元素来切换多个元素，最终的渲染结果不会包含template元素</p>
</template>
<div v-if="type==='A'">
                A
</div>
<div v-else-if="type==='B'">//v-else-if与v-else类似
                B
</div>
<div v-else>
                not A or B
</div>
//用key管理可复用的元素，Vue会为了尽可能的高效的渲染元素，通常会复用已有元素而不是从头开始渲染
//下面的代码中切换loginType不会清除用户的输入，input不会被替换掉，只会替换它的一些属性如placeholder
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address">
</template>

//为每个input添加一个唯一的key attribute
//label标签仍然会被复用
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

**v-show**

```html
<h1 v-show="ok">//带有v-show的元素始终会被渲染并保留在DOM中，V-show只是简单的切换元素的Css property display
    Hello
</h1>
//v-show不支持template元素，也不支持v-else
```

**v-if vs v-show**

- v-if是真的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当的被销毁和重建
- v-if也是惰性的，如果在初始渲染条件为假，什么也不做，直到条件第一次变为真，才开始渲染条件块
- v-show不管初始条件是什么，元素总会被渲染，只是简单的基于CSS进行切换
- v-if有更高的切换开销，v-show有更高的初始渲染开销
- 如果需要频繁的进行切换，使用v-show；如果在运行时条件很少改变，使用v-if较好

**v-if 与v-for一起使用**

v-for比v-if具有更高的优先级

### 列表渲染

**用v-for把一个数组对应为一组元素**

```html
<html>
    <head>
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            //index为当前项的索引
            //可以用of替代in
            <li v-for="(item,index) in items" :key="item.message">
                {{item.message}}-{{index}}-{{parent}}//v-for中可以访问所有父作用域的property
            </li>
        </div>
    </body>
</html>

<script>
let app = new Vue({
        el: "#app",
        data:{
            parent:'parent',
            items:[
                {message:'Foo'},
                {message:'Bar'},
            ]
        }
    });
</script>
```

**在v-for里使用对象**

```html
<html>
    <head>
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            //index作为索引，name作为键名，value为键值
            //Object.keys()的结果进行遍历
            <div v-for="(value, name, index) in object">
                {{ index }}. {{ name }}: {{ value }}
            </div>
        </div>
    </body>
</html>

<script>
let app = new Vue({
        el: "#app",
        data:{
            object: {
                title: 'How to do lists in Vue',
                author: 'Jane Doe',
                publishedAt: '2016-04-10'
            },
        }
    });
</script>
```

**维护状态**

Vue更新使用v-for渲染的元素列表时，默认使用就地更新的策略

如果数据项的顺序被改变，Vue不会移动DOM元素来匹配数据项的顺序

就地更新每个元素，确保每个索引位置正确渲染

这种“就地更新”只适用于不依赖子组件状态或临时DOM状态的列表渲染输出

为v-for的每一项提供一个唯一key attribute，从而跟踪每个节点的身份，重用和重新排序现有元素

不要使用对象或数组等非基本类型值作为key

**数组更新检测**

- 变更方法

  数组对被侦听的数组的变更方法进行包裹，也会触发视图更新

  push/pop/shift/unshift/splice/sort/reverse

- 替换数组

  对于非变更方法，他们不会变更原始数组，总是返回一个新数组

  用新数组替换旧数组，用一个含有相同元素的数组去替换原来的数组非常高效

- 注意事项

  由于JS的限制，Vue不能检测数组和对象的变化

**显示过滤/排序后的结果**

```html
<html>
    <head>
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="app">
            <div v-for="n in evenNumbers">
                {{n}}
            </div>
            <ul v-for="set in sets">
                <li v-for="n in even(set)">
                    {{n}}
                </li>
            </ul>
        </div>
    </body>
</html>

<script>
let app = new Vue({
        el: "#app",
        data:{
            numbers:[1,2,3,4,5],
            sets:[[1,2,3,4,5],[6,7,8,9]]
        },
        computed:{//计算属性
            evenNumbers:function(){
                return this.numbers.filter(function(number){
                    return number%2===0;
                })
            }
        },
        methods:{//方法
            even:function(numbers){
                return numbers.filter(function(number){
                    return number%2===0;
                })
            }
        }
    });
</script>
```

**在v-for里使用值范围**

```html
<div v-for="n in 10">
      {{n}}
</div>
```

**在template上使用v-for**

渲染一段包含多个元素的内容

**v-for和v-if一同使用**

处于同一节点时，v-for的优先级比v-if更高

v-if将分别重复运行于每个for循环中，适用于只想为部分项渲染节点时

```html
<li v-for="todo in todos" v-if="!todo.isCoomplete">
	//只渲染未完成的todo
</li>
//有条件的跳过循环的执行，可以将v-if置于外层元素
<ul v-if="todo.length">
    <li v-if="!todo.isCoomplete">
	</li>
</ul>
<p v-else>
    No todos left
</p>
```

**在组件上使用v-for**

```html
<html>
    <head>
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="todo-list-example">
            <form v-on:submit.prevent="addNewTodo">
              <label for="new-todo">Add a todo</label>
              <input
                v-model="newTodoText"
                id="new-todo"
                placeholder="E.g. Feed the cat"
              >
              <button>Add</button>
            </form>
            <ul>
              <li
                is="todo-item"//在ul元素内只有li元素会被看做有效内容
                v-for="(todo, index) in todos"
                v-bind:key="todo.id"
                v-bind:title="todo.title"
                v-on:remove="todos.splice(index, 1)"
              ></li>
            </ul>
          </div>
    </body>
</html>

<script>
Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">Remove</button>\
    </li>\
  ',
  props: ['title']
})

new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    todos: [
      {
        id: 1,
        title: 'Do the dishes',
      },
      {
        id: 2,
        title: 'Take out the trash',
      },
      {
        id: 3,
        title: 'Mow the lawn'
      }
    ],
    nextTodoId: 4
  },
  methods: {
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})
</script>
```

### 事件处理

**监听事件**

**事件处理方法**

**内联处理器中的方法**

在内联处理器中访问原始的DOM事件，用特殊变量$event传入方法

```html
<html>
    <head>
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="todo-list-example">
            <button v-on:click="warn($event)">Submit</button>
        </div>
    </body>
</html>

<script>
new Vue({
  el: '#todo-list-example',
  data: {
    
  },
  methods: {
    warn:function(e){
        if(e){
            e.preventDefault()
        }
        alert('ok');
    }
  }
})
</script>
```

**事件修饰符**

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

//修饰符的顺序很重要
//v-on:click.prevent.self会阻止所有点击，v-on:click.self.prevent只会阻止对元素自身的点击

<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>//.once修饰符还能被用到自定义的组件事件上

<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
//不要把.passive和.prevent一起使用，因为.prevent会被忽略，.passive会告诉浏览器你不想阻止事件的默认行为
```

**按键修饰符**

```html
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
<input v-on:keyup.page-down="onPageDown">
```

**按键码**

**系统修饰符**

**为什么在HTML中监听事件**

- 可以轻松定位在JS中定义的方法
- 不需要在JS中手动绑定事件，代码可以是纯粹的逻辑，与DOM解耦
- 当一个ViewModel被销毁时，所有事件处理器自动删除

### 表单输入绑定

### 组件基础

**基本示例**

```html
<html>
    <head>
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="components-demo">
            <button-counter></button-counter>
        </div>
    </body>
</html>

<script>
// 定义一个名为 button-counter 的新组件
//组件和new Vue一样都接受data、created、mounted等选项，唯独不接收根实例独有的el
Vue.component('button-counter', {
  data: function () {//data必须是一个函数，所以每个实例才可以维护一份被返回对象的独立的拷贝
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

new Vue({ el: '#components-demo' })
</script>
```

**组件的复用**

```html
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
    //点击按钮时，每个组件都会各自独立维护它的count，因为每用一次组件，就会有一个它的新实例被创建
</div>
```

**组件的组织**

一个应用通常以一棵嵌套的组件树的形式来组织

注册类型：全局注册和局部注册

以Vue.component全局注册的组件可以用在被注册后的任何通过new Vue新创建的Vue根实例

包括组件树中的所有子组件的模板中

**通过Prop向子组件传递数据**

```html
<html>
    <head>
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="components-demo">
            <blog-post
                v-for="post in posts"
                v-bind:key="post.id"
                v-bind:title="post.title"
            ></blog-post>
        </div>
    </body>
</html>

<script>
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})

new Vue({
  el: '#components-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})
</script>
```

**单个根元素**

将组件模板的内容包裹在一个父元素内

```html
<html>
    <head>
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="components-demo">
            <blog-post
                v-for="post in posts"
                v-bind:key="post.id"
                v-bind:post="post"
            ></blog-post>
        </div>
    </body>
</html>

<script>
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>
  `
})

new Vue({
  el: '#components-demo',
  data: {
    posts: [
      { id: 1, title: 'My journey with Vue' },
      { id: 2, title: 'Blogging with Vue' },
      { id: 3, title: 'Why Vue is so fun' }
    ]
  }
})
</script>
```

**监听子组件事件**

```html
<html>
    <head>
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="blog-posts-events-demo">
            <div :style="{ fontSize: postFontSize + 'em' }">
              <blog-post
                v-for="post in posts"
                v-bind:key="post.id"
                v-bind:post="post"
                v-on:enlarge-text="postFontSize+=0.1"//接收事件
                v-on:enlarge-text="postFontSize+=$event"//$event接收传入的参数
                v-on:enlarge-text="onLargeText"
              ></blog-post>
            </div>
          </div>
    </body>
</html>

<script>
Vue.component('blog-post', {
  props: ['post'],
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button v-on:click="$emit('enlarge-text')">//提交事件
	  <button v-on:click="$emit('enlarge-text',0.1)">//0.1作为参数上传
        Enlarge text
      </button>
      <div v-html="post.content"></div>
    </div>
  `
})

new Vue({
  el: '#blog-posts-events-demo',
  data: {
    posts: [
        { id: 1, title: 'My journey with Vue' },
        { id: 2, title: 'Blogging with Vue' },
        { id: 3, title: 'Why Vue is so fun' }
    ],
    postFontSize: 1
  },
    methods:{
        onLargeText:function(amount){
          this.postFontSize+=amount;
      	}
    }
})
</script>
```

**在组件上使用v-model**

**通过插槽分发内容**

```html
<html>
    <head>
        <script src="https://unpkg.com/vue/dist/vue.js"></script>
    </head>
    <body>
        <div id="blog-posts-events-demo">
            <alert-box>
                //自定义组件之间的内容原本不会显示，不过可以通过slot进行显示
                Something bad happened.
            </alert-box>
        </div>
    </body>
</html>

<script>
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})

new Vue({
  el: '#blog-posts-events-demo',
  data: {
    
  },
  methods:{
      
  }
})
</script>
```

**动态组件**

在不同组件之间进行动态切换，比如一个多标签的界面

```html
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```

**解析DOM模板时的注意事项**

有些HTML元素，如ul、ol、table、select，对于哪些元素可以出现在其内部有严格限制

li、tr、option只能出现在某些特定元素内部

```html
<table>
  <blog-post-row></blog-post-row>//blog-post-row内的内容会被作为无效内容提升到外部，渲染出错
</table>
//变通办法
<table>
  <tr is="blog-post-row"></tr>
</table>
```

不存在限制的情况

- 字符串（如template:''）

- 单文件组件(.vue)

- <script type="text/x-template">

### **深入响应式原理**

**如何追踪变化**

当一个普通的JS对象传入Vue实例作为data选项，Vue将遍历次对象所有property，并使用Object.defineProperty

将这些property全部转为getter/setter

这些getter/setter对用户不可见，但是在内部能让Vue追踪依赖，在property被访问或修改时通知变更

每个组件实例都对应一个watcher实例，它会在组件渲染的过程中国把接触过的数据property记录为依赖，当依赖项的setter触发时，会通知watcher，使它关联的组件重新渲染

**检测变化中的注意事项**

- 对于对象

  Vue无法检测property的添加或移除

  由于Vue会在初始化实例时对property执行getter/setter转化，所以property必须在data对象上存在才能被Vue转换为响应式

  ```javascript
  var vm = new Vue({
    data:{
      a:1
    }
  })
  
  // `vm.a` 是响应式的
  
  vm.b = 2
  // `vm.b` 是非响应式的
  //对于已经创建的Vue实例，Vue不允许动态添加根级别的响应式property
  //可以使用Vue.set(object,propertyName,value)方法向嵌套对象添加响应式property
  Vue.set(vm.someObject,'b',2);
  vm.$set(vm.someObject,'b',2);
  //为已有对象赋值多个新property
  //用源对象与要混合进去的对象的property一起创建一个新对象
  vm.someObject=Object.assign({},vm.someObject,{a:1,b:2});
  ```

- 对于数组

  Vue不能检测到的数组的变动

  - 利用索引直接设置一个数组想时，vm.items[0]=1
  - 修改数组的长度，vm.items.length=2

  ```javascript
  var vm = new Vue({
    data: {
      items: ['a', 'b', 'c']
    }
  })
  vm.items[1] = 'x' // 不是响应性的
  
  vm.$set(vm.items,1,'x');
  vm.items.splice(1,1,'x');
  
  vm.items.length = 2 // 不是响应性的
  ```

**声明响应式property**

由于Vue不允许动态添加根级响应式property，

必须在初始化实例前声明所有根级响应式property，哪怕只是一个空值

**异步更新队列**

Vue在更新DOM时是异步执行的

只要侦听到数据变化，Vue会开启一个队列，并华冲在同一事件循环中发生的所有数据变更

如果同一个watcher被多次触发，只会被推入到队列中一次

这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作非常重要

在下一个事件循环tick中，Vue刷新队列并执行实际的工作

Vue在内部对异步队列尝试采用原生的Promise.then、MutationObserver和setImmediate

如果执行环境不支持，会采用setTimeout(fn,0)代替

```javascript
//当你设置vm.someData='new value' ,该组件不会立即重新渲染
//当刷新队列时，组件会在下一个时间循环tick中更新
//如果想基于更新后的DOM做点什么，可以在数据变化之后立即使用Vue.nextTick(callback)
//回调函数将在DOM更新完成后备调用
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: '未更新'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = '已更新'
      console.log(this.$el.textContent) // => '未更新'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => '已更新'
      })
    }
  }
})
methods: {
  updateMessage: async function () {
    this.message = '已更新'
    console.log(this.$el.textContent) // => '未更新'
    await this.$nextTick()
    console.log(this.$el.textContent) // => '已更新'
  }
}
```

