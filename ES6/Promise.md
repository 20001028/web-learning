# Promise

### Promise的含义

**Promise对象的特点**

1. 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）、rejected（已失败），只有异步操作的结果可以决定当前状态
2. 一旦状态改变就不会再变，任何时候都可以得到这个结果。Promise的状态改变：pending到fulfilled或pending到rejected

**缺点**

1. 无法取消Promise，一旦新建立即执行，无法中途取消
2. 如果不设置回调函数，Promise内部的错误不会反映到外部
3. 处于pending状态时，无法得知目前进展到哪个阶段

### 基本用法

**创建Promise实例**

```javascript
const promise=new Promise(function(resolve,reject){//接受两个函数作为参数
    //...some code
});
//resolve在异步操作成功时调用
//reject在异步操作失败时调用，并抛出异步操作报出的错误
```

**为Promise实例指定resolved状态和rejected状态的回调函数**

```javascript
promise.then(function(value){//状态变为resolved时调用
    
},function(error){//状态变为rejected调用
    
});//两个函数均可选，且接受Promise对象传出的值作为参数

//实例
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value);
});
```

**Promise中的异步问题**

```javascript
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');//同步任务，立即执行
  resolve();
});

promise.then(function() {//回调函数之后执行
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```

**异步加载图片**

```javascript
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}
```

**Promise实现Ajax**

```javascript
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

**resolve函数的参数是另一个Promise的实例**

```javascript
const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)//p1的状态会传递给p2，p1的状态决定了p2的状态
    //一秒后resolve不会执行，因为p2自身的状态已经失效，完全由p1决定
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
```

**调用resolve或reject函数不会终结Promise参数函数的执行**

```javascript
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);//resolve后仍然会执行
}).then(r => {
  console.log(r);
});
// 2
// 1
```

**在resolve或reject函数后终止执行**

```javascript
new Promise((resolve, reject) => {
  return resolve(1);
  // 后面的语句不会执行
  console.log(2);
})
```

### 定义在Promise.prototype上的方法

**Promise.prototype.then()**

为Promise实例添加状态改变时的回调函数

第一个参数对应resolved状态，第二个对应rejected状态，都是可选参数

then方法返回一个新的Promise实例，因此可以采用链式写法一直then下去

```javascript
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function (comments) {
  console.log("resolved: ", comments);
}, function (err){
  console.log("rejected: ", err);
});
```

**Promise.prototype.catch()**

指定发生错误时的回调函数

**Promise.prototype.finally()**

不管Promise实例最后状态如何，都会执行该操作

**Promise.all()**

将多个Promise的实例包装成一个Promise实例

```javascript
const p=Promise.all([p1,p2,p3]);
```

p的状态由p1、p2、p3决定

1. p1、p2、p3都变成resolved，p才会resolved，并将三个Promise的返回值组成数组传递给p的回调函数
2. 有一个被rejected，p就会rejected，第一个被reject的Promise实例的返回值被传递给p的回调函数

```javascript
const databasePromise = connectDatabase();

const booksPromise = databasePromise
  .then(findAllBooks);

const userPromise = databasePromise
  .then(getCurrentUser);

Promise.all([
  booksPromise,
  userPromise
])
.then(([books, user]) => pickTopRecommendations(books, user));
```

**Promise.all()**

将多个Promise的实例包装成一个Promise实例

```javascript
const p=Promise.all([p1,p2,p3]);
```

p的状态由p1、p2、p3决定

只要三个之中有一个实例率先改变状态，p的状态就随之改变，率先改变的Promise实例的返回值会传递给p的回调函数