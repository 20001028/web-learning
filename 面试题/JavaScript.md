# JavaScript

### **数组方法**

不改变原数组

- concat：连接两个或多个数组，a1.concat(a2)
- every：
- some
- filter
- indexOf
- join：从数组创建字符串，参数seperator为分隔符默认逗号
- toString
- lastIndexOf
- map
- slice
- valueOf

改变原数组

- pop：删除数组最后一个元素，无参，返回数组最后一个元素（数组为空返回undefined）
- push：向数组末尾添加一个或多个元素，参数一个或多个，返回新数组的长度
- shift：删除数组的第一个元素，无参数，返回被删除的元素（数组为空返回undefined）
- unshift
- reverse：翻转数组，无参数，返回翻转后的数组
- sort
- splice

### **垃圾回收机制**

- 标记清除：先沿根结点出发遍历对象，对访问过的对象进行标记，表示该对象可达，对没有标记的对象进行回收
- 引用计数：记录对象被引用的次数

### **事件循环**

- 执行栈和主线程
- JS异步执行机制
  - 所有任务都会在主线程上执行
  - 主线程外有一个任务队列（TQ），只要异步任务有了结果，就在任务队列中添加一个事件
  - 执行栈中的所有同步任务执行完后，就会读取任务队列，等待的异步任务进入主线程执行
  - 主线程重复第三步
- 宏任务和微任务
  - 宏任务：script整体代码、setTimeout、setInterval、UI渲染、I/O
  - 微任务：Promise、process.nextTick
  - 如果存在微任务，执行所有的微任务；微任务执行完后，执行第一个宏任务，循环步骤。

### **防抖和节流**

- 防抖debounce：触发高频事件后n秒内函数只会执行一次，如果再次被触发，重新计时

  ```javascript
  function debounce(fn,delay){//延迟调用fn方法
      let timer=null;//存放定时器
      return function(){
          clearTimeout(timer);//清空计时器（不需要判断是否非空，不会报错）
          timer=setTimeout(fn,delay);//重新启动计时器
      };
  }
  ```

- 节流throttle：n秒内只执行一次，稀释函数的执行频率

  ```javascript
  function throttle(fn,delay){
      let timer=null;//定义定时器
      return function(){
          if(timer) return;//timer不为null，说明正在计时，直接退出
          timer=setTimeout(fn,delay);//没有计时，启动计时器
      }
  }
  ```

### 原型和原型链

创建一个对象new Person()，该对象有一个proto属性，指向构造函数的原型即Person.prototype，同时该对象也有一个constructor属性指向该构造函数.

只有函数才有prototype，对象（函数也是对象）都有proto属性（proto属性也是对象），Object本身是个构造函数

在访问obj.constructor时，obj本身并没有constructor属性，但是会沿着proto属性一直向上查找，直到为null为止

原型链：由proto属性构成的查找属性的线

### bind、call、apply的区别

1. bind：返回一个绑定该对象的函数，不执行该函数
2. call：返回函数执行结果，参数列表
3. apply：返回函数执行结果，参数数组
4. 如果没有指定函数绑定的对象，则默认为window
5. 改变函数this指向

### new执行的四个步骤

1. 创建一个空对象

2. 把空对象的原型链连接到函数对象上

3. 执行该函数并绑定this

4. 如果函数返回一个对象，则返回该对象否则返回创建的obj

   ```javascript
   function myNew(){
       let obj={};
       
       let [constructor,...args]=[...arguments];
       
       obj.__proto__=constructor.prototype;
       
       let result=Function.prototypr.call(obj,...args);
       
       return typeof result==='object' ? result : obj;
       return result instanceof Object ? result : obj;
   }
   ```


### 原始值和引用值的区别：Undefined、String、null、Number、Boolean；Object、Date、RegExp、Function、Array

1. 原始值存储在栈中，引用值存储在堆中
2. 原始值通过值的拷贝进行赋值，值的改变不会引起原始值的改变；引用值以引用的拷贝赋值，值的改变会引起引用值的改变
3. 原始值的比较是值的比较，引用值的比较是引用的比较（比较是否为同一个对象）

### 回流和重绘

1. 回流：引起DOM元素的几何属性发生变化，需要重新计算和绘制
2. 重绘：重新绘制新的样式

### defer和async的区别

1. async：脚本下载完成后立即执行，无法保证脚本的执行顺序，在onload事件（所有资源都完成加载）之前完成
2. defer：脚本下载完成后需要等待文档解析完成才可以执行，按顺序执行，在DOMContentLoaded（DOM树构建完成，图片等资源未完全加载）事件之前完成

### MVVM与MVC的区别

解决MVC中大量DOM操作使渲染性能降低，加载速度变慢

### addEventListener和onclick的区别

1. onclick同一时间只能绑定一个对象
2. addEventListener可以绑定多个对象

### JS中Class的实现

基于原型

### Symbol的作用

1. 作为对象的属性
2. 防止对象属性名冲突
3. 模拟私有属性

### setTimeout看输出，怎么for循环输出1,2,3,4,5而不是6,6,6,6,6（let和闭包）

### Promise、Async、Generator函数的区别

三个函数都是用来解决异步操作问题

1. Promise：主要将原来的用回调函数的异步编程方法转成resolve和reject出发时间，用then和catch捕获成功或失败状态下执行相应的代码

   Promise将多个回调函数嵌套的回调地狱变成链式写法

2. Generator：将函数分步骤阻塞，只有主动调用next方法才可以进行下一步

3. Async：在await部分等待分会，返回后自动执行下一步。相较于Promise，async每次异步返回的结果从then中拿到最外层，不需要链式调用，只需要同步写就可以。但是async必须以一个promise对象开始，async通常与promise结合使用

### ES5/6的继承的区别

1. class声明会提升，但不能用于初始化赋值，类似let和const
2. class内部启用严格模式
3. class的所有方法不可枚举
4. class的方法都没有原型对象prototype，也没有constructor，不能new
5. 必须使用new来调用class
6. class内部不能重写类名

### Object.create(null)和{}的区别

1. Object.create(null)创建的对象非常干净，没有其他的属性和方法以及原型等
2. {}带有proto属性，在原型链上，可以继承原型链上的属性和方法

### Object.keys()和for...in的区别

1. Object.keys()只遍历对象自身的所有可枚举属性
2. for...in遍历对象自身的和继承的所有可枚举属性

### hasOwnProperty和in的区别

1. obj.hasOwnProperty(key)不会去判断原型链上的属性
2. in判断对象属性或原型中是否包含该属性

### JS数组去重方法

1. Set：无法去除空对象{}
2. for循环嵌套+splice方法：不能去除NaN和{}
3. indexOf方法
4. sort排序+相邻元素比对
5. includes方法：不能去除同样的对象
6. hasOwnProperty方法：全部有效
7. filter方法：不能去除同样的对象
8. 递归去重：不能去除NaN和一样的对象
9. Map：同上
10. reduce方法+includes方法：不能去除一样的对象

### this指向问题

1. 在非箭头函数中，this指向调用其所在函数的对象，离谁更近就调用谁；

   构造函数中，this绑定被创建的新对象

   DOM事件中，this指向触发事件的元素

   内联事件：bind，call，apply

2. 全局环境下：this总是指向全局对象（window）

3. 函数上下文调用：

   1. 函数直接调用
      1. 严格模式：this为undefined
      2. 非严格模式，this默认指向全局对象window
   2. 对象中的this
      1. 对象内部方法的this指向调用方法的对象
      2. 函数的定义位置不影响this指向，只和调用函数的对象有关
      3. 多层嵌套的对象，内部方法的this指向离被调用函数最近的对象（window也是对象，内部对象调用方法的this指向内部对象，而不是window）
   3. 原型链中的this：仍然指向调用它的对象，即使调用的是原型链上的方法也指向大年对象
   4. 构造函数中的this：绑定创建的新对象，当构造函数返回的默认值是一个this引用的对象时，手动设置返回其他的对象，如果返回值不是一个对象，返回this
   5. call&apply：函数内部的this可以绑定到call或apply方法指定的第一个对象上，如果不是对象转换为对象
   6. bind：函数用永远绑定在第一个参数对象上，不管什么情况下的调用

4. DOM事件处理函数中的this

   this指向触发该事件的元素

5. setTimeout&setInterval

   内部的回调函数的this指向全局对象window（bin改变指向）

6. 箭头函数的this

   不绑定this，捕获上下文的this作为自己的this

### Map和WeakMap

1. WeakMap值接受对象作为键名（除了null），WeakMap键名指的对象不计入垃圾回收机制
2. WeakMap的键名引用的对象都是弱引用，垃圾回收机制不考虑该引用，只要引用的对象其他应用都被清除，就会释放对象所占的内存，不需要手动删除

### 为什么0.1+0.2不等于0.3

因为JS中采用IEEE75的双精度标准，内部存储数据编码时，0.1并不是存储为精确的0.1而是有误差的0.1，被四舍五入为一个接近的数字

解决方法：提升10的n次方为整数或者做差值计算在某个范围内即可

### 数组在内存中如何存放

数组中可以存放不同的数据结构（数组、对象、Number、String等等）

数组中的index字符串类型，在arr[1]访问数据时，会自动把1转换为字符串'1'

数组本身是个对象，因此存储的时候都是以属性键值对的方式

数组本身是一个连续的内存分配，但在JS中是类似哈希映射的方式存在的

- 对于同构的数组，数组元素类型一致，会创建连续的内存分配
- 不同构的数组，按照原来的方式创建

**ArrayBuffer 类型化数组**

分配一段可以存放数据的连续内存区域

### 函数Curry

只传递给函数一部分参数来调用，返回一个函数去处理剩下的参数

### 判断一个JS对象是否是Array

http://www.nowamagic.net/librarys/veda/detail/1250

- arr instanceof Array（在跨多个frame或window时会失效）

- Array.isArray(arr)

- Object.prototype.toString.call(arr)==='[object Array]'

  为什么不直接用arr.toString()？

  因为数组的toString方法很可能被改写，而Object.prototype.toString方法相对更安全

- typeof new Array() === 'object'，typeof对Function、String、Number、Undefined有效

### Map和Object的区别

- Object的key必须是简单数据类型（整数、字符串或Symbol），Map可以是JS支持的任意数据类型

- Map元素的顺序按照插入的顺序，Object不会

- 获取大小：Map自己有size属性，Object需要Object.keys()的长度

- Map自身支持迭代，Object不支持

  判断类型是否支持迭代

  ```javascript
  console.log((new Map())[Symbol.iterator]);//function
  console.log({}[Symbol.iterator]);//undefined
  ```

- JSON直接支持Object，不支持Map

  Map是纯粹的hash，Object存在一些内在逻辑，删除的时候有一些问题，删除密集应该用Map

  Map在存储大量元素时性能比较好，特别是不确定key类型

  Map会保持插入元素的顺序，Object不会